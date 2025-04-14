import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Platform } from "react-native";
import { Overlay } from "@rneui/themed";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";

const RateRideDialog = ({ isVisible, onClose, rating, setRating }) => {
  return (
    <Overlay isVisible={isVisible} onBackdropPress={onClose} overlayStyle={styles.dialogStyle}>
      <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
        <View style={{ backgroundColor: Colors.whiteColor, marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding * 2.5 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/images/rating.png")}
              style={{ width: 90.0, height: 90.0, resizeMode: "contain" }}
            />
            <Text style={{ ...Fonts.primaryColor17Bold, marginTop: Sizes.fixPadding }}>Vertinti savo kelionę</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: Sizes.fixPadding * 2.0 }}>
              <RatingStar no={1} rating={rating} setRating={setRating} />
              <RatingStar no={2} rating={rating} setRating={setRating} />
              <RatingStar no={3} rating={rating} setRating={setRating} />
              <RatingStar no={4} rating={rating} setRating={setRating} />
              <RatingStar no={5} rating={rating} setRating={setRating} />
            </View>
          </View>
          <TextInput
            placeholder="Įveskite atsiliepimą..."
            placeholderTextColor={Colors.grayColor}
            style={styles.reviewFieldStyle}
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            style={{ ...CommonStyles.button, marginHorizontal: 0, marginTop: Sizes.fixPadding * 2.0 }}
          >
            <Text style={{ ...Fonts.whiteColor18Bold }}>Send</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Overlay>
  );
};

const RatingStar = ({ no, rating, setRating }) => {
  return (
    <MaterialIcons
      name="star"
      color={rating >= no ? Colors.secondaryColor : Colors.lightGrayColor}
      size={40}
      onPress={() => setRating(no)}
      style={{ marginHorizontal: Sizes.fixPadding - 8.0 }}
    />
  );
};

const styles = {
  dialogStyle: {
    width: "90%",
    borderRadius: Sizes.fixPadding,
    padding: 0,
    overflow: "hidden",
  },
  reviewFieldStyle: {
    ...Fonts.blackColor16Medium,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding,
    height: Platform.OS === "ios" ? 120.0 : null,
  },
};

export default RateRideDialog;
