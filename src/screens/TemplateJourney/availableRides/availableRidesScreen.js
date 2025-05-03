import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, CommonStyles, Fonts, Sizes } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import Header from "../../../components/header";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AvailableRidesScreen = ({ navigation, route }) => {
  const ridesFromFirebase = route.params?.journeys || [];
  const availableRides = ridesFromFirebase.filter((ride) => ride.seats > 0);

  if (availableRides.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.bodyBackColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MyStatusBar />
        <Text style={{ ...Fonts.blackColor16SemiBold }}>
          Nerasta jokių laisvų kelionių.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={"Surastos kelionės"} navigation={navigation} />
        <FlatList
          data={availableRides}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <RideItem ride={item} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2 }}
        />
      </View>
    </View>
  );
};

const RideItem = ({ ride, navigation }) => {
  const [driver, setDriver] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    if (ride.userId) {
      const fetchDriver = async () => {
        try {
          const userRef = doc(db, "users", ride.userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setDriver(userSnap.data());
          } else {
            console.log("No driver found with id: ", ride.userId);
          }
        } catch (error) {
          console.error("Error fetching driver data: ", error);
        }
      };
      fetchDriver();
    }
  }, [ride.userId, db]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("RideDetailScreen", { ride })}
      style={styles.rideWrapper}
    >
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding,
          ...CommonStyles.rowAlignCenter,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ ...CommonStyles.rowAlignCenter }}>
            <View
              style={{
                ...styles.locationIconWrapper,
                borderColor: Colors.greenColor,
              }}
            >
              <MaterialIcons
                name="location-pin"
                color={Colors.greenColor}
                size={12}
              />
            </View>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                ...Fonts.blackColor14Medium,
                marginHorizontal: Sizes.fixPadding,
              }}
            >
              {ride.pickupAddress}
            </Text>
          </View>
          <View style={styles.verticalDashedLine}></View>
          <View style={{ ...CommonStyles.rowAlignCenter }}>
            <View
              style={{
                ...styles.locationIconWrapper,
                borderColor: Colors.redColor,
              }}
            >
              <MaterialIcons
                name="location-pin"
                color={Colors.redColor}
                size={12}
              />
            </View>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                ...Fonts.blackColor14Medium,
                marginHorizontal: Sizes.fixPadding,
              }}
            >
              {ride.destinationAddress}
            </Text>
          </View>
        </View>
        <Text style={{ ...Fonts.primaryColor18SemiBold }}>
          {ride.amount ? `$${ride.amount}` : ""}
        </Text>
      </View>

      <DashedLine
        dashLength={3}
        dashThickness={1}
        dashColor={Colors.grayColor}
        style={{ marginVertical: Sizes.fixPadding, overflow: "hidden" }}
      />

      <View
        style={{
          ...CommonStyles.rowAlignCenter,
          marginHorizontal: Sizes.fixPadding,
        }}
      >
        <View
          style={{
            flex: 1,
            ...CommonStyles.rowAlignCenter,
            marginRight: Sizes.fixPadding,
          }}
        >
          <Image
            source={
              driver?.photoURL
                ? { uri: driver.photoURL }
                : require("../../../assets/images/user/user1.jpeg")
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: Sizes.fixPadding - 5,
            }}
          />
          <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor15SemiBold }}>
              {driver
                ? `${driver.firstName} ${driver.lastName}`
                : "Vairuotojas"}
            </Text>
            <View
              style={{
                ...CommonStyles.rowAlignCenter,
                marginTop: Sizes.fixPadding - 8,
              }}
            >
              <Text
                numberOfLines={1}
                style={{ ...Fonts.grayColor13SemiBold, flex: 1 }}
              >
                {ride.journeyDateTime || ""}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "30%", alignItems: "flex-end" }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5, 6].map((no) => (
              <MaterialIcons
                key={`${no}`}
                name="event-seat"
                color={no > ride.seats ? Colors.grayColor : Colors.primaryColor}
                size={16}
                style={{
                  marginLeft: Sizes.fixPadding - 5,
                  alignSelf: "center",
                }}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      {driver?.phoneNumber && (
        <View
          style={{
            marginTop: Sizes.fixPadding,
            marginHorizontal: Sizes.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.grayColor14Medium }}>
            Telefonas: {driver.phoneNumber}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AvailableRidesScreen;

const styles = StyleSheet.create({
  locationIconWrapper: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  verticalDashedLine: {
    height: 15,
    width: 1,
    borderStyle: "dashed",
    borderColor: Colors.grayColor,
    borderWidth: 0.8,
    marginLeft: Sizes.fixPadding - 2,
  },
  rideWrapper: {
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2,
    marginBottom: Sizes.fixPadding * 2,
    paddingVertical: Sizes.fixPadding,
  },
  dateTimeAndRatingDivider: {
    width: 1,
    backgroundColor: Colors.grayColor,
    height: "80%",
    marginHorizontal: Sizes.fixPadding - 5,
  },
});
