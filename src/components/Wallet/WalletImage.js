import React from "react";
import { Image, StyleSheet } from "react-native";
import { screenWidth, Sizes } from "../../constants/styles";

const WalletImage = () => {
  return (
    <Image
      source={require("../../assets/images/wallet.png")}
      style={styles.walletImageStyle}
    />
  );
};

const styles = StyleSheet.create({
  walletImageStyle: {
    width: screenWidth / 2,
    height: screenWidth / 2,
    resizeMode: "contain",
    alignSelf: "center",
    marginHorizontal: Sizes.fixPadding * 2,
    marginTop: Sizes.fixPadding * 2,
  },
});

export default WalletImage;
