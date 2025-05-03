// src/components/HistoryRideDetail/RateRideDialog.js
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { Overlay } from "@rneui/themed";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";
import firebase from "../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const placeholderImage = require("../../assets/images/rating.png");

const RateRideDialog = ({
  isVisible,
  onClose,
  rating,
  setRating,
  reviewText,
  setReviewText,
  ride,
}) => {
  const handleSend = async () => {
    const user = firebase.auth.currentUser;
    if (!user) {
      Alert.alert("Turite prisijungti, kad galėtumėte vertinti");
      return;
    }
    const rideId = ride.id;
    const driverId = ride.userId ?? ride.__raw?.userId;

    if (!driverId) {
      Alert.alert("Įvyko klaida: trūksta vairuotojo identifikatoriaus");
      return;
    }

    try {
      await addDoc(collection(firebase.db, "driver_ratings"), {
        rideId,
        driverId,
        raterId: user.uid,
        rating,
        review: reviewText || "",
        createdAt: serverTimestamp(),
      });
      Alert.alert("Ačiū už vertinimą!");
      onClose();
    } catch (e) {
      console.error("❌ Rating send error:", e);
      Alert.alert("Klaida siunčiant vertinimą", e.message);
    }
  };

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={{
        width: "90%",
        maxHeight: "80%",
        borderRadius: Sizes.fixPadding * 2,
        padding: 0,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
      >
        <View
          style={{
            backgroundColor: Colors.whiteColor,
            margin: Sizes.fixPadding * 2,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={placeholderImage}
              style={{ width: 90, height: 90, resizeMode: "contain" }}
            />
            <Text
              style={{
                ...Fonts.primaryColor17Bold,
                marginTop: Sizes.fixPadding,
              }}
            >
              Įvertinkite kelionę
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: Sizes.fixPadding * 2,
              }}
            >
              {[1, 2, 3, 4, 5].map((no) => (
                <MaterialIcons
                  key={no}
                  name="star"
                  size={40}
                  color={
                    rating >= no ? Colors.secondaryColor : Colors.lightGrayColor
                  }
                  onPress={() => setRating(no)}
                  style={{ marginHorizontal: Sizes.fixPadding / 2 }}
                />
              ))}
            </View>
          </View>

          <TextInput
            placeholder="Palikite atsiliepimą..."
            placeholderTextColor={Colors.grayColor}
            multiline
            numberOfLines={4}
            value={reviewText}
            onChangeText={setReviewText}
            style={{
              ...Fonts.blackColor16Medium,
              ...CommonStyles.shadow,
              borderRadius: Sizes.fixPadding,
              backgroundColor: Colors.whiteColor,
              padding: Sizes.fixPadding,
              height: Platform.OS === "ios" ? 120 : 100,
              textAlignVertical: "top",
            }}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSend}
            style={{ ...CommonStyles.button, marginTop: Sizes.fixPadding * 2 }}
          >
            <Text style={Fonts.whiteColor18Bold}>Siųsti</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Overlay>
  );
};

export default RateRideDialog;
