import { Dimensions } from "react-native";

export const Colors = {
  primaryColor: "#264D66",
  secondaryColor: "#EAAE48",
  lightSecondaryColor: "#FFEED2",
  blackColor: "#333333",
  whiteColor: "#FFFFFF",
  grayColor: "#949494",
  lightGrayColor: "#D4D4D4",
  bodyBackColor: "#F4F4F4",
  greenColor: "#189915",
  redColor: "#D24036",
};

export const Fonts = {
  whiteColor12Medium: {
    color: Colors.whiteColor,
    fontSize: 12.0,
    fontFamily: "Montserrat-Medium",
  },

  whiteColor14Medium: {
    color: Colors.whiteColor,
    fontSize: 14.0,
    fontFamily: "Montserrat-Medium",
  },

  whiteColor15Medium: {
    color: Colors.whiteColor,
    fontSize: 15.0,
    fontFamily: "Montserrat-Medium",
  },

  whiteColor13SemiBold: {
    color: Colors.whiteColor,
    fontSize: 13.0,
    fontFamily: "Montserrat-SemiBold",
  },

  whiteColor14SemiBold: {
    color: Colors.whiteColor,
    fontSize: 14.0,
    fontFamily: "Montserrat-SemiBold",
  },

  whiteColor15SemiBold: {
    color: Colors.whiteColor,
    fontSize: 15.0,
    fontFamily: "Montserrat-SemiBold",
  },

  whiteColor16SemiBold: {
    color: Colors.whiteColor,
    fontSize: 16.0,
    fontFamily: "Montserrat-SemiBold",
  },

  whiteColor18SemiBold: {
    color: Colors.whiteColor,
    fontSize: 18.0,
    fontFamily: "Montserrat-SemiBold",
  },

  whiteColor20SemiBold: {
    color: Colors.whiteColor,
    fontSize: 20.0,
    fontFamily: "Montserrat-SemiBold",
  },

  whiteColor28SemiBold: {
    color: Colors.whiteColor,
    fontSize: 28.0,
    fontFamily: "Montserrat-SemiBold",
  },

  whiteColor18Bold: {
    color: Colors.whiteColor,
    fontSize: 18.0,
    fontFamily: "Montserrat-Bold",
  },

  blackColor12Medium: {
    color: Colors.blackColor,
    fontSize: 12.0,
    fontFamily: "Montserrat-Medium",
  },

  blackColor14Medium: {
    color: Colors.blackColor,
    fontSize: 14.0,
    fontFamily: "Montserrat-Medium",
  },

  blackColor15Medium: {
    color: Colors.blackColor,
    fontSize: 15.0,
    fontFamily: "Montserrat-Medium",
  },

  blackColor16Medium: {
    color: Colors.blackColor,
    fontSize: 16.0,
    fontFamily: "Montserrat-Medium",
  },

  blackColor14SemiBold: {
    color: Colors.blackColor,
    fontSize: 14.0,
    fontFamily: "Montserrat-SemiBold",
  },

  blackColor15SemiBold: {
    color: Colors.blackColor,
    fontSize: 15.0,
    fontFamily: "Montserrat-SemiBold",
  },

  blackColor16SemiBold: {
    color: Colors.blackColor,
    fontSize: 16.0,
    fontFamily: "Montserrat-SemiBold",
  },

  blackColor17SemiBold: {
    color: Colors.blackColor,
    fontSize: 17.0,
    fontFamily: "Montserrat-SemiBold",
  },

  blackColor18SemiBold: {
    color: Colors.blackColor,
    fontSize: 18.0,
    fontFamily: "Montserrat-SemiBold",
  },

  blackColor20SemiBold: {
    color: Colors.blackColor,
    fontSize: 20.0,
    fontFamily: "Montserrat-SemiBold",
  },

  primaryColor14Medium: {
    color: Colors.primaryColor,
    fontSize: 14.0,
    fontFamily: "Montserrat-Medium",
  },

  primaryColor30Medium: {
    color: Colors.primaryColor,
    fontSize: 30.0,
    fontFamily: "Montserrat-Medium",
  },

  primaryColor14SemiBold: {
    color: Colors.primaryColor,
    fontSize: 14.0,
    fontFamily: "Montserrat-SemiBold",
  },

  primaryColor15SemiBold: {
    color: Colors.primaryColor,
    fontSize: 15.0,
    fontFamily: "Montserrat-SemiBold",
  },

  primaryColor16SemiBold: {
    color: Colors.primaryColor,
    fontSize: 16.0,
    fontFamily: "Montserrat-SemiBold",
  },

  primaryColor18SemiBold: {
    color: Colors.primaryColor,
    fontSize: 18.0,
    fontFamily: "Montserrat-SemiBold",
  },

  primaryColor20SemiBold: {
    color: Colors.primaryColor,
    fontSize: 20.0,
    fontFamily: "Montserrat-SemiBold",
  },

  primaryColor17Bold: {
    color: Colors.primaryColor,
    fontSize: 17.0,
    fontFamily: "Montserrat-Bold",
  },

  primaryColor18Bold: {
    color: Colors.primaryColor,
    fontSize: 18.0,
    fontFamily: "Montserrat-Bold",
  },

  secondaryColor16SemiBold: {
    color: Colors.secondaryColor,
    fontSize: 16.0,
    fontFamily: "Montserrat-SemiBold",
  },

  secondaryColor17SemiBold: {
    color: Colors.secondaryColor,
    fontSize: 17.0,
    fontFamily: "Montserrat-SemiBold",
  },

  secondaryColor24SemiBold: {
    color: Colors.secondaryColor,
    fontSize: 24.0,
    fontFamily: "Montserrat-SemiBold",
  },

  grayColor12Medium: {
    color: Colors.grayColor,
    fontSize: 12.0,
    fontFamily: "Montserrat-Medium",
  },

  grayColor14Medium: {
    color: Colors.grayColor,
    fontSize: 14.0,
    fontFamily: "Montserrat-Medium",
  },

  grayColor15Medium: {
    color: Colors.grayColor,
    fontSize: 15.0,
    fontFamily: "Montserrat-Medium",
  },

  grayColor16Medium: {
    color: Colors.grayColor,
    fontSize: 16.0,
    fontFamily: "Montserrat-Medium",
  },

  grayColor18Medium: {
    color: Colors.grayColor,
    fontSize: 18.0,
    fontFamily: "Montserrat-Medium",
  },

  grayColor13SemiBold: {
    color: Colors.grayColor,
    fontSize: 13.0,
    fontFamily: "Montserrat-SemiBold",
  },

  grayColor14SemiBold: {
    color: Colors.grayColor,
    fontSize: 14.0,
    fontFamily: "Montserrat-SemiBold",
  },

  grayColor15SemiBold: {
    color: Colors.grayColor,
    fontSize: 15.0,
    fontFamily: "Montserrat-SemiBold",
  },

  grayColor16SemiBold: {
    color: Colors.grayColor,
    fontSize: 16.0,
    fontFamily: "Montserrat-SemiBold",
  },

  grayColor18SemiBold: {
    color: Colors.grayColor,
    fontSize: 18.0,
    fontFamily: "Montserrat-SemiBold",
  },

  greenColor14SemiBold: {
    color: Colors.greenColor,
    fontSize: 14.0,
    fontFamily: "Montserrat-SemiBold",
  },

  greenColor16SemiBold: {
    color: Colors.greenColor,
    fontSize: 16.0,
    fontFamily: "Montserrat-SemiBold",
  },

  redColor14Medium: {
    color: Colors.redColor,
    fontSize: 14.0,
    fontFamily: "Montserrat-Medium",
  },

  redColor16SemiBold: {
    color: Colors.redColor,
    fontSize: 16.0,
    fontFamily: "Montserrat-SemiBold",
  },

};

export const Sizes = {
  fixPadding: 10.0,
};

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const CommonStyles = {
  shadow: {
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.2,
    shadowOffset: { x: 0, y: 0 },
    elevation: 2.0,
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  button: {
    backgroundColor: Colors.secondaryColor,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding + 4.0,
    marginHorizontal: Sizes.fixPadding * 2.0,    
  },
  rowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
};
