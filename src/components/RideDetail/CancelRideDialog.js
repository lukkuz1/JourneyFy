// src/components/CancelRideDialog.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Overlay } from "@rneui/themed";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const CancelRideDialog = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={styles.dialogStyle}
    >
      <View style={{ margin: Sizes.fixPadding * 2 }}>
        <Text style={[Fonts.blackColor16SemiBold, { textAlign: "center" }]}>
          Ar tikrai norite atšaukti registraciją?
        </Text>
      </View>
      <View style={[CommonStyles.rowAlignCenter]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClose}
          style={styles.dialogButton}
        >
          <Text style={Fonts.whiteColor18SemiBold}>Ne</Text>
        </TouchableOpacity>
        <View style={{ width: 2, backgroundColor: Colors.whiteColor }} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onConfirm}
          style={styles.dialogButton}
        >
          <Text style={Fonts.whiteColor18SemiBold}>Taip</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

const styles = {
  dialogStyle: {
    width: "80%",
    borderRadius: Sizes.fixPadding,
    padding: 0,
    overflow: "hidden",
  },
  dialogButton: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding + 2,
  },
};

export default CancelRideDialog;