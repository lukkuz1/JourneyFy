// src/components/OfferRide/PriceInfo.js
import React from "react";
import { View, Text, TextInput } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const PriceInfo = ({ price, onPriceChange }) => {
  return (
    <View style={{ margin: Sizes.fixPadding * 2.0 }}>
      <Text
        style={{
          ...Fonts.blackColor15SemiBold,
          marginBottom: Sizes.fixPadding,
        }}
      >
        Kaina už vietą
      </Text>
      <View style={styles.valueBox}>
        <TextInput
          placeholder="Įveskite savo kainą už vietą"
          value={price}
          onChangeText={onPriceChange}
          style={{
            ...Fonts.blackColor15Medium,
            height: 20.0,
            padding: 0,
          }}
          placeholderTextColor={Colors.grayColor}
          selectionColor={Colors.primaryColor}
          cursorColor={Colors.primaryColor}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const styles = {
  valueBox: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding,
  },
};

export default PriceInfo;
