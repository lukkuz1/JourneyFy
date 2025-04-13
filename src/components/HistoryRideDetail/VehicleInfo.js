import React from "react";
import { View, Text } from "react-native";
import { Fonts, Sizes, Colors } from "../../constants/styles";

const VehicleInfo = () => {
  return (
    <View style={styles.vehicleInfoWrapper}>
      <Text style={{ ...Fonts.secondaryColor17SemiBold }}>Vehicle info</Text>
      <View style={{ marginVertical: Sizes.fixPadding + 5.0 }}>
        <Text style={{ ...Fonts.grayColor14SemiBold }}>Car model</Text>
        <Text style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding - 7.0 }}>
          Toyota Matrix | KJ 5454 | Black colour
        </Text>
      </View>
      <View>
        <Text style={{ ...Fonts.grayColor14SemiBold }}>Facilities</Text>
        <Text style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding - 7.0 }}>
          AC , Luggage space, Music system
        </Text>
      </View>
    </View>
  );
};

const styles = {
  vehicleInfoWrapper: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
};

export default VehicleInfo;
