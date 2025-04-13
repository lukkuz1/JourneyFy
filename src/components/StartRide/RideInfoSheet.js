// src/components/RideInfoSheet.js
import React from "react";
import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import BottomSheet from "react-native-simple-bottom-sheet";
import * as Animatable from "react-native-animatable";
import DashedLine from "react-native-dashed-line";
import { Colors, Fonts, Sizes, screenHeight, CommonStyles } from "../../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import VerticalDashLine from "./VerticalDashLine";

const passengersList = [
  {
    id: "1",
    profile: require("../../assets/images/user/user6.png"),
    name: "Cameron Williamson",
  },
  {
    id: "2",
    profile: require("../../assets/images/user/user5.png"),
    name: "Brooklyn Simmons",
  },
  {
    id: "3",
    profile: require("../../assets/images/user/user2.png"),
    name: "leslie alexander",
  },
  {
    id: "4",
    profile: require("../../assets/images/user/user3.png"),
    name: "Jacob jones",
  },
];

const routesList = [
  {
    id: "1",
    title: "Ride start",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
  },
  {
    id: "2",
    title: "Pick up cameron willimson",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    isPickDropPoint: true,
  },
  {
    id: "3",
    title: "Pick up brooklyn simmons",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    isPickDropPoint: true,
  },
  {
    id: "4",
    title: "Drop up cameron willimson",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    isPickDropPoint: true,
  },
  {
    id: "5",
    title: "Pick up leslie alexander",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    isPickDropPoint: true,
  },
  {
    id: "6",
    title: "Pick up jacob jones",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    isPickDropPoint: true,
  },
  {
    id: "7",
    title: "Drive",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
  },
  {
    id: "8",
    title: "Drop up brooklyn simmons",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    isPickDropPoint: true,
  },
  {
    id: "9",
    title: "Drop up leslie alexander",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    isPickDropPoint: true,
  },
  {
    id: "10",
    title: "Drop up jacob jones",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    isPickDropPoint: true,
  },
  {
    id: "11",
    title: "Ride end",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
  },
];

const RideInfoSheet = () => {
  const renderPassengerItem = ({ item }) => (
    <View style={{ alignItems: "center", width: 70, marginHorizontal: Sizes.fixPadding * 1.4 }}>
      <Image
        source={item.profile}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <Text style={{ ...Fonts.grayColor12Medium, textAlign: "center", marginTop: Sizes.fixPadding - 5 }}>
        {item.name}
      </Text>
    </View>
  );

  const renderRouteItem = (item, index) => {
    return (
      <View key={item.id} style={{ flexDirection: "row", marginHorizontal: Sizes.fixPadding * 2 }}>
        <View>
          {item.isPickDropPoint ? (
            <View style={styles.sheetLocationIconWrapper}>
              <MaterialIcons name="location-pin" color={Colors.grayColor} size={10} />
            </View>
          ) : (
            <Image
              source={require("../../assets/images/icons/car.png")}
              style={styles.sheetCarImage}
            />
          )}
          {index === routesList.length - 1 ? null : <VerticalDashLine />}
        </View>
        <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
          <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding - 8 }}>
            {item.address}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <BottomSheet
      isOpen={false}
      sliderMinHeight={380}
      sliderMaxHeight={screenHeight - 150}
      lineContainerStyle={{ height: 0 }}
      lineStyle={{ height: 0 }}
      wrapperStyle={styles.bottomSheetWrapStyle}
    >
      {(onScrollEndDrag) => (
        <ScrollView
          onScrollEndDrag={onScrollEndDrag}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 10 }}
          showsVerticalScrollIndicator={false}
        >
          <Animatable.View animation="slideInUp" iterationCount={1} duration={1500}>
            <Text
              style={{ ...Fonts.blackColor16SemiBold, textAlign: "center", margin: Sizes.fixPadding * 2 }}
            >
              Ride start on 25 june 2023
            </Text>
            <FlatList
              data={passengersList}
              keyExtractor={(item) => item.id}
              renderItem={renderPassengerItem}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <View style={{ marginTop: Sizes.fixPadding * 2 }}>
              {routesList.map((item, index) => renderRouteItem(item, index))}
            </View>
          </Animatable.View>
        </ScrollView>
      )}
    </BottomSheet>
  );
};

const styles = {
  bottomSheetWrapStyle: {
    borderTopLeftRadius: Sizes.fixPadding * 4,
    borderTopRightRadius: Sizes.fixPadding * 4,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: -Sizes.fixPadding,
  },
  sheetLocationIconWrapper: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: Colors.grayColor,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetCarImage: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    tintColor: Colors.grayColor,
  },
};

export default RideInfoSheet;
