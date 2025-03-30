import React from "react";
import { FlatList, StyleSheet } from "react-native";
import VehicleItem from "./VehicleItem";
import { Sizes } from "../../constants/styles";

const VehiclesList = ({ vehicles, deleteVehicle, openStatusModal }) => {
  const renderItem = ({ item }) => (
    <VehicleItem
      vehicle={item}
      deleteVehicle={deleteVehicle}
      openStatusModal={openStatusModal}
    />
  );
  return (
    <FlatList
      data={vehicles}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingTop: Sizes.fixPadding * 2,
    paddingBottom: Sizes.fixPadding * 7,
  },
});

export default VehiclesList;
