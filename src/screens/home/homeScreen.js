import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  Colors,
  Sizes,
  Fonts,
  CommonStyles,
  screenHeight,
} from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { BottomSheet } from "@rneui/themed";
import { Calendar } from "react-native-calendars";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import DashedLine from "react-native-dashed-line";

const hoursList = [...range(1, 12)];

const minutesList = [...range(0, 59)];

const seats = [...range(1, 8)];

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

const HomeScreen = ({ navigation, route }) => {
  useEffect(() => {
    if (route.params?.address) {
      if (route.params.addressFor === "pickup") {
        setPickupAddress(route.params.address);
      } else {
        setDestinationAddress(route.params.address);
      }
    }
  }, [route.params?.address]);

  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [pickAlert, setpickAlert] = useState(false);

  const todayDate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  const [selectedTabIndex, setselectedTabIndex] = useState(1);
  const [selectedDateAndTime, setselectedDateAndTime] = useState("");
  const [selectedDate, setselectedDate] = useState("");
  const [showDateTimeSheet, setshowDateTimeSheet] = useState(false);
  const [defaultDate, setdefaultDate] = useState(new Date().getDate());
  const [selectedHour, setselectedHour] = useState(
    hoursList[new Date().getHours()%12 - 1]
  );
  const [selectedMinute, setselectedMinute] = useState(
    minutesList[new Date().getMinutes()]
  );
  const [selectedAmPm, setselectedAmPm] = useState(
    new Date().toLocaleTimeString().slice(-2)
  );
  const [showNoOfSeatSheet, setshowNoOfSeatSheet] = useState(false);
  const [selectedSeat, setselectedSeat] = useState();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {map()}
        {findAndOfferRideInfo()}
      </View>
      {dateTimePicker()}
      {noOfSeatSheet()}
      {pickAddressMessage()}
    </View>
  );

  function pickAddressMessage() {
    return pickAlert ? (
      <Text style={styles.alertTextStyle}>
        Please pick the correct locations
      </Text>
    ) : null;
  }

  function noOfSeatSheet() {
    return (
      <BottomSheet
        scrollViewProps={{ scrollEnabled: false }}
        isVisible={showNoOfSeatSheet}
        onBackdropPress={() => {
          setshowNoOfSeatSheet(false);
        }}
      >
        <View style={{ ...styles.sheetStyle }}>
          <Text style={styles.sheetHeader}>No of seat</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
          >
            <View>
              {seats.map((item, index) => (
                <View key={`${index}`}>
                  <Text
                    onPress={() => {
                      setselectedSeat(item);
                      setshowNoOfSeatSheet(false);
                    }}
                    style={{
                      ...(selectedSeat == item
                        ? { ...Fonts.secondaryColor16SemiBold }
                        : { ...Fonts.blackColor16SemiBold }),
                      textAlign: "center",
                    }}
                  >
                    {item} Seat
                  </Text>
                  {index == seats.length - 1 ? null : (
                    <View
                      style={{
                        height: 1.0,
                        backgroundColor: Colors.lightGrayColor,
                        marginVertical: Sizes.fixPadding * 2.0,
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    );
  }

  function dateTimePicker() {
    return (
      <BottomSheet
        modalProps={{ height: 200.0 }}
        scrollViewProps={{ scrollEnabled: false }}
        isVisible={showDateTimeSheet}
        onBackdropPress={() => {
          setshowDateTimeSheet(false);
        }}
      >
        <View style={styles.sheetStyle}>
          <Text
            style={{ ...styles.sheetHeader, marginBottom: Sizes.fixPadding }}
          >
            Select date & time
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Calendar
              monthFormat={`MMMM  yyyy`}
              renderArrow={(direction) =>
                direction == "left" ? (
                  <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.grayColor}
                    size={18}
                  />
                ) : (
                  <MaterialIcons
                    name="arrow-forward-ios"
                    color={Colors.grayColor}
                    size={18}
                  />
                )
              }
              hideExtraDays={true}
              disableMonthChange={true}
              firstDay={1}
              onPressArrowLeft={(subtractMonth) => subtractMonth()}
              onPressArrowRight={(addMonth) => addMonth()}
              enableSwipeMonths={true}
              dayComponent={({ date, state }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setselectedDate(`${date.year}-${date.month}-${date.day}`);
                      setdefaultDate(date.day);
                    }}
                    style={{
                      ...styles.calenderDateWrapStyle,
                      borderColor:
                        date.day == defaultDate
                          ? Colors.secondaryColor
                          : Colors.whiteColor,
                    }}
                  >
                    <Text
                      style={
                        date.day == defaultDate
                          ? { ...Fonts.secondaryColor16SemiBold }
                          : { ...Fonts.blackColor16SemiBold }
                      }
                    >
                      {date.day}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              theme={{
                calendarBackground: Colors.whiteColor,
                textSectionTitleColor: Colors.grayColor,
                monthTextColor: Colors.blackColor,
                textMonthFontFamily: "Montserrat-SemiBold",
                textDayHeaderFontFamily: "Montserrat-Medium",
                textMonthFontSize: 16,
                textDayHeaderFontSize: 12,
              }}
            />

            <DashedLine
              dashLength={3}
              dashThickness={1}
              dashColor={Colors.grayColor}
              style={{ marginVertical: Sizes.fixPadding * 2.0 }}
            />

            <View style={styles.timeWrapper}>
              {hourPicker()}
              <Text
                style={{
                  ...Fonts.primaryColor18SemiBold,
                  marginHorizontal: Sizes.fixPadding * 2.0,
                }}
              >
                :
              </Text>
              {minutePicker()}
              <Text
                style={{
                  ...Fonts.primaryColor18SemiBold,
                  marginHorizontal: Sizes.fixPadding * 2.0,
                }}
              >
                :
              </Text>
              {amPmPicker()}
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                const displayHour = `${
                  selectedHour.toString().length == 1
                    ? `0${selectedHour}`
                    : selectedHour
                }`;
                const displayMinute = `${
                  selectedMinute.toString().length == 1
                    ? `0${selectedMinute}`
                    : selectedMinute
                }`;
                const displayTime = `${displayHour}:${displayMinute} ${selectedAmPm}`;
                setselectedDateAndTime(
                  `${selectedDate ? selectedDate : todayDate}` +
                    ` ` +
                    `${displayTime}`
                );
                setshowDateTimeSheet(false);
              }}
              style={{
                ...CommonStyles.button,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginBottom: Sizes.fixPadding * 2.0,
              }}
            >
              <Text style={{ ...Fonts.whiteColor18Bold }}>Okay</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BottomSheet>
    );
  }

  function amPmPicker() {
    const list = ["AM", "PM"];
    return (
      <ScrollPicker
        dataSource={list}
        selectedIndex={list.indexOf(selectedAmPm)}
        renderItem={(data) => {
          return (
            <Text
              style={
                data == selectedAmPm
                  ? { ...Fonts.primaryColor18SemiBold }
                  : { ...Fonts.grayColor15SemiBold }
              }
            >
              {data}
            </Text>
          );
        }}
        onValueChange={(data) => {
          setselectedAmPm(data);
        }}
        wrapperColor={Colors.whiteColor}
        wrapperHeight={60}
        itemHeight={60}
        highlightColor={Colors.grayColor}
        highlightBorderWidth={1}
      />
    );
  }

  function hourPicker() {
    return (
      <ScrollPicker
        dataSource={hoursList}
        selectedIndex={hoursList.indexOf(selectedHour)}
        renderItem={(data) => {
          return (
            <Text
              style={
                data == selectedHour
                  ? { ...Fonts.primaryColor18SemiBold }
                  : { ...Fonts.grayColor15SemiBold }
              }
            >
              {data.toString().length == 1 ? `0${data}` : data}
            </Text>
          );
        }}
        onValueChange={(data) => {
          setselectedHour(data);
        }}
        wrapperColor={Colors.whiteColor}
        wrapperHeight={60}
        itemHeight={60}
        highlightColor={Colors.grayColor}
        highlightBorderWidth={1}
      />
    );
  }

  function minutePicker() {
    return (
      <ScrollPicker
        dataSource={minutesList}
        selectedIndex={minutesList.indexOf(selectedMinute)}
        renderItem={(data) => {
          return (
            <Text
              style={
                data == selectedMinute
                  ? { ...Fonts.primaryColor18SemiBold }
                  : { ...Fonts.grayColor15SemiBold }
              }
            >
              {data.toString().length == 1 ? `0${data}` : data}
            </Text>
          );
        }}
        onValueChange={(data) => {
          setselectedMinute(data);
        }}
        wrapperColor={Colors.whiteColor}
        wrapperHeight={60}
        itemHeight={60}
        highlightColor={Colors.grayColor}
        highlightBorderWidth={1}
      />
    );
  }

  function findAndOfferRideInfo() {
    return (
      <View style={styles.findAndOfferRideInfoWrapper}>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginVertical: Sizes.fixPadding + 5.0,
          }}
        >
          <View style={styles.findAndOfferRideButtonWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setselectedTabIndex(1)}
              style={{
                ...styles.findAndOfferRideButton,
                ...styles.findRideButton,
                backgroundColor:
                  selectedTabIndex == 1 ? Colors.secondaryColor : "transparent",
              }}
            >
              <Text
                style={
                  selectedTabIndex == 1
                    ? { ...Fonts.whiteColor15SemiBold }
                    : { ...Fonts.grayColor15SemiBold }
                }
              >
                Find ride
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setselectedTabIndex(2)}
              style={{
                ...styles.findAndOfferRideButton,
                ...styles.offerRideButton,
                backgroundColor:
                  selectedTabIndex == 2 ? Colors.secondaryColor : "transparent",
              }}
            >
              <Text
                style={
                  selectedTabIndex == 2
                    ? { ...Fonts.whiteColor15SemiBold }
                    : { ...Fonts.grayColor15SemiBold }
                }
              >
                Offer ride
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.push("PickLocation", { addressFor: "pickup" });
            }}
            style={{
              marginVertical: Sizes.fixPadding * 2.0,
              ...styles.locationBox,
            }}
          >
            <View
              style={{
                borderColor: Colors.greenColor,
                ...styles.locationIconWrapper,
              }}
            >
              <MaterialIcons
                name="location-pin"
                color={Colors.greenColor}
                size={18.0}
              />
            </View>
            <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
              <Text numberOfLines={1} style={{ ...Fonts.blackColor15SemiBold }}>
                Pick up location
              </Text>
              {pickupAddress ? (
                <Text
                  numberOfLines={2}
                  style={{
                    ...Fonts.grayColor14Medium,
                    marginTop: Sizes.fixPadding - 5.0,
                  }}
                >
                  {pickupAddress}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.push("PickLocation", { addressFor: "destination" });
            }}
            style={{ ...styles.locationBox }}
          >
            <View
              style={{
                borderColor: Colors.redColor,
                ...styles.locationIconWrapper,
              }}
            >
              <MaterialIcons
                name="location-pin"
                color={Colors.redColor}
                size={18.0}
              />
            </View>
            <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
              <Text numberOfLines={1} style={{ ...Fonts.blackColor15SemiBold }}>
                Destination location
              </Text>
              {destinationAddress ? (
                <Text
                  numberOfLines={2}
                  style={{
                    ...Fonts.grayColor14Medium,
                    marginTop: Sizes.fixPadding - 5.0,
                  }}
                >
                  {destinationAddress}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              marginTop: Sizes.fixPadding * 2.0,
              marginBottom: Sizes.fixPadding,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setselectedHour(selectedHour);
                setselectedMinute(selectedMinute);
                setselectedAmPm(selectedAmPm);
                setshowDateTimeSheet(true);
              }}
              style={{
                ...styles.dateAndTimeAndSeatWrapper,
                marginRight: selectedTabIndex == 1 ? Sizes.fixPadding : 0,
              }}
            >
              <Ionicons
                name="calendar-outline"
                color={Colors.grayColor}
                size={18}
              />
              <Text
                numberOfLines={2}
                style={{
                  ...(selectedDateAndTime
                    ? { ...Fonts.blackColor16SemiBold }
                    : { ...Fonts.grayColor15SemiBold }),
                  flex: 1,
                  marginLeft: Sizes.fixPadding,
                }}
              >
                {selectedDateAndTime ? selectedDateAndTime : "Date & Time"}
              </Text>
            </TouchableOpacity>
            {selectedTabIndex == 1 ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setshowNoOfSeatSheet(true);
                }}
                style={{
                  ...styles.dateAndTimeAndSeatWrapper,
                  marginLeft: Sizes.fixPadding,
                }}
              >
                <Ionicons
                  name="calendar-outline"
                  color={Colors.grayColor}
                  size={18}
                />
                <Text
                  numberOfLines={2}
                  style={{
                    ...(selectedSeat
                      ? { ...Fonts.blackColor16SemiBold }
                      : { ...Fonts.grayColor15SemiBold }),
                    flex: 1,
                    marginLeft: Sizes.fixPadding,
                  }}
                >
                  {selectedSeat ? `${selectedSeat} Seat` : "No. of seat"}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (pickupAddress && destinationAddress) {
              selectedTabIndex == 1
                ? navigation.push("AvailableRides")
                : navigation.push("OfferRide");
            } else {
              setpickAlert(true);
              setTimeout(() => {
                setpickAlert(false);
              }, 2000);
            }
          }}
          style={{ ...CommonStyles.button, ...styles.dialogButton }}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>
            {selectedTabIndex == 1 ? " Find ride" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function map() {
    return (
      <MapView
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
      />
    );
  }

  function header() {
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/user/user1.jpeg")}
            style={{ width: 45.0, height: 45.0, borderRadius: 22.5 }}
          />
          <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
            <Text numberOfLines={1} style={{ ...Fonts.whiteColor16SemiBold }}>
              Welcome john
            </Text>
            <View
              style={{
                ...CommonStyles.rowAlignCenter,
                marginTop: Sizes.fixPadding - 7.0,
              }}
            >
              <Ionicons
                name="location-outline"
                size={14}
                color={Colors.whiteColor}
              />
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  ...Fonts.whiteColor14Medium,
                  marginLeft: Sizes.fixPadding - 5.0,
                }}
              >
                Mumbai
              </Text>
            </View>
          </View>
          <Ionicons
            name="notifications-outline"
            size={22}
            color={Colors.whiteColor}
            onPress={() => {
              navigation.push("Notifications");
            }}
          />
        </View>
      </View>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  alertTextStyle: {
    ...Fonts.whiteColor14Medium,
    backgroundColor: Colors.blackColor,
    position: "absolute",
    bottom: 0.0,
    alignSelf: "center",
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding - 5.0,
    borderRadius: Sizes.fixPadding - 5.0,
    overflow: "hidden",
    zIndex: 100.0,
  },
  header: {
    backgroundColor: Colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
  },
  findAndOfferRideInfoWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10.0,
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    margin: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    borderWidth: 0,
  },
  findAndOfferRideButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.bodyBackColor,
    ...CommonStyles.shadow,
    borderWidth: 0,
  },
  findAndOfferRideButton: {
    flex: 1,
    padding: Sizes.fixPadding + 3.0,
    alignItems: "center",
    justifyContent: "center",
  },
  findRideButton: {
    borderTopLeftRadius: Sizes.fixPadding,
    borderBottomLeftRadius: Sizes.fixPadding,
  },
  offerRideButton: {
    borderTopRightRadius: Sizes.fixPadding,
    borderBottomRightRadius: Sizes.fixPadding,
  },
  locationIconWrapper: {
    width: 24.0,
    height: 24.0,
    borderRadius: 12.0,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
  },
  locationBox: {
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    padding: Sizes.fixPadding + 5.0,
  },
  dateAndTimeAndSeatWrapper: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    ...CommonStyles.shadow,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    paddingVertical: Sizes.fixPadding,
  },
  calenderDateWrapStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 28.0,
    height: 28.0,
    borderRadius: Sizes.fixPadding - 7.0,
    borderWidth: 1.5,
  },
  dialogButton: {
    marginHorizontal: 0,
    borderRadius: 0,
    borderBottomLeftRadius: Sizes.fixPadding,
    borderBottomRightRadius: Sizes.fixPadding,
  },
  timeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 4.0,
  },
  sheetStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 4.0,
    borderTopRightRadius: Sizes.fixPadding * 4.0,
    paddingTop: Sizes.fixPadding * 2.0,
    maxHeight: screenHeight - 150,
  },
  sheetHeader: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    textAlign: "center",
    ...Fonts.primaryColor16SemiBold,
    marginBottom: Sizes.fixPadding * 2.5,
  },
});
