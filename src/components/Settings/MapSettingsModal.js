import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import EntryInputField from "../../components/Entry/EntryInputField";

const MapSettingsModal = ({
  visible,
  radius,
  stops,
  populateRadius,
  populateStops,
  onChangeRadius,
  onChangeStops,
  onSave,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Map Settings</Text>
          <EntryInputField
            headerText="Radius (km)"
            placeholderText={populateRadius || "Enter radius"}
            keyboardType="numeric"
            isPassword={false}
            onChangeText={onChangeRadius}
          />
          <EntryInputField
            headerText="Max Stops"
            placeholderText={populateStops || "Enter max stops"}
            keyboardType="numeric"
            isPassword={false}
            onChangeText={onChangeStops}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={onSave}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.modalCancelButton]} onPress={onCancel}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  modalCancelButton: {
    backgroundColor: Colors.redColor,
  },
  modalButtonText: {
    color: Colors.whiteColor,
    fontSize: 16,
  },
});

export default MapSettingsModal;
