// src/components/StartRide/DirectionInfo.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const DirectionInfo = ({ ride }) => {
  if (!ride) return null;

  return (
    <View style={styles.container}>
      <Text style={Fonts.secondaryColor17SemiBold}>Kelionės informacija</Text>


      <Text style={styles.row}>
        <Text style={Fonts.grayColor14SemiBold}>Iš: </Text>
        <Text style={Fonts.blackColor14Medium}>{ride.pickup}</Text>
      </Text>

      <Text style={styles.row}>
        <Text style={Fonts.grayColor14SemiBold}>Į: </Text>
        <Text style={Fonts.blackColor14Medium}>{ride.drop}</Text>
      </Text>

      <Text style={styles.row}>
        <Text style={Fonts.grayColor14SemiBold}>Kaina: </Text>
        <Text style={Fonts.blackColor14Medium}>{ride.price} €</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    margin: Sizes.fixPadding * 2,
    padding: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixPadding,
  },
  row: {
    marginTop: Sizes.fixPadding,
  },
});

export default DirectionInfo;