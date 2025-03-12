import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Fonts, Sizes, CommonStyles } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Overlay } from "@rneui/themed";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import firebaseServices from "../../../services/firebase";
import { useAuth } from "../../../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";

const { db } = firebaseServices;

const ProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const logoutAuth = useAuth();
  const [showLogoutDialog, setshowLogoutDialog] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Auto-refresh when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  // Fetch user data
  const fetchUserProfile = async () => {
    try {
      if (!auth.currentUser) {
        console.error("User not authenticated");
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserName(data.username || "");
        setEmail(data.email || "");
      } else {
        await setDoc(userRef, {
          username: "",
          email: auth.currentUser.email || "",
        });
        setUserName("");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
    setRefreshing(false);
  };

  // Pull-to-refresh handler
  const onRefresh = () => {
    setRefreshing(true);
    fetchUserProfile();
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {profileInfo()}
          {profileOptions()}
        </ScrollView>
      </View>
      {logoutDialog()}
    </View>
  );

  function logoutDialog() {
    return (
      <Overlay
        isVisible={showLogoutDialog}
        onBackdropPress={() => setshowLogoutDialog(false)}
        overlayStyle={styles.dialogStyle}
      >
        <View
          style={{
            marginVertical: Sizes.fixPadding * 2.5,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
          <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: "center" }}>
            Are you sure you want to logout this account?
          </Text>
        </View>
        <View style={{ ...CommonStyles.rowAlignCenter }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setshowLogoutDialog(false);
            }}
            style={styles.dialogButton}
          >
            <Text style={{ ...Fonts.whiteColor18SemiBold }}>No</Text>
          </TouchableOpacity>
          <View style={{ backgroundColor: Colors.whiteColor, width: 2.0 }} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setshowLogoutDialog(false);
              logoutAuth.signOut();
            }}
            style={styles.dialogButton}
          >
            <Text style={{ ...Fonts.whiteColor18SemiBold }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    );
  }

  function profileOptions() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          padding: Sizes.fixPadding * 2.0,
        }}
      >
        {profileOptionSort({
          icon: "car-outline",
          option: "My vehicle",
          detail: "Add vehicle information",
          onPress: () => {
            navigation.navigate("UserVehiclesScreen");
          },
        })}
        {divider()}
        {profileOptionSort({
          icon: "history",
          option: "Ride history",
          detail: "See your ride history",
          onPress: () => {
            navigation.navigate("RideHistoryScreen");
          },
        })}
        {divider()}
        {profileOptionSort({
          icon: "text-box-outline",
          option: "Terms and condition",
          detail: "Know our terms and condition",
          onPress: () => {
            navigation.navigate("TermsAndConditionsScreen");
          },
        })}
        {divider()}
        {profileOptionSort({
          icon: "shield-alert-outline",
          option: "Privacy policy",
          detail: "Know our policy",
          onPress: () => {
            navigation.navigate("PrivacyPolicyScreen");
          },
        })}
        {divider()}
        {profileOptionSort({
          icon: "help-circle-outline",
          option: "FAQs",
          detail: "Get your question answer",
          onPress: () => {
            navigation.navigate("FaqScreen");
          },
        })}
        {divider()}
        {profileOptionSort({
          icon: "headphones",
          option: "Customer support",
          detail: "Connect us for any issue",
          onPress: () => {
            navigation.navigate("CustomerSupportScreen");
          },
        })}
        {divider()}
        {logoutInfo()}
      </View>
    );
  }

  function logoutInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setshowLogoutDialog(true);
        }}
        style={{ flexDirection: "row" }}
      >
        <MaterialCommunityIcons
          name={"logout-variant"}
          size={20}
          color={Colors.redColor}
        />
        <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
          <Text numberOfLines={1} style={{ ...Fonts.redColor16SemiBold }}>
            Logout
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.grayColor14Medium,
              marginTop: Sizes.fixPadding - 8.0,
            }}
          >
            Logout your account
          </Text>
        </View>
        <MaterialCommunityIcons
          name={"chevron-right"}
          size={24}
          color={Colors.blackColor}
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.lightGrayColor,
          height: 1.0,
          marginVertical: Sizes.fixPadding * 2.0,
        }}
      ></View>
    );
  }

  function profileOptionSort({ icon, option, detail, onPress }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{ flexDirection: "row" }}
      >
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={Colors.blackColor}
        />
        <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
            {option}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.grayColor14Medium,
              marginTop: Sizes.fixPadding - 8.0,
            }}
          >
            {detail}
          </Text>
        </View>
        <MaterialCommunityIcons
          name={"chevron-right"}
          size={24}
          color={Colors.blackColor}
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
    );
  }

  function profileInfo() {
    return (
      <View
        style={{
          ...CommonStyles.rowAlignCenter,
          margin: Sizes.fixPadding * 2.0,
        }}
      >
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../../assets/images/user/user1.jpeg")
          }
          style={{ width: 70.0, height: 70.0, borderRadius: 35.0 }}
        />
        <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 3.0 }}>
          <Text style={{ ...Fonts.blackColor17SemiBold }}>{userName}</Text>
          <Text style={{ ...Fonts.grayColor16SemiBold }}>{email}</Text>
        </View>
        <MaterialCommunityIcons
          name="square-edit-outline"
          color={Colors.secondaryColor}
          size={24}
          onPress={() => {
            navigation.navigate("EditProfileScreen");
          }}
        />
      </View>
    );
  }

  function header() {
    return (
      <View
        style={{
          backgroundColor: Colors.primaryColor,
          padding: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold, textAlign: "center" }}>
          Profile
        </Text>
      </View>
    );
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  dialogButton: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding + 2.0,
  },
  dialogStyle: {
    width: "80%",
    borderRadius: Sizes.fixPadding,
    padding: 0,
    overflow: "hidden",
  },
});
