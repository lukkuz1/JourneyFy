import React from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const defaultVehicleImage = require("../../assets/images/vehicle/vehicle1.png");

const VehicleItem = ({ vehicle, deleteVehicle, openStatusModal }) => {
  return (
    <View style={styles.vehicleItemContainer}>
      <ImageBackground
        source={
          vehicle.image && vehicle.image.trim() !== ""
            ? { uri: vehicle.image }
            : defaultVehicleImage
        }
        style={styles.vehicleImage}
        imageStyle={{ borderRadius: Sizes.fixPadding }}
      >
        {/* Status icon wrapped in a pressable */}
        <TouchableOpacity
          style={styles.approvedIconContainer}
          onPress={() => openStatusModal(vehicle.approvedByAdmin)}
        >
          {vehicle.approvedByAdmin ? (
            <Ionicons name="checkmark-circle" size={24} color={Colors.greenColor} />
          ) : (
            <Ionicons name="close-circle" size={24} color={Colors.redColor} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteVehicle({ id: vehicle.id })}
          style={styles.trashIconContainer}
        >
          <Ionicons name="trash" color={Colors.redColor} size={20} />
        </TouchableOpacity>
        <View style={styles.vehicleInfoContainer}>
          <Text numberOfLines={1} style={Fonts.whiteColor15SemiBold}>
            {vehicle.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[Fonts.whiteColor15Medium, { marginTop: Sizes.fixPadding - 8 }]}
          >
            {vehicle.capacityOfPerson} žmogus
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  vehicleItemContainer: {
    marginHorizontal: Sizes.fixPadding * 2,
    marginBottom: Sizes.fixPadding * 2,
  },
  vehicleImage: {
    width: "100%",
    height: 178,
    borderRadius: Sizes.fixPadding,
    overflow: "hidden",
    justifyContent: "space-between",
    padding: Sizes.fixPadding + 5,
  },
  trashIconContainer: {
    alignSelf: "flex-end",
  },
  approvedIconContainer: {
    position: "absolute",
    top: Sizes.fixPadding,
    left: Sizes.fixPadding,
    zIndex: 999,
    elevation: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    padding: 2,
  },
  vehicleInfoContainer: {
    // Additional styling for the vehicle info section if needed
  },
});

export default VehicleItem;
