import React from "react";
import { View, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const VehicleInfo = ({ ride }) => {
  return (
    <View style={styles.vehicleInfoWrapper}>
      <Text style={Fonts.secondaryColor17SemiBold}>
        Automobilio informacija
      </Text>

      <View style={{ marginVertical: Sizes.fixPadding + 5 }}>
        <Text style={Fonts.grayColor14SemiBold}>Modelis</Text>
        <Text
          style={[
            Fonts.blackColor14Medium,
            { marginTop: Sizes.fixPadding - 7 },
          ]}
        >
          {ride.car || "Nenurodytas modelis"}
        </Text>
      </View>

      <View>
        <Text style={Fonts.grayColor14SemiBold}>Vietų skaičius</Text>
        <Text
          style={[
            Fonts.blackColor14Medium,
            { marginTop: Sizes.fixPadding - 7 },
          ]}
        >
          {ride.seats != null ? ride.seats : "Nenurodytas vietų sk."}
        </Text>
      </View>

      <View style={{ marginTop: Sizes.fixPadding + 5 }}>
        <Text style={Fonts.grayColor14SemiBold}>Įranga</Text>
        <Text
          style={[
            Fonts.blackColor14Medium,
            { marginTop: Sizes.fixPadding - 7 },
          ]}
        >
          {ride.facilities || "Nėra"}
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
