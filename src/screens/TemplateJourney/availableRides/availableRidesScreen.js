import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import Header from "../../components/header";

const rides = [
  {
    id: "1",
    amount: "$15.00",
    profile: require("../../assets/images/user/user8.png"),
    name: "Jenny Wilson",
    rating: "4.8",
    availableSheet: 2,
  },
  {
    id: "2",
    amount: "$25.00",
    profile: require("../../assets/images/user/user2.png"),
    name: "Guy Hawkins",
    rating: "4.5",
    availableSheet: 3,
  },
  {
    id: "3",
    amount: "$20.00",
    profile: require("../../assets/images/user/user3.png"),
    name: "Jacob Jones",
    rating: "4.3",
    availableSheet: 1,
  },
  {
    id: "4",
    amount: "$30.00",
    profile: require("../../assets/images/user/user4.png"),
    name: "Floyd Miles",
    rating: "4.5",
    availableSheet: 2,
  },
  {
    id: "5",
    amount: "$35.00",
    profile: require("../../assets/images/user/user5.png"),
    name: "Jerome Bell",
    rating: "4.5",
    availableSheet: 2,
  },
  {
    id: "6",
    amount: "$10.00",
    profile: require("../../assets/images/user/user6.png"),
    name: "Jenny Wilsonl",
    rating: "4.2",
    availableSheet: 1,
  },
  {
    id: "7",
    amount: "$15.00",
    profile: require("../../assets/images/user/user7.png"),
    name: "Arlene McCoy",
    rating: "4.8",
    availableSheet: 2,
  },
];

const AvailableRidesScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={"Rider on 25 June, 10:30 am"} navigation={navigation} />
        {ridesInfo()}
      </View>
    </View>
  );

  function ridesInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push("RideDetail");
        }}
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
                Mumbai,2464 Royal South
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
                Pune, 2464 Royal Ln. Mesa..
              </Text>
            </View>
          </View>
          <Text style={{ ...Fonts.primaryColor18SemiBold }}>{item.amount}</Text>
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
              source={item.profile}
              style={{
                width: 40.0,
                height: 40.0,
                borderRadius: Sizes.fixPadding - 5.0,
              }}
            />
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
              <Text numberOfLines={1} style={{ ...Fonts.blackColor15SemiBold }}>
                {item.name}
              </Text>
              <View
                style={{
                  ...CommonStyles.rowAlignCenter,
                  marginTop: Sizes.fixPadding - 8.0,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.grayColor13SemiBold, flex: 1 }}
                >
                  25 June, 10:30am
                </Text>
                <View style={styles.dateTimeAndRatingDivider}></View>
                <View style={{ ...CommonStyles.rowAlignCenter }}>
                  <Text
                    style={{
                      ...Fonts.grayColor13SemiBold,
                      marginRight: Sizes.fixPadding - 8.0,
                    }}
                  >
                    4.8
                  </Text>
                  <MaterialIcons
                    name="star"
                    color={Colors.secondaryColor}
                    size={16}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={{ width: "30%", alignItems: "flex-end" }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[1, 2, 3, 4].map((no) => (
                <MaterialIcons
                  key={`${no}`}
                  name="event-seat"
                  color={
                    no > item.availableSheet
                      ? Colors.grayColor
                      : Colors.primaryColor
                  }
                  size={16}
                  style={{
                    marginLeft: Sizes.fixPadding - 5.0,
                    alignSelf: "center",
                  }}
                />
              ))}
            </ScrollView>
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
};

export default AvailableRidesScreen;

const styles = StyleSheet.create({
  locationIconWrapper: {
    width: 18.0,
    height: 18.0,
    borderRadius: 9.0,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
  },
  verticalDashedLine: {
    height: 15.0,
    width: 1.0,
    borderStyle: "dashed",
    borderColor: Colors.grayColor,
    borderWidth: 0.8,
    marginLeft: Sizes.fixPadding - 2.0,
  },
  rideWrapper: {
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
  },
  dateTimeAndRatingDivider: {
    width: 1.0,
    backgroundColor: Colors.grayColor,
    height: "80%",
    marginHorizontal: Sizes.fixPadding - 5.0,
  },
});
