import React, { useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import ProfileOption from "../../../components/Profile/ProfileOption";
import Divider from "../../../components/Profile/Divider";
import LogoutDialog from "../../../components/Profile/LogoutDialog";
import { useUserProfile } from "../../../hooks/useUserProfile";
import { useAuth } from "../../../hooks/useAuth";

const ProfileScreen = ({ navigation }) => {
  const { user, fetchUserProfile, refreshing, onRefresh } = useUserProfile();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const logoutAuth = useAuth();

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Profilis" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ProfileInfo user={user} navigation={navigation} />
          <ProfileOptions
            navigation={navigation}
            setShowLogoutDialog={setShowLogoutDialog}
          />
        </ScrollView>
      </View>
      <LogoutDialog
        isVisible={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onLogout={() => {
          setShowLogoutDialog(false);
          logoutAuth.signOut();
        }}
      />
    </View>
  );
};

const Header = ({ title }) => (
  <View style={styles.header}>
    <Text style={{ ...Fonts.whiteColor20SemiBold, textAlign: "center" }}>
      {title}
    </Text>
  </View>
);

const ProfileInfo = ({ user, navigation }) => (
  <View style={styles.profileInfo}>
    <Image
      source={
        user?.photoURL
          ? { uri: user.photoURL }
          : require("../../../assets/images/user/user1.jpeg")
      }
      style={styles.profileImage}
    />
    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 3.0 }}>
      <Text style={{ ...Fonts.blackColor17SemiBold }}>{user.firstName}</Text>
      <Text style={{ ...Fonts.blackColor17SemiBold }}>{user.lastName}</Text>
    </View>
    <MaterialCommunityIcons
      name="square-edit-outline"
      color={Colors.secondaryColor}
      size={24}
      onPress={() => navigation.navigate("EditProfileScreen")}
    />
  </View>
);

const ProfileOptions = ({ navigation, setShowLogoutDialog }) => {
  const options = [
    {
      icon: "car-outline",
      option: "Mano automobilis",
      detail: "Pridėti automobilio informaciją",
      onPress: () => navigation.navigate("UserVehiclesScreen"),
    },
    {
      icon: "history",
      option: "Kelionių istoriją",
      detail: "Peržiūrėkite kelionių istoriją",
      onPress: () => navigation.navigate("RideHistoryScreen"),
    },
    {
      icon: "cog-outline",
      option: "Nustatymai",
      detail: "Pakeiskite savo nustatymus",
      onPress: () => navigation.navigate("Settings"),
    },
    {
      icon: "shield-alert-outline",
      option: "Privatumo politika",
      detail: "Žinokite mūsų politiką",
      onPress: () => navigation.navigate("PrivacyPolicyScreen"),
    },
    {
      icon: "help-circle-outline",
      option: "D.U.K.",
      detail: "Gauti atsakymus į savo klausimus",
      onPress: () => navigation.navigate("FaqScreen"),
    },
    {
      icon: "headphones",
      option: "Klientų aptarnavimas",
      detail: "Susisiekite su mumis dėl bet kokių problemų",
      onPress: () => navigation.navigate("CustomerSupportScreen"),
    },
    {
      icon: "logout",
      option: "Atsijungti",
      detail: "Atsijungti nuo savo paskyros",
      onPress: () => setShowLogoutDialog(true),
    },
  ];

  return (
    <View style={styles.profileOptionsContainer}>
      {options.map((item, index) => (
        <React.Fragment key={index}>
          <ProfileOption {...item} />
          {index < options.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryColor,
    padding: Sizes.fixPadding * 2.0,
  },
  profileInfo: {
    ...CommonStyles.rowAlignCenter,
    margin: Sizes.fixPadding * 2.0,
  },
  profileImage: {
    width: 70.0,
    height: 70.0,
    borderRadius: 35.0,
  },
  profileOptionsContainer: {
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding * 2.0,
  },
});
