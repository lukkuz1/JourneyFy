import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheet } from "@rneui/themed";
import { Colors, Sizes, Fonts, CommonStyles } from "../../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

const ImagePickerBottomSheet = ({ isVisible, onClose, onPickImage }) => {
  const pickFromGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access gallery is required!");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        onPickImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image from gallery:", error);
    } finally {
      onClose();
    }
  };

  const takeFromCamera = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access camera is required!");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        onPickImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking image from camera:", error);
    } finally {
      onClose();
    }
  };

  return (
    <BottomSheet isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.sheetStyle}>
        <Text style={{ ...Fonts.blackColor18SemiBold, marginBottom: Sizes.fixPadding }}>
          Pridėti nuotrauką
        </Text>
        {renderOption({
          icon: "camera-alt",
          option: "Camera",
          color: Colors.primaryColor,
          onPress: takeFromCamera,
        })}
        {renderOption({
          icon: "photo",
          option: "Gallery",
          color: Colors.greenColor,
          onPress: pickFromGallery,
        })}
      </View>
    </BottomSheet>
  );
};

const renderOption = ({ icon, option, color, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={{ ...CommonStyles.rowAlignCenter, marginVertical: Sizes.fixPadding }}
  >
    <View style={styles.circle40}>
      <MaterialIcons name={icon} color={color} size={22} />
    </View>
    <Text
      numberOfLines={1}
      style={{ ...Fonts.blackColor16Medium, flex: 1, marginLeft: Sizes.fixPadding + 5 }}
    >
      {option}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  sheetStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 2,
    borderTopRightRadius: Sizes.fixPadding * 2,
    paddingTop: Sizes.fixPadding * 2.5,
    paddingHorizontal: Sizes.fixPadding * 2,
    paddingBottom: Sizes.fixPadding * 1.5,
  },
  circle40: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ImagePickerBottomSheet;