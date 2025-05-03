import React from "react";
import { View } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import VehiclesList from "../../../components/UserVehicleScreen/VehiclesList";
import AddVehicleButton from "../../../components/UserVehicleScreen/AddVehicleButton";
import StatusModal from "../../../components/UserVehicleScreen/StatusModal";
import SnackBarComponent from "../../../components/UserVehicleScreen/SnackBarComponent";
import { Colors } from "../../../constants/styles";
import { useUserVehicles } from "../../../hooks/useUserVehicles";

const UserVehiclesScreen = ({ navigation }) => {
  const {
    vehicles,
    deleteVehicle,
    showSnackBar,
    setShowSnackBar,
    modalVisible,
    setModalVisible,
    modalMessage,
    openStatusModal,
  } = useUserVehicles();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={"Mano automobilis"} navigation={navigation} />
        <VehiclesList
          vehicles={vehicles}
          deleteVehicle={deleteVehicle}
          openStatusModal={openStatusModal}
        />
      </View>
      <AddVehicleButton navigation={navigation} />
      <StatusModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalMessage={modalMessage}
      />
      <SnackBarComponent
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
      />
    </View>
  );
};

export default UserVehiclesScreen;
