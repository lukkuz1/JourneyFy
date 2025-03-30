import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Sizes } from "../../constants/styles";

const AddVehicleButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("AddVehicleScreen")}
      style={styles.addButtonStyle}
    >
      <MaterialIcons name="add" color={Colors.whiteColor} size={40} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButtonStyle: {
    position: "absolute",
    bottom: 0,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.secondaryColor,
    alignSelf: "center",
    margin: Sizes.fixPadding * 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddVehicleButton;
