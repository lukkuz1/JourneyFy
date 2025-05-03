import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors, Sizes, Fonts, CommonStyles } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const RideInfoCard = ({
  selectedTabIndex,
  setselectedTabIndex,
  navigation,
  pickupAddress,
  destinationAddress,
  selectedDateAndTime,
  selectedSeat,
  onDateTimePress,
  onSeatPress,
  onSubmit,
  pickAlert,
}) => {
  return (
    <View style={styles.cardWrapper}>
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginVertical: Sizes.fixPadding + 5,
        }}
      >
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setselectedTabIndex(1)}
            style={[
              styles.rideButton,
              styles.findRideButton,
              {
                backgroundColor:
                  selectedTabIndex === 1
                    ? Colors.secondaryColor
                    : "transparent",
              },
            ]}
          >
            <Text
              style={
                selectedTabIndex === 1
                  ? Fonts.whiteColor15SemiBold
                  : Fonts.grayColor15SemiBold
              }
            >
              Rasti kelionę
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setselectedTabIndex(2)}
            style={[
              styles.rideButton,
              styles.offerRideButton,
              {
                backgroundColor:
                  selectedTabIndex === 2
                    ? Colors.secondaryColor
                    : "transparent",
              },
            ]}
          >
            <Text
              style={
                selectedTabIndex === 2
                  ? Fonts.whiteColor15SemiBold
                  : Fonts.grayColor15SemiBold
              }
            >
              Pasiūlykite kelionę
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("PickLocationScreen", { addressFor: "pickup" })
          }
          style={styles.locationBox}
        >
          <View
            style={[
              styles.locationIconWrapper,
              { borderColor: Colors.greenColor },
            ]}
          >
            <MaterialIcons
              name="location-pin"
              color={Colors.greenColor}
              size={18}
            />
          </View>
          <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5 }}>
            <Text numberOfLines={1} style={Fonts.blackColor15SemiBold}>
              Paėmimo vieta
            </Text>
            {pickupAddress ? (
              <Text
                numberOfLines={2}
                style={{
                  ...Fonts.grayColor14Medium,
                  marginTop: Sizes.fixPadding - 5,
                }}
              >
                {pickupAddress}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("PickLocationScreen", {
              addressFor: "destination",
            })
          }
          style={styles.locationBox}
        >
          <View
            style={[
              styles.locationIconWrapper,
              { borderColor: Colors.redColor },
            ]}
          >
            <MaterialIcons
              name="location-pin"
              color={Colors.redColor}
              size={18}
            />
          </View>
          <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5 }}>
            <Text numberOfLines={1} style={Fonts.blackColor15SemiBold}>
              Paskirties vieta
            </Text>
            {destinationAddress ? (
              <Text
                numberOfLines={2}
                style={{
                  ...Fonts.grayColor14Medium,
                  marginTop: Sizes.fixPadding - 5,
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
            marginTop: Sizes.fixPadding * 2,
            marginBottom: Sizes.fixPadding,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onDateTimePress}
            style={[
              styles.dateTimeWrapper,
              { marginRight: selectedTabIndex === 1 ? Sizes.fixPadding : 0 },
            ]}
          >
            <Ionicons
              name="calendar-outline"
              color={Colors.grayColor}
              size={18}
            />
            <Text
              numberOfLines={2}
              style={[
                { flex: 1, marginLeft: Sizes.fixPadding },
                selectedDateAndTime
                  ? Fonts.blackColor16SemiBold
                  : Fonts.grayColor15SemiBold,
              ]}
            >
              {selectedDateAndTime ? selectedDateAndTime : "Data ir Laikas"}
            </Text>
          </TouchableOpacity>
          {selectedTabIndex === 1 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onSeatPress}
              style={[styles.dateTimeWrapper, { marginLeft: Sizes.fixPadding }]}
            >
              <Ionicons
                name="calendar-outline"
                color={Colors.grayColor}
                size={18}
              />
              <Text
                numberOfLines={2}
                style={[
                  { flex: 1, marginLeft: Sizes.fixPadding },
                  selectedSeat
                    ? Fonts.blackColor16SemiBold
                    : Fonts.grayColor15SemiBold,
                ]}
              >
                {selectedSeat ? `${selectedSeat} Vieta` : "Vietų sk."}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onSubmit}
        style={[CommonStyles.button, styles.submitButton]}
      >
        <Text style={Fonts.whiteColor18Bold}>
          {selectedTabIndex === 1 ? "Rasti kelionę" : "Tęsti"}
        </Text>
      </TouchableOpacity>
      {pickAlert && (
        <Text style={styles.alertText}>Prašome pasirinkti tinkamas vietas</Text>
      )}
    </View>
  );
};

const styles = {
  cardWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    margin: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixPadding,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.bodyBackColor,
    ...CommonStyles.shadow,
  },
  rideButton: {
    flex: 1,
    padding: Sizes.fixPadding + 3,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  locationBox: {
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    padding: Sizes.fixPadding + 5,
    marginVertical: Sizes.fixPadding,
  },
  dateTimeWrapper: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    ...CommonStyles.shadow,
    paddingHorizontal: Sizes.fixPadding + 2,
    paddingVertical: Sizes.fixPadding,
  },
  submitButton: {
    marginHorizontal: 0,
    borderRadius: 0,
    borderBottomLeftRadius: Sizes.fixPadding,
    borderBottomRightRadius: Sizes.fixPadding,
  },
  alertText: {
    ...Fonts.whiteColor14Medium,
    backgroundColor: Colors.blackColor,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    paddingHorizontal: Sizes.fixPadding + 5,
    paddingVertical: Sizes.fixPadding - 5,
    borderRadius: Sizes.fixPadding - 5,
    zIndex: 100,
  },
};

export default RideInfoCard;
