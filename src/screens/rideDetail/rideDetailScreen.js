import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import Header from "../../components/header";
import { Overlay } from "@rneui/themed";

const passengerList = [
  {
    id: "1",
    profile: require("../../assets/images/user/user10.png"),
    name: "Savannah Nguyen",
  },
  {
    id: "2",
    profile: require("../../assets/images/user/user1.jpeg"),
    name: "Brooklyn Simmons",
  },
];

const reviewsList = [
  {
    id: "1",
    profile: require("../../assets/images/user/user11.png"),
    name: "Wade Warren",
    rating: 4.8,
    reviewDate: "25 jan 2023",
    review:
      "Lorem ipsum dolor sit amet consectetur. Allaliquam sit mollis adipiscing donec ut sed. Dictum dignissim enim condimentum vitae aliquam sed. ",
  },
  {
    id: "2",
    profile: require("../../assets/images/user/user12.png"),
    name: "Jenny wilsom",
    rating: 3.5,
    reviewDate: "25 jan 2023",
    review:
      "Lorem ipsum dolor sit amet consectetur. Allaliquam sit mollis adipiscing donec ut sed. Dictum dignissim enim condimentum vitae aliquam sed. ",
  },
];

const RideDetailScreen = ({ navigation, route }) => {
  const [showCancelDialog, setshowCancelDialog] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {riderInfo()}
          {riderDetail()}
          {passengerDetail()}
          {reviewInfo()}
          {vehicleInfo()}
        </ScrollView>
      </View>
      {footer()}
      {cancelRideDialog()}
    </View>
  );

  function header() {
    return (
      <View style={{ justifyContent: "center" }}>
        <Header title={"Ride detail"} navigation={navigation} />
        {route?.params?.id ? (
          <MaterialIcons
            name="call"
            color={Colors.whiteColor}
            size={20}
            style={{ position: "absolute", right: 20 }}
          />
        ) : null}
      </View>
    );
  }

  function cancelRideDialog() {
    return (
      <Overlay
        isVisible={showCancelDialog}
        onBackdropPress={() => setshowCancelDialog(false)}
        overlayStyle={styles.dialogStyle}
      >
        <View
          style={{
            marginVertical: Sizes.fixPadding * 2.5,
            marginHorizontal: Sizes.fixPadding * 4.0,
          }}
        >
          <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: "center" }}>
            Are you sure you want to cancel your ride?
          </Text>
        </View>
        <View style={{ ...CommonStyles.rowAlignCenter }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setshowCancelDialog(false);
            }}
            style={styles.dialogButton}
          >
            <Text style={{ ...Fonts.whiteColor18SemiBold }}>No</Text>
          </TouchableOpacity>
          <View style={{ backgroundColor: Colors.whiteColor, width: 2.0 }} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setshowCancelDialog(false);
              navigation.navigate({
                name: "Rides",
                params: {
                  id: route.params.id,
                },
                merge: true,
              });
            }}
            style={styles.dialogButton}
          >
            <Text style={{ ...Fonts.whiteColor18SemiBold }}>Yes</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    );
  }

  function footer() {
    return (
      <View style={styles.footer}>
        {route?.params?.id ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setshowCancelDialog(true);
            }}
            style={styles.cancelRideButton}
          >
            <Text numberOfLines={1} style={{ ...Fonts.primaryColor18Bold }}>
              Cancel ride
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.push("ConfirmPooling");
            }}
            style={{
              flex: 1,
              ...CommonStyles.button,
              marginHorizontal: Sizes.fixPadding,
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Bold }}>
              Request ride
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.push("Message");
          }}
          style={{
            flex: 1,
            ...CommonStyles.button,
            marginHorizontal: Sizes.fixPadding,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Bold }}>
            Message
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function vehicleInfo() {
    return (
      <View style={styles.vehicleInfoWrapper}>
        <Text style={{ ...Fonts.secondaryColor17SemiBold }}>Vehicle info</Text>
        <View style={{ marginVertical: Sizes.fixPadding + 5.0 }}>
          <Text style={{ ...Fonts.grayColor14SemiBold }}>Car model</Text>
          <Text
            style={{
              ...Fonts.blackColor14Medium,
              marginTop: Sizes.fixPadding - 7.0,
            }}
          >
            Toyota Matrix | KJ 5454 | Black colour
          </Text>
        </View>
        <View>
          <Text style={{ ...Fonts.grayColor14SemiBold }}>Facilities</Text>
          <Text
            style={{
              ...Fonts.blackColor14Medium,
              marginTop: Sizes.fixPadding - 7.0,
            }}
          >
            AC , Luggage space, Music system
          </Text>
        </View>
      </View>
    );
  }

  function reviewInfo() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          paddingHorizontal: Sizes.fixPadding * 2.0,
          paddingVertical: Sizes.fixPadding + 5.0,
        }}
      >
        <View
          style={{
            ...CommonStyles.rowAlignCenter,
            marginBottom: Sizes.fixPadding + 5.0,
          }}
        >
          <Text style={{ flex: 1, ...Fonts.secondaryColor17SemiBold }}>
            Review
          </Text>
          <Text
            onPress={() => {
              navigation.push("Reviews");
            }}
            style={{ ...Fonts.primaryColor16SemiBold }}
          >
            View all
          </Text>
        </View>
        {reviewsList.map((item, index) => (
          <View key={`${item.id}`}>
            <View style={{ ...CommonStyles.rowAlignCenter }}>
              <Image
                source={item.profile}
                style={{ width: 40.0, height: 40.0, borderRadius: 20.0 }}
              />
              <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.blackColor16SemiBold }}
                >
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: Sizes.fixPadding - 8.0,
                    ...Fonts.grayColor14Medium,
                  }}
                >
                  {item.reviewDate}
                </Text>
              </View>
              <View style={{ ...CommonStyles.rowAlignCenter }}>
                <Text style={{ ...Fonts.grayColor16SemiBold }}>
                  {item.rating.toFixed(1)}
                </Text>
                <MaterialIcons
                  name="star"
                  color={Colors.secondaryColor}
                  size={16}
                />
              </View>
            </View>
            <Text
              style={{
                ...Fonts.grayColor14Medium,
                marginTop: Sizes.fixPadding,
              }}
            >
              {item.review}
            </Text>
            {index === reviewsList.length - 1 ? null : (
              <View
                style={{
                  height: 1.0,
                  backgroundColor: Colors.lightGrayColor,
                  marginVertical: Sizes.fixPadding * 2.0,
                }}
              ></View>
            )}
          </View>
        ))}
      </View>
    );
  }

  function passengerDetail() {
    const renderItem = ({ item, index }) => (
      <View
        style={{
          alignItems: "center",
          maxWidth: 72.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Image
          source={
            index <= passengerList.length - 1
              ? passengerList[index].profile
              : require("../../assets/images/icons/empty.png")
          }
          style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
        />
        <Text
          numberOfLines={2}
          style={{
            ...Fonts.blackColor14Medium,
            textAlign: "center",
            marginTop: Sizes.fixPadding,
          }}
        >
          {index <= passengerList.length - 1
            ? passengerList[index].name
            : "Empty seat"}
        </Text>
      </View>
    );
    return (
      <View style={styles.passengerInfoWrapper}>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding * 1.5,
          }}
        >
          <Text style={{ ...Fonts.secondaryColor17SemiBold }}>Passenger</Text>
          <Text
            style={{
              ...Fonts.grayColor16Medium,
              marginTop: Sizes.fixPadding - 7.0,
            }}
          >
            2 seat booked(1 male, 1 female)
          </Text>
        </View>
        <View>
          <FlatList
            data={[1, 2, 3, 4]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item}`}
            renderItem={renderItem}
          />
        </View>
      </View>
    );
  }

  function riderDetail() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          paddingVertical: Sizes.fixPadding + 5.0,
        }}
      >
        <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
          <View style={{ ...CommonStyles.rowAlignCenter }}>
            <Text
              numberOfLines={1}
              style={{ flex: 1, ...Fonts.secondaryColor17SemiBold }}
            >
              Rider detail
            </Text>
            <Text
              onPress={() => {
                navigation.push("RideMapView");
              }}
              style={{
                ...Fonts.greenColor14SemiBold,
                textDecorationLine: "underline",
              }}
            >
              Map view
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: Sizes.fixPadding + 5.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
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
                size={15}
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
                size={15}
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

        <DashedLine
          dashLength={3}
          dashThickness={1}
          dashColor={Colors.grayColor}
          style={{ marginVertical: Sizes.fixPadding + 5.0, overflow: "hidden" }}
        />

        <View
          style={{
            ...CommonStyles.rowAlignCenter,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
              Start time
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor14SemiBold,
                marginTop: Sizes.fixPadding - 8.0,
              }}
            >
              25 June,09 :00AM
            </Text>
          </View>

          <View style={styles.verticalDivider}></View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
              Return time
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor14SemiBold,
                marginTop: Sizes.fixPadding - 8.0,
              }}
            >
              25 june,09 :00PM
            </Text>
          </View>

          <View style={styles.verticalDivider}></View>

          <View style={{ flex: 0.7, alignItems: "center" }}>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
              Ride with
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor14SemiBold,
                marginTop: Sizes.fixPadding - 8.0,
              }}
            >
              150 people
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function riderInfo() {
    return (
      <View
        style={{
          ...CommonStyles.rowAlignCenter,
          margin: Sizes.fixPadding * 2.0,
        }}
      >
        <Image
          source={require("../../assets/images/user/user9.png")}
          style={{
            width: 80.0,
            height: 80.0,
            borderRadius: Sizes.fixPadding - 5.0,
          }}
        />
        <View
          style={{
            flex: 1,
            marginHorizontal: Sizes.fixPadding,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
            Jacob Jones
          </Text>
          <View
            style={{
              ...CommonStyles.rowAlignCenter,
              marginVertical: Sizes.fixPadding - 6.0,
            }}
          >
            <Text style={{ ...Fonts.grayColor14SemiBold }}>4.8</Text>
            <MaterialIcons
              name="star"
              color={Colors.secondaryColor}
              size={16}
            />
            <View style={styles.ratingAndReviewDivider}></View>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.grayColor14SemiBold, flex: 1 }}
            >
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
  }
};

export default RideDetailScreen;

const styles = StyleSheet.create({
  ratingAndReviewDivider: {
    width: 1.0,
    backgroundColor: Colors.grayColor,
    height: "80%",
    marginHorizontal: Sizes.fixPadding - 5.0,
  },
  locationIconWrapper: {
    width: 22.0,
    height: 22.0,
    borderRadius: 11.0,
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
    marginLeft: Sizes.fixPadding + 1.0,
  },
  verticalDivider: {
    height: "100%",
    backgroundColor: Colors.lightGrayColor,
    width: 1.0,
    marginHorizontal: Sizes.fixPadding,
  },
  passengerInfoWrapper: {
    backgroundColor: Colors.whiteColor,
    marginVertical: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding + 5.0,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  vehicleInfoWrapper: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  footer: {
    backgroundColor: Colors.bodyBackColor,
    paddingVertical: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    ...CommonStyles.rowAlignCenter,
  },
  cancelRideButton: {
    flex: 1,
    ...CommonStyles.button,
    backgroundColor: Colors.whiteColor,
    marginHorizontal: Sizes.fixPadding,
    ...CommonStyles.shadow,
  },
  dialogButton: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding + 2.0,
  },
  dialogStyle: {
    width: "80%",
    borderRadius: Sizes.fixPadding,
    padding: 0,
    overflow: "hidden",
  },
});
