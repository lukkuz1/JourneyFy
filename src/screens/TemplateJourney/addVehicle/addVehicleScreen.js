import React, { useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { Colors, Sizes, Fonts, CommonStyles } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import VehicleForm from "../../../components/AddVehicle/VehicleForm";
import ImagePickerBottomSheet from "../../../components/AddVehicle/ImagePickerBottomSheet";
import NoOfSeatSheet from "../../../components/Home/NoOfSeatSheet";
import VehicleTypeSheet from "../../../components/AddVehicle/VehicleTypeSheet";
import { useAddVehicle } from "../../../hooks/useAddVehicle";

const AddVehicleScreen = ({ navigation }) => {
  const [vehicleData, setVehicleData] = useState({
    vehicleName: "",
    vehicleType: "",
    regNo: "",
    color: "",
    seat: "",
    facility: "",
    carImage: null,
  });

  const [showVehicleImageSheet, setShowVehicleImageSheet] = useState(false);
  const [showSeatSheet, setShowSeatSheet] = useState(false);
  const [showVehicleTypeSheet, setShowVehicleTypeSheet] = useState(false);
  const { uploading, addVehicle } = useAddVehicle();

  const handleChange = (field, value) => {
    setVehicleData({ ...vehicleData, [field]: value });
  };

  const handleAddVehicle = async () => {
    try {
      await addVehicle(vehicleData);
      navigation.pop();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Pridėti mašiną" navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
          <VehicleForm
            vehicleData={vehicleData}
            onChange={handleChange}
            onOpenImagePicker={() => setShowVehicleImageSheet(true)}
            onOpenVehicleTypePicker={() => setShowVehicleTypeSheet(true)}
            onOpenSeatPicker={() => setShowSeatSheet(true)}
          />
        </ScrollView>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleAddVehicle}
        style={{ ...CommonStyles.button, marginVertical: Sizes.fixPadding * 2 }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Pridėti</Text>
      </TouchableOpacity>
      <ImagePickerBottomSheet
        isVisible={showVehicleImageSheet}
        onClose={() => setShowVehicleImageSheet(false)}
        onPickImage={(uri) => {
          handleChange("carImage", uri);
          setShowVehicleImageSheet(false);
        }}
      />
      <NoOfSeatSheet
        isVisible={showSeatSheet}
        onClose={() => setShowSeatSheet(false)}
        selectedSeat={vehicleData.seat}
        onSelectSeat={(seat) => handleChange("seat", seat)}
      />
      <VehicleTypeSheet
        isVisible={showVehicleTypeSheet}
        onClose={() => setShowVehicleTypeSheet(false)}
        selectedVehicleType={vehicleData.vehicleType}
        onSelectVehicleType={(type) => handleChange("vehicleType", type)}
      />
      {uploading && (
        <View style={styles.uploadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>
      )}
    </View>
  );
};

export default AddVehicleScreen;

const styles = StyleSheet.create({
  uploadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
});