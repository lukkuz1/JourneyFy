import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const StatusModal = ({ modalVisible, setModalVisible, modalMessage }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Gerai</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixPadding,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    ...Fonts.blackColor15SemiBold,
    textAlign: "center",
    marginBottom: Sizes.fixPadding,
  },
  modalButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixPadding,
  },
  modalButtonText: {
    ...Fonts.whiteColor15SemiBold,
  },
});

export default StatusModal;
