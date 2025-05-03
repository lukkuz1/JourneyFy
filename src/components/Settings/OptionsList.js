import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const OptionsList = ({ onChangePassword, onMapSettings, onDeleteAccount }) => {
  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity style={styles.option} onPress={onChangePassword}>
        <MaterialCommunityIcons
          name="lock-reset"
          size={24}
          color={Colors.grayColor}
        />
        <Text style={styles.optionText}>Pakeisti slaptažodį</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={Colors.grayColor}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={onMapSettings}>
        <MaterialCommunityIcons
          name="map-marker-radius"
          size={24}
          color={Colors.grayColor}
        />
        <Text style={styles.optionText}>Žemėlapio nustatymai</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={Colors.grayColor}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={onDeleteAccount}>
        <MaterialCommunityIcons
          name="account-remove"
          size={24}
          color={Colors.redColor}
        />
        <Text style={[styles.optionText, { color: Colors.redColor }]}>
          Paskyros ištrinimas
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={Colors.grayColor}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    marginTop: 10,
    backgroundColor: Colors.whiteColor,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrayColor,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});

export default OptionsList;
