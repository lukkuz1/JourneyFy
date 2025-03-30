import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Colors, Sizes, Fonts, CommonStyles } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BottomSheet } from "@rneui/themed";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

const AddVehicleScreen = ({ navigation }) => {
  const db = getFirestore();
  const auth = getAuth();
  const storage = getStorage();

  const [vehicleName, setvehicleName] = useState("");
  const [vehicleType, setvehicleType] = useState("");
  const [regNo, setregNo] = useState("");
  const [color, setcolor] = useState("");
  const [seat, setseat] = useState("");
  const [facility, setfacility] = useState("");
  // Initially, carImage stores the local URI; later we update it with the remote URL.
  const [carImage, setCarImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showVehicleImageSheet, setshowVehicleImageSheet] = useState(false);

  const uploadImageAsync = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const currentUser = auth.currentUser;
    const imageRef = storageRef(storage, `cars/${currentUser.uid}/${Date.now()}`);
    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  const addVehicleToFirestore = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("User not logged in");
      return;
    }
    setUploading(true);
    try {
      let imageUrl = "";
      if (carImage) {
        // Upload image and get remote URL
        imageUrl = await uploadImageAsync(carImage);
        // Update the state so that the UI shows the remote image URL instead of the local URI
        setCarImage(imageUrl);
      }
      await addDoc(collection(db, "cars"), {
        userId: currentUser.uid,
        vehicleName,
        vehicleType,
        regNo,
        color,
        seat,
        facility,
        imageUrl, // will be an empty string if no image was selected
        // Optionally add a timestamp here
      });
      navigation.pop(); // Navigate back after adding
    } catch (error) {
      console.error("Error adding vehicle: ", error);
      // Check your Firestore security rules and authentication if you see permission errors.
    } finally {
      setUploading(false);
    }
  };

  // Image picking functions
  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      quality: 0.7,
    });
    if (!result.cancelled) {
      setCarImage(result.uri);
    }
    setshowVehicleImageSheet(false);
  };

  const takeImageFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });
    if (!result.cancelled) {
      setCarImage(result.uri);
    }
    setshowVehicleImageSheet(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={"Pridėti mašiną"} navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {vehicleImageInfo()}
          {vehicleNameInfo()}
          {vehicleTypeInfo()}
          {registerNoInfo()}
          {vehicleColorInfo()}
          {seatOfferingInfo()}
          {facilitiesInfo()}
        </ScrollView>
      </View>
      {addButton()}
      {changePicSheet()}
      {uploading && (
        <View style={styles.uploadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>
      )}
    </View>
  );

  function changePicSheet() {
    return (
      <BottomSheet
        isVisible={showVehicleImageSheet}
        onBackdropPress={() => setshowVehicleImageSheet(false)}
      >
        <View style={{ ...styles.sheetStyle }}>
          <Text
            style={{
              ...Fonts.blackColor18SemiBold,
              marginBottom: Sizes.fixPadding,
            }}
          >
            Pridėti nuotrauką
          </Text>
          {chagePicOptionSort({
            icon: "camera-alt",
            option: "Camera",
            color: Colors.primaryColor,
            onPress: takeImageFromCamera,
          })}
          {chagePicOptionSort({
            icon: "photo",
            option: "Gallery",
            color: Colors.greenColor,
            onPress: pickImageFromGallery,
          })}
        </View>
      </BottomSheet>
    );
  }

  function chagePicOptionSort({ icon, option, color, onPress }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          ...CommonStyles.rowAlignCenter,
          marginVertical: Sizes.fixPadding,
        }}
      >
        <View style={styles.circle40}>
          <MaterialIcons name={icon} color={color} size={22} />
        </View>
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.blackColor16Medium,
            flex: 1,
            marginLeft: Sizes.fixPadding + 5.0,
          }}
        >
          {option}
        </Text>
      </TouchableOpacity>
    );
  }

  function addButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={addVehicleToFirestore}
        style={{
          ...CommonStyles.button,
          marginVertical: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Pridėti</Text>
      </TouchableOpacity>
    );
  }

  function facilitiesInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Įranga (pvz., kondicionierius, muzika)
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Įveskite įrangą"
            style={styles.textFieldStyle}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
            value={facility}
            onChangeText={setfacility}
          />
        </View>
      </View>
    );
  }

  function seatOfferingInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Vietų pasiūlymai
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Įveskite laisvų vietų sk."
            style={styles.textFieldStyle}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
            keyboardType="numeric"
            value={seat}
            onChangeText={setseat}
          />
        </View>
      </View>
    );
  }

  function vehicleColorInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Mašinos spalva
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Įveskite mašinos spalvą"
            style={styles.textFieldStyle}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
            value={color}
            onChangeText={setcolor}
          />
        </View>
      </View>
    );
  }

  function registerNoInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Mašinos reg. nr.
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Įveskite mašinos reg. nr."
            style={styles.textFieldStyle}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
            value={regNo}
            onChangeText={setregNo}
          />
        </View>
      </View>
    );
  }

  function vehicleTypeInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Mašinos tipas
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Įveskite mašinos tipą"
            style={styles.textFieldStyle}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
            value={vehicleType}
            onChangeText={setvehicleType}
          />
        </View>
      </View>
    );
  }

  function vehicleNameInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding,
        }}
      >
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Mašinos pavadinimas
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Įveskite mašinos pavadinimą"
            style={styles.textFieldStyle}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
            value={vehicleName}
            onChangeText={setvehicleName}
          />
        </View>
      </View>
    );
  }

  function vehicleImageInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setshowVehicleImageSheet(true)}
        style={styles.vehicleImageWrapper}
      >
        {carImage ? (
          <Image
            source={{ uri: carImage }}
            style={{ width: 100, height: 100, borderRadius: 8 }}
          />
        ) : (
          <>
            <Ionicons name="camera-outline" color={Colors.grayColor} size={35} />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor14SemiBold,
                marginTop: Sizes.fixPadding - 5.0,
              }}
            >
              Pridėkite mašinos nuotrauką
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  }
};

export default AddVehicleScreen;

const styles = StyleSheet.create({
  valueBox: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
  },
  textFieldStyle: {
    ...Fonts.blackColor15Medium,
    height: 20.0,
    padding: 0,
  },
  vehicleImageWrapper: {
    backgroundColor: "#E7E7E7",
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 4.0,
    margin: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 2.0,
    borderTopRightRadius: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding * 2.5,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 1.5,
  },
  circle40: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    alignItems: "center",
    justifyContent: "center",
  },
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
