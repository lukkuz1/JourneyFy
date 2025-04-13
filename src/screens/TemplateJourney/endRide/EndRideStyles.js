
import { StyleSheet } from "react-native";
import { Colors, Sizes } from "../../../constants/styles";

export default StyleSheet.create({
  bottomSheetWrapStyle: {
    borderTopLeftRadius: Sizes.fixPadding * 4.0,
    borderTopRightRadius: Sizes.fixPadding * 4.0,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: -Sizes.fixPadding,
  },
  locationIconWrapper: {
    width: 16.0,
    height: 16.0,
    borderRadius: 8.0,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.0,
  },
  sheetLocationIconWrapper: {
    width: 16.0,
    height: 16.0,
    borderRadius: 8.0,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
  },
  markerCircle: {
    width: 20.0,
    height: 20.0,
    borderRadius: 10.0,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.whiteColor,
  },
  sheetCarImage: {
    width: 16.0,
    height: 16.0,
    resizeMode: "contain",
  },
});
