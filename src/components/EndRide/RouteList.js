// src/components/RouteList.js
import React from "react";
import { View, Text, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import { Fonts, Sizes, Colors } from "../../constants/styles";
import styles from "../../screens/TemplateJourney/endRide/EndRideStyles";

const RouteList = ({ routesList }) => {
  return (
    <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
      {routesList.map((item, index) => (
        <RouteItem
          key={item.id}
          item={item}
          index={index}
          totalRoutes={routesList.length}
        />
      ))}
    </View>
  );
};

const RouteItem = ({ item, index, totalRoutes }) => {
  const iconColor =
    item.status === "completed"
      ? Colors.grayColor
      : item.isPickPoint
      ? Colors.greenColor
      : Colors.redColor;

  return (
    <View style={{ flexDirection: "row", marginHorizontal: Sizes.fixPadding * 2.0 }}>
      <View>
        {item.isPickDropPoint ? (
          <View style={{ ...styles.sheetLocationIconWrapper, borderColor: iconColor }}>
            <MaterialIcons name="location-pin" color={iconColor} size={10} />
          </View>
        ) : (
          <Image
            source={require("../../assets/images/vehicle/vehicle1.png")}
            style={{
              ...styles.sheetCarImage,
              tintColor: item.status === "completed" ? Colors.grayColor : Colors.primaryColor,
            }}
          />
        )}
        {index !== totalRoutes - 1 && <VerticalDashLine />}
      </View>
      <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
        <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding - 8.0 }}
        >
          {item.address}
        </Text>
      </View>
    </View>
  );
};

const VerticalDashLine = () => (
  <DashedLine
    axis="vertical"
    dashLength={3}
    dashColor={Colors.lightGrayColor}
    dashThickness={1}
    style={{
      height: 45.0,
      marginLeft: Sizes.fixPadding - 2.0,
    }}
  />
);

export default RouteList;