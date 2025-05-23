import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Overlay } from "@rneui/themed";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const LogoutDialog = ({ isVisible, onClose, onLogout }) => (
  <Overlay
    isVisible={isVisible}
    onBackdropPress={onClose}
    overlayStyle={{
      width: "80%",
      borderRadius: Sizes.fixPadding,
      padding: 0,
      overflow: "hidden",
    }}
  >
    <View
      style={{
        marginVertical: Sizes.fixPadding * 2.5,
        marginHorizontal: Sizes.fixPadding * 2.0,
      }}
    >
      <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: "center" }}>
        Ar tikrai norite atsijungti nuo šios paskyros?
      </Text>
    </View>
    <View style={{ ...CommonStyles.rowAlignCenter }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onLogout}
        style={styles.dialogButton}
      >
        <Text style={{ ...Fonts.whiteColor18SemiBold }}>Atsijungti</Text>
      </TouchableOpacity>
      <View style={{ backgroundColor: Colors.whiteColor, width: 2.0 }} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClose}
        style={styles.negativeDialogButton}
      >
        <Text style={{ ...Fonts.whiteColor18SemiBold }}>Atšaukti</Text>
      </TouchableOpacity>
    </View>
  </Overlay>
);

const styles = {
  dialogButton: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding + 2.0,
  },
  negativeDialogButton: {
    flex: 1,
    backgroundColor: Colors.redColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding + 2.0,
  },
};

export default LogoutDialog;
