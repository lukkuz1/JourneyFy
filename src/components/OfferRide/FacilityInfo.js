// src/components/FacilityInfo.js
import React from "react";
import { View, Text, TextInput, Platform } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const FacilityInfo = () => {
  return (
    <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
      <Text style={{ ...Fonts.blackColor15SemiBold, marginBottom: Sizes.fixPadding }}>
        Įranga (pvz: muzika, šildymas)
      </Text>
      <View style={styles.valueBox}>
        <TextInput
          placeholder="Įveskite įranga"
          style={{
            ...Fonts.blackColor15Medium,
            height: Platform.OS === "ios" ? 70.0 : null,
            padding: 0,
          }}
          multiline={true}
          numberOfLines={3}
          placeholderTextColor={Colors.grayColor}
          selectionColor={Colors.primaryColor}
          cursorColor={Colors.primaryColor}
          textAlignVertical="top"
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

export default FacilityInfo;
