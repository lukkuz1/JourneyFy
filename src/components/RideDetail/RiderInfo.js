import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import firebase from "../../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const RiderInfo = ({ driver, ride }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!ride?.userId) {
        setReviews([]);
        setLoading(false);
        return;
      }
      try {
        const ratingsRef = collection(firebase.db, "driver_ratings");
        const q = query(ratingsRef, where("driverId", "==", ride.userId));
        const snap = await getDocs(q);
        const items = snap.docs
          .map((d) => d.data())
          .filter((r) => r.raterId !== ride.userId);
        setReviews(items);
      } catch (e) {
        console.error("Klaida kraunant atsiliepimus:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [ride.userId]);

  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
  const roundedRating = Math.round(averageRating);

  const photoUri = driver?.photoURL || driver?.photo || null;

  return (
    <View style={styles.container}>
      <Image
        source={
          photoUri
            ? { uri: photoUri }
            : require("../../assets/images/user/user9.png")
        }
        style={styles.avatar}
      />

      <View style={styles.info}>
        <Text numberOfLines={1} style={Fonts.blackColor17SemiBold}>
          {driver ? `${driver.firstName} ${driver.lastName}` : "Vairuotojas"}
        </Text>

        {loading ? (
          <ActivityIndicator
            size="small"
            color={Colors.primaryColor}
            style={{ marginTop: Sizes.fixPadding }}
          />
        ) : reviews.length === 0 ? (
          <Text style={Fonts.grayColor14Medium}>Atsiliepimų dar nėra</Text>
        ) : (
          <View style={{ marginTop: Sizes.fixPadding }}>
            <View style={CommonStyles.rowAlignCenter}>
              {[1, 2, 3, 4, 5].map((n) => (
                <MaterialIcons
                  key={n}
                  name="star"
                  size={16}
                  color={
                    n <= roundedRating
                      ? Colors.secondaryColor
                      : Colors.lightGrayColor
                  }
                  style={{ marginRight: 2 }}
                />
              ))}
              <Text style={{ ...Fonts.blackColor14Medium, marginLeft: 6 }}>
                {averageRating.toFixed(1)} ({reviews.length})
              </Text>
            </View>
          </View>
        )}
      </View>

      <Text style={Fonts.primaryColor18SemiBold}>
        {ride.price != null ? `€${ride.price}` : "0.00 €"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.rowAlignCenter,
    margin: Sizes.fixPadding * 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: Sizes.fixPadding - 5,
  },
  info: {
    flex: 1,
    marginHorizontal: Sizes.fixPadding,
  },
});

export default RiderInfo;
