import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes, CommonStyles } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Overlay } from "@rneui/themed";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../../hooks/useAuth";
import { RefreshControl, onRefresh } from "react-native";

const ProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const logoutAuth = useAuth();
  const currentUser = auth.currentUser;
  const [showLogoutDialog, setshowLogoutDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
           Ar tikrai norite atsijungti nuo šios paskyros?
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
            <Text style={{ ...Fonts.whiteColor18SemiBold }}>Ne</Text>
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
            <Text style={{ ...Fonts.whiteColor18SemiBold }}>Atsijungti</Text>
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
          option: "Mano automobilis",
          detail: "Pridėti automobilio informaciją",
          onPress: () => {
            navigation.navigate("UserVehiclesScreen");
          },
        })}
        {divider()}
        {profileOptionSort({
          icon: "history",
          option: "Kelionių istoriją",
          detail: "Peržiūrėkite kelionių istoriją",
          onPress: () => {
            navigation.navigate("RideHistoryScreen");
          },
        })}
        {divider()}
        {profileOptionSort({
          icon: "cog-outline",
          option: "Nustatymai",
          detail: "Pakeiskite savo nustatymus",
          onPress: () => {
            navigation.navigate("Settings");
          },
        })}
        {divider()}
        {profileOptionSort({
          icon: "shield-alert-outline",
          option: "Privatumo politika",
          detail: "Žinokite mūsų politiką",
          onPress: () => {
            navigation.navigate("PrivacyPolicyScreen");
          },
        })}
        {divider()}
        {profileOptionSort({
          icon: "help-circle-outline",
          option: "D.U.K.",
          detail: "Gauti atsakymus į savo klausimus",
          onPress: () => {
            navigation.navigate("FaqScreen");
          },
        })}
        {divider()}
        {profileOptionSort({
          icon: "headphones",
          option: "Klientų aptarnavimas",
          detail: "Susisiekite su mumis dėl bet kokių problemų",
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
            Atsijungti
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.grayColor14Medium,
              marginTop: Sizes.fixPadding - 8.0,
            }}
          >
            Atsijungti nuo paskyros
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
            currentUser?.photoURL
              ? { uri: currentUser.photoURL }
              : require("../../../assets/images/user/user1.jpeg")
          }
          style={{ width: 70.0, height: 70.0, borderRadius: 35.0 }}
        />
        <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 3.0 }}>
          <Text style={{ ...Fonts.blackColor17SemiBold }}>
            {currentUser.email}
          </Text>
          <Text style={{ ...Fonts.grayColor16SemiBold }}>
            {currentUser.displayName}
          </Text>
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
          Profilis
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
