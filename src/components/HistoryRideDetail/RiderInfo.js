import React from "react";
import { View, Text, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Fonts, Sizes, Colors, CommonStyles } from "../../constants/styles";

const RiderInfo = () => {
  return (
    <View style={{ ...CommonStyles.rowAlignCenter, margin: Sizes.fixPadding * 2.0 }}>
      <Image
        source={require("../../assets/images/user/user9.png")}
        style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0 }}
      />
      <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
        <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
          Jacob Jones
        </Text>
        <View style={{ ...CommonStyles.rowAlignCenter, marginVertical: Sizes.fixPadding - 6.0 }}>
          <Text style={{ ...Fonts.grayColor14SemiBold }}>4.8</Text>
          <MaterialIcons name="star" color={Colors.secondaryColor} size={16} />
          <View style={styles.ratingAndReviewDivider} />
          <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold, flex: 1 }}>
            120 review
          </Text>
        </View>
        <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold }}>
          Join 2016
        </Text>
      </View>
      <Text style={{ ...Fonts.primaryColor18SemiBold }}>$15.00</Text>
    </View>
  );
};

const styles = {
  ratingAndReviewDivider: {
    width: 1.0,
    backgroundColor: Colors.grayColor,
    height: "80%",
    marginHorizontal: Sizes.fixPadding - 5.0,
  },
};

export default RiderInfo;
