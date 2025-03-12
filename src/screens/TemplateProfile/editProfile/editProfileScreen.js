import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Sizes, Fonts, CommonStyles } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BottomSheet } from "@rneui/themed";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import firebaseServices from "../../../services/firebase";

const { db } = firebaseServices;

const EditProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const currentUserId = auth.currentUser.uid;
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [loading, setLoading] = useState(true);
  const [showChangeProfileSheet, setShowChangeProfileSheet] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userRef = doc(db, "users", currentUserId);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserName(data.username || "");
        setEmail(data.email || "");
        setMobileNo(data.mobileNo || "");
      } else {
        await setDoc(userRef, {
          username: "",
          email: auth.currentUser.email || "",
          mobileNo: "",
        });
        setUserName("");
        setEmail(auth.currentUser.email || "");
        setMobileNo("");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  const handleUpdateProfile = async () => {
    try {
      await updateDoc(doc(db, "users", currentUserId), {
        username: userName,
        email: email,
        mobileNo: mobileNo,
      });
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Profile update failed");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primaryColor} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <Header title={"Edit Profile"} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {profilePic()}
        {userInfo("User name", userName, setUserName)}
        {userInfo("Email address", email, setEmail, "email-address")}
        {userInfo("Mobile number", mobileNo, setMobileNo, "phone-pad")}
      </ScrollView>
      {updateButton()}
    </View>
  );

  function userInfo(label, value, setter, keyboardType = "default") {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.blackColor15SemiBold }}>{label}</Text>
        <TextInput
          placeholder={`Enter ${label.toLowerCase()}`}
          style={styles.textFieldStyle}
          value={value}
          onChangeText={setter}
          placeholderTextColor={Colors.grayColor}
          keyboardType={keyboardType}
        />
      </View>
    );
  }

  function profilePic() {
    return (
      <View style={styles.profilePicWrapper}>
        <Image
          source={require("../../../assets/images/user/user1.jpeg")}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <TouchableOpacity
          style={styles.changePhotoCircleWrapper}
          onPress={() => setShowChangeProfileSheet(true)}
        >
          <Ionicons name="camera-outline" color={Colors.secondaryColor} size={20} />
        </TouchableOpacity>
      </View>
    );
  }

  function updateButton() {
    return (
      <TouchableOpacity
        style={{ ...CommonStyles.button, margin: Sizes.fixPadding * 2 }}
        onPress={handleUpdateProfile}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Update</Text>
      </TouchableOpacity>
    );
  }
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  profilePicWrapper: {
    alignItems: "center",
    margin: Sizes.fixPadding * 3,
  },
  changePhotoCircleWrapper: {
    position: "absolute",
    right: -5,
    bottom: -5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bodyBackColor,
    alignItems: "center",
    justifyContent: "center",
  },
  textFieldStyle: {
    ...Fonts.blackColor15Medium,
    borderBottomColor: Colors.lightGrayColor,
    borderBottomWidth: 1,
    paddingBottom: Sizes.fixPadding - 5,
  },
});