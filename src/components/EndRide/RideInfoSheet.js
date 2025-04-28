// src/components/EndRide/RideInfoSheet.js
import React from "react";
import { ScrollView, Text } from "react-native";
import BottomSheet from "react-native-simple-bottom-sheet";
import * as Animatable from "react-native-animatable";
import { Fonts, Sizes, screenHeight } from "../../constants/styles";
import PassengerList from "./PassengerList";
import RouteList from "./RouteList";
import styles from "../../screens/TemplateJourney/endRide/EndRideStyles";

const RideInfoSheet = ({ ride, passengersList = [] }) => {
  if (!ride) return null;

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
              style={{
                ...Fonts.blackColor16SemiBold,
                textAlign: "center",
                margin: Sizes.fixPadding * 2,
              }}
            >
              Keleiviai
            </Text>
            <PassengerList passengersList={passengersList} />

            <Text
              style={{
                ...Fonts.blackColor16SemiBold,
                textAlign: "center",
                marginTop: Sizes.fixPadding * 2,
                marginBottom: Sizes.fixPadding,
              }}
            >
              Maršrutas
            </Text>
            <RouteList ride={ride} />
          </Animatable.View>
        </ScrollView>
      )}
    </BottomSheet>
  );
};

export default RideInfoSheet;