// src/components/VehicleInfo.js
import React from "react";
import { View, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const VehicleInfo = ({ ride }) => {
  return (
    <View style={styles.vehicleInfoWrapper}>
      <Text style={{ ...Fonts.secondaryColor17SemiBold }}>Automobilio informacija</Text>
      <View style={{ marginVertical: Sizes.fixPadding + 5 }}>
        <Text style={{ ...Fonts.grayColor14SemiBold }}>Automobilio modelis</Text>
        <Text style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding - 7 }}>
          {ride.vehicleModel || "Toyota Matrix | KJ 5454 | Black colour"}
        </Text>
      </View>
      <View>
        <Text style={{ ...Fonts.grayColor14SemiBold }}>Įranga</Text>
        <Text style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding - 7 }}>
          {ride.vehicleEquipment || "AC, Luggage space, Music system"}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  vehicleInfoWrapper: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2,
    paddingVertical: Sizes.fixPadding + 5,
    marginVertical: Sizes.fixPadding * 2,
  },
};

export default VehicleInfo;
