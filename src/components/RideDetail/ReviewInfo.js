// src/components/ReviewInfo.js
import React from "react";
import { View, Text, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const reviewsList = [
  {
    id: "1",
    profile: require("../../assets/images/user/user11.png"),
    name: "Wade Warren",
    rating: 4.8,
    reviewDate: "25 jan 2023",
    review:
      "Lorem ipsum dolor sit amet consectetur. Allaliquam sit mollis adipiscing donec ut sed. Dictum dignissim enim condimentum vitae aliquam sed.",
  },
  {
    id: "2",
    profile: require("../../assets/images/user/user12.png"),
    name: "Jenny Wilson",
    rating: 3.5,
    reviewDate: "25 jan 2023",
    review:
      "Lorem ipsum dolor sit amet consectetur. Allaliquam sit mollis adipiscing donec ut sed. Dictum dignissim enim condimentum vitae aliquam sed.",
  },
];

const ReviewInfo = ({ ride, navigation }) => {
  return (
    <View style={{ backgroundColor: Colors.whiteColor, paddingHorizontal: Sizes.fixPadding * 2, paddingVertical: Sizes.fixPadding + 5 }}>
      <View style={{ ...CommonStyles.rowAlignCenter, marginBottom: Sizes.fixPadding + 5 }}>
        <Text style={{ flex: 1, ...Fonts.secondaryColor17SemiBold }}>Atsiliepimas</Text>
        <Text
          onPress={() =>
            navigation.navigate("ReviewsScreen", { rideId: ride.id })
          }
          style={{ ...Fonts.primaryColor16SemiBold }}
        >
          Peržiūrėti visus
        </Text>
      </View>
      {reviewsList.map((item, index) => (
        <View key={item.id}>
          <View style={{ ...CommonStyles.rowAlignCenter }}>
            <Image
              source={item.profile}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
              <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8, ...Fonts.grayColor14Medium }}>
                {item.reviewDate}
              </Text>
            </View>
            <View style={{ ...CommonStyles.rowAlignCenter }}>
              <Text style={{ ...Fonts.grayColor16SemiBold }}>{item.rating.toFixed(1)}</Text>
              <MaterialIcons name="star" color={Colors.secondaryColor} size={16} />
            </View>
          </View>
          <Text style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding }}>
            {item.review}
          </Text>
          {index === reviewsList.length - 1 ? null : (
            <View style={{
              height: 1,
              backgroundColor: Colors.lightGrayColor,
              marginVertical: Sizes.fixPadding * 2,
            }} />
          )}
        </View>
      ))}
    </View>
  );
};

export default ReviewInfo;
