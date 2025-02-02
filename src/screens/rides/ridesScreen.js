import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Sizes, Fonts, CommonStyles } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import DashedLine from "react-native-dashed-line";

const ridesList = [
  {
    id: "1",
    profile: require("../../assets/images/user/user8.png"),
    name: "Jenny wilsom",
    date: "Today",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "2",
    profile: require("../../assets/images/user/user3.png"),
    name: "Devon Lane",
    date: "22 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "3",
    profile: require("../../assets/images/user/user16.png"),
    name: "Leslie Alexander",
    date: "23 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "4",
    profile: require("../../assets/images/user/user2.png"),
    name: "Guy Hawkins",
    date: "24 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "5",
    profile: require("../../assets/images/user/user17.png"),
    name: "Savannah Nguyen",
    date: "25 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
];

const RidesScreen = ({ navigation, route }) => {
  useEffect(() => {
    if (route.params?.id) {
      const copyData = rides;
      const newData = copyData.filter((item) => item.id !== route.params.id);
      setrides(newData);
    }
  }, [route.params?.id]);

  const [rides, setrides] = useState(ridesList);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {rides.length == 0 ? noRidesInfo() : ridesInfo()}
      </View>
    </View>
  );

  function noRidesInfo() {
    return (
      <View style={styles.emptyPage}>
        <Image
          source={require("../../assets/images/empty_ride.png")}
          style={{ width: 50.0, height: 50.0, resizeMode: "contain" }}
        />
        <Text
          style={{ ...Fonts.grayColor16SemiBold, marginTop: Sizes.fixPadding }}
        >
          Empty ride list
        </Text>
      </View>
    );
  }

  function ridesInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push("RideDetail", { id: item.id });
        }}
        style={styles.rideWrapper}
      >
        <Image
          source={item.profile}
          style={{
            width: 82.0,
            height: 82.0,
            borderRadius: Sizes.fixPadding - 5.0,
          }}
        />
        <View style={styles.rideDetailWrapper}>
          <Text style={{ ...Fonts.blackColor15SemiBold }}>{item.name}</Text>

          <View style={{ ...CommonStyles.rowAlignCenter }}>
            <Ionicons
              name="calendar-outline"
              color={Colors.blackColor}
              size={14}
            />
            <Text
              numberOfLines={1}
              style={{
                maxWidth: "50%",
                ...Fonts.blackColor12Medium,
                marginLeft: Sizes.fixPadding - 5.0,
              }}
            >
              {item.date}
            </Text>
            <View style={styles.dateTimeDivider}></View>
            <Ionicons name="time-outline" color={Colors.blackColor} size={14} />
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                ...Fonts.blackColor12Medium,
                marginLeft: Sizes.fixPadding - 5.0,
              }}
            >
              {item.time}
            </Text>
          </View>

          <View>
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
                  size={7}
                />
              </View>
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  ...Fonts.grayColor12Medium,
                  marginLeft: Sizes.fixPadding,
                }}
              >
                {item.pickup}
              </Text>
            </View>

            <DashedLine
              axis="vertical"
              dashLength={2}
              dashThickness={1}
              dashGap={1.5}
              dashColor={Colors.grayColor}
              style={{
                height: 5.0,
                marginLeft: Sizes.fixPadding - 4.0,
              }}
            />

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
                  size={7}
                />
              </View>
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  ...Fonts.grayColor12Medium,
                  marginLeft: Sizes.fixPadding,
                }}
              >
                {item.drop}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={rides}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
      />
    );
  }

  function header() {
    return (
      <View style={styles.header}>
        <Text
          style={{
            ...Fonts.whiteColor20SemiBold,
            maxWidth: "85%",
            textAlign: "center",
          }}
        >
          My Rides
        </Text>
        <View style={{ position: "absolute", right: 20 }}>
          <MaterialIcons
            name="account-circle"
            color={Colors.whiteColor}
            size={29}
            onPress={() => {
              navigation.push("RideRequest");
            }}
          />
          <View style={styles.headerAccountBedge}></View>
        </View>
      </View>
    );
  }
};

export default RidesScreen;

const styles = StyleSheet.create({
  emptyPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: Sizes.fixPadding * 2.0,
  },
  header: {
    ...CommonStyles.rowAlignCenter,
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    padding: Sizes.fixPadding * 2.0,
  },
  locationIconWrapper: {
    width: 12.0,
    height: 12.0,
    borderRadius: 6.0,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAccountBedge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10.0,
    height: 10.0,
    borderRadius: 5.0,
    backgroundColor: Colors.redColor,
  },
  dateTimeDivider: {
    marginHorizontal: Sizes.fixPadding - 5.0,
    width: 1.0,
    backgroundColor: Colors.blackColor,
    height: "100%",
  },
  rideDetailWrapper: {
    flex: 1,
    marginLeft: Sizes.fixPadding,
    height: 82.0,
    justifyContent: "space-between",
  },
  rideWrapper: {
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.rowAlignCenter,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});
