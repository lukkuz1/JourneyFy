import React from "react";
import { View, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const VehicleInfo = ({ ride }) => (
  <View style={{
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2,
    paddingVertical: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding * 2,
  }}>
    <Text style={Fonts.secondaryColor17SemiBold}>Automobilio informacija</Text>
    <View style={{ marginVertical: Sizes.fixPadding }}>
      <Text style={Fonts.grayColor14SemiBold}>Modelis</Text>
      <Text style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding / 2 }}>
        {ride.car}
      </Text>
    </View>
    <View>
      <Text style={Fonts.grayColor14SemiBold}>Įranga</Text>
      <Text style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding / 2 }}>
        {ride.facilities}
      </Text>
    </View>
  </View>
);

export default VehicleInfo;