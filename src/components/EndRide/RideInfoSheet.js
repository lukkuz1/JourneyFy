// src/components/RideInfoSheet.js
import React from "react";
import { ScrollView, Text } from "react-native";
import BottomSheet from "react-native-simple-bottom-sheet";
import * as Animatable from "react-native-animatable";
import { Fonts, Sizes, screenHeight } from "../../constants/styles";
import PassengerList from "./PassengerList";
import RouteList from "./RouteList";
import styles from "../../screens/TemplateJourney/endRide/EndRideStyles";

const RideInfoSheet = ({ routesList, passengersList }) => {
  return (
    <BottomSheet
      isOpen={false}
      sliderMinHeight={380}
      sliderMaxHeight={screenHeight - 150.0}
      lineContainerStyle={{ height: 0.0 }}
      lineStyle={{ height: 0.0 }}
      wrapperStyle={{ ...styles.bottomSheetWrapStyle }}
    >
      {(onScrollEndDrag) => (
        <ScrollView
          onScrollEndDrag={onScrollEndDrag}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 10.0 }}
          showsVerticalScrollIndicator={false}
        >
          <Animatable.View animation="slideInUp" iterationCount={1} duration={1500}>
            <Text
              style={{
                ...Fonts.blackColor16SemiBold,
                textAlign: "center",
                margin: Sizes.fixPadding * 2.0,
              }}
            >
              Ride start on 25 june 2023
            </Text>
            <PassengerList passengersList={passengersList} />
            <RouteList routesList={routesList} />
          </Animatable.View>
        </ScrollView>
      )}
    </BottomSheet>
  );
};

export default RideInfoSheet;