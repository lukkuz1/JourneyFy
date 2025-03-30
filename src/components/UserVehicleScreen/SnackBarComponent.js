import React from "react";
import { Text } from "react-native";
import { Snackbar } from "react-native-paper";
import { Colors, Fonts } from "../../constants/styles";

const SnackBarComponent = ({ showSnackBar, setShowSnackBar }) => {
  return (
    <Snackbar
      style={{ backgroundColor: Colors.blackColor }}
      elevation={0}
      visible={showSnackBar}
      duration={1000}
      onDismiss={() => setShowSnackBar(false)}
    >
      <Text style={Fonts.whiteColor14Medium}>Automobilis pašalintas</Text>
    </Snackbar>
  );
};

export default SnackBarComponent;
