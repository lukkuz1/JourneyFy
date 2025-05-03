import React, { useState } from "react";
import { View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { Colors } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Header from "../../components/header";
import ProfileSection from "../../components/Settings/ProfileSection";
import OptionsList from "../../components/Settings/OptionsList";
import MapSettingsModal from "../../components/Settings/MapSettingsModal";
import PasswordModal from "../../components/Settings/PasswordModal";
import DeleteAccountModal from "../../components/Settings/DeleteAccountModal";
import { useMapSettings } from "../../hooks/useMapSettings";
import { usePasswordChange } from "../../hooks/usePasswordChange";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";

export default function Settings({ navigation }) {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const currentUserId = currentUser ? currentUser.uid : null;

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);

  const {
    loading,
    radius,
    stops,
    populateRadius,
    populateStops,
    setRadius,
    setStops,
    handleUpdateMapData,
  } = useMapSettings(currentUserId);

  const {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    handlePasswordChange,
  } = usePasswordChange();

  const { handleDeleteAccount } = useDeleteAccount();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MyStatusBar />
      <ScrollView>
        <Header title={"Nustatymai"} navigation={navigation} />
        <ProfileSection />
        <OptionsList
          onChangePassword={() => setIsPasswordModalVisible(true)}
          onMapSettings={() => setIsMapModalVisible(true)}
          onDeleteAccount={() => setIsDeleteModalVisible(true)}
        />
      </ScrollView>
      <MapSettingsModal
        visible={isMapModalVisible}
        radius={radius}
        stops={stops}
        populateRadius={populateRadius}
        populateStops={populateStops}
        onChangeRadius={setRadius}
        onChangeStops={setStops}
        onSave={async () => {
          const success = await handleUpdateMapData();
          if (success) setIsMapModalVisible(false);
        }}
        onCancel={() => setIsMapModalVisible(false)}
      />
      <PasswordModal
        visible={isPasswordModalVisible}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        onChangeNewPassword={setNewPassword}
        onChangeConfirmPassword={setConfirmPassword}
        onSubmit={() => {
          if (handlePasswordChange()) setIsPasswordModalVisible(false);
        }}
        onCancel={() => setIsPasswordModalVisible(false)}
      />
      <DeleteAccountModal
        visible={isDeleteModalVisible}
        onDelete={handleDeleteAccount}
        onCancel={() => setIsDeleteModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bodyBackColor },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
