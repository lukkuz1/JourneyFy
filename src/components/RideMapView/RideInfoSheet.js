import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import BottomSheet from "react-native-simple-bottom-sheet";
import * as Animatable from "react-native-animatable";
import { Colors, Fonts, Sizes, screenHeight } from "../../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import VerticalDashLine from "./VerticalDashLine";

const RideInfoSheet = () => {
  return (
    <BottomSheet
      isOpen={false}
      sliderMinHeight={350}
      sliderMaxHeight={screenHeight - 150}
      lineContainerStyle={{ height: 0 }}
      lineStyle={{ height: 0 }}
      wrapperStyle={styles.bottomSheetWrapStyle}
    >
      {(onScrollEndDrag) => (
        <ScrollView
          onScrollEndDrag={onScrollEndDrag}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2 }}
          showsVerticalScrollIndicator={false}
        >
          <Animatable.View
            animation="slideInUp"
            iterationCount={1}
            duration={1500}
          >
            <Text
              style={{
                ...Fonts.blackColor16SemiBold,
                textAlign: "center",
                margin: Sizes.fixPadding * 2,
              }}
            >
              Ride start on 25 june 2023
            </Text>

            <View style={{ flexDirection: "row" }}>
              <View>
                <View style={{ width: 16, alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/icons/car.png")}
                    style={{ width: 16, height: 16, resizeMode: "contain" }}
                  />
                </View>
                <VerticalDashLine />
              </View>
              <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                  Kelionės pradžia
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.blackColor14Medium,
                    marginTop: Sizes.fixPadding - 8,
                  }}
                >
                  2715 Ash Dr. San Jose, South Dakota 83475
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View>
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
                <VerticalDashLine />
              </View>
              <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                <Text numberOfLines={1} style={{ ...Fonts.redColor14Medium }}>
                  Pick up point (10:00 am)
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.blackColor14Medium,
                    marginTop: Sizes.fixPadding - 8,
                  }}
                >
                  2715 Ash Dr. San Jose, South Dakota 83475
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View>
                <View style={{ width: 16, alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/icons/car.png")}
                    style={{ width: 16, height: 16, resizeMode: "contain" }}
                  />
                </View>
                <VerticalDashLine />
              </View>
              <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                  Vairuoti
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.blackColor14Medium,
                    marginTop: Sizes.fixPadding - 8,
                  }}
                >
                  2715 Ash Dr. San Jose, South Dakota 83475
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View>
                <View
                  style={{
                    ...styles.locationIconWrapper,
                    borderColor: Colors.primaryColor,
                  }}
                >
                  <MaterialIcons
                    name="location-pin"
                    color={Colors.primaryColor}
                    size={12}
                  />
                </View>
                <VerticalDashLine />
              </View>
              <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.primaryColor14Medium }}
                >
                  Destination point (11:00 am)
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.blackColor14Medium,
                    marginTop: Sizes.fixPadding - 8,
                  }}
                >
                  2715 Ash Dr. San Jose, South Dakota 83475
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 16, alignItems: "center" }}>
                <Image
                  source={require("../../assets/images/icons/car.png")}
                  style={{ width: 16, height: 16, resizeMode: "contain" }}
                />
              </View>
              <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                  Ride end
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.blackColor14Medium,
                    marginTop: Sizes.fixPadding - 8,
                  }}
                >
                  2715 Ash Dr. San Jose, South Dakota 83475
                </Text>
              </View>
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
  },
  locationIconWrapper: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
};

export default RideInfoSheet;
