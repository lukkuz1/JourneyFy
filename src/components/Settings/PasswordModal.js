import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import EntryInputField from "../../components/Entry/EntryInputField";

const PasswordModal = ({
  visible,
  newPassword,
  confirmPassword,
  onChangeNewPassword,
  onChangeConfirmPassword,
  onSubmit,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Change Password</Text>
          <EntryInputField
            headerText="New Password"
            placeholderText="Enter new password"
            isPassword
            onChangeText={onChangeNewPassword}
          />
          <EntryInputField
            headerText="Confirm Password"
            placeholderText="Confirm new password"
            isPassword
            onChangeText={onChangeConfirmPassword}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={onSubmit}>
              <Text style={styles.modalButtonText}>Submit</Text>
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

export default PasswordModal;
