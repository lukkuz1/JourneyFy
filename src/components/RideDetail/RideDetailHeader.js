// src/components/RideDetailHeader.js
import React from "react";
import { View } from "react-native";
import Header from "../header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const RideDetailHeader = ({ navigation, driver }) => {
  return (
    <View style={{ justifyContent: "center" }}>
      <Header title="Kelionės aprašymas" navigation={navigation} />
      {driver?.phoneNumber && (
        <MaterialIcons
          name="call"
          color={Colors.whiteColor}
          size={20}
          style={{ position: "absolute", right: 20, top: Sizes.fixPadding }}
        />
      )}
    </View>
  );
};

export default RideDetailHeader;
