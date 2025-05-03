// src/components/SupportForm.js
import React from "react";
import { View, Text, TextInput, Platform, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const SupportForm = () => {
  return (
    <>
      <View style={{ margin: Sizes.fixPadding * 2 }}>
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Vardas
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Įveskite savo vardą"
            style={styles.textFieldStyle}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
          />
        </View>
      </View>
      <View style={{ marginHorizontal: Sizes.fixPadding * 2 }}>
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          E. paštas
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Įveskite savo e. paštą"
            style={styles.textFieldStyle}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
            keyboardType="email-address"
          />
        </View>
      </View>
      <View style={{ margin: Sizes.fixPadding * 2 }}>
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Žinutė
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Įveskite savo žinutę"
            style={{
              ...Fonts.blackColor15Medium,
              padding: 0,
              height: Platform.OS === "ios" ? 100 : null,
            }}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  valueBox: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
  },
  textFieldStyle: {
    ...Fonts.blackColor15Medium,
    height: 20,
    padding: 0,
  },
});

export default SupportForm;
