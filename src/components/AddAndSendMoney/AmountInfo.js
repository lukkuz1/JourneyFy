import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const AmountInfo = ({ addFor, amount, setAmount }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          ...Fonts.blackColor15SemiBold,
          marginBottom: Sizes.fixPadding,
        }}
      >
        {addFor === "money" ? "Pridėti sumą" : "Pridėkite siunčiamą sumą"}
      </Text>
      <View style={styles.valueBox}>
        <TextInput
          placeholder="Įveskite sumą..."
          style={{ ...Fonts.blackColor15Medium, height: 20, padding: 0 }}
          placeholderTextColor={Colors.grayColor}
          selectionColor={Colors.primaryColor}
          cursorColor={Colors.primaryColor}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: Sizes.fixPadding * 2,
  },
  valueBox: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
  },
});

export default AmountInfo;
