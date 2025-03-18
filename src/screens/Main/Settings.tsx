import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { getAuth, deleteUser } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import firebaseServices from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import { Colors } from "../../constants/styles";
import EntryInputField from "../../components/Entry/EntryInputField";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/header";

const { db } = firebaseServices;

export default function Settings({ navigation }) {
  const auth = useAuth();
  const currentUser = getAuth().currentUser;
  const currentUserId = currentUser ? currentUser.uid : null;

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [radius, setRadius] = useState("");
  const [stops, setStops] = useState("");
  const [populateRadius, setPopulateRadius] = useState("");
  const [populateStops, setPopulateStops] = useState("");

  const fetchMapData = async () => {
    try {
      if (!currentUserId) {
        setLoading(false);
        return;
      }
      const mapDoc = await getDoc(doc(db, "map_data", currentUserId));
      if (mapDoc.exists()) {
        const data = mapDoc.data();
        setPopulateRadius(data.radius.toString());
        setPopulateStops(data.stops.toString());
      }
    } catch (error) {
      console.error("Error fetching map data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMapData();
  }, [currentUserId]);

  const handleUpdateMapData = async () => {
    try {
      if (!currentUserId) {
        Alert.alert("Error", "User not logged in");
        return;
      }
      await setDoc(doc(db, "map_data", currentUserId), {
        radius: parseFloat(radius),
        stops: parseInt(stops),
      });
      fetchMapData();
      Alert.alert("Success", "Map data updated successfully");
      setIsMapModalVisible(false);
    } catch (error) {
      console.error("Error updating map data:", error);
      Alert.alert("Error", "Failed to update map data");
    }
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    auth.updatePassword(newPassword);
    setIsPasswordModalVisible(false);
    Alert.alert("Success", "Password changed successfully");
  };

  const handleDeleteAccount = () => {
    const user = getAuth().currentUser;
    deleteUser(user)
      .then(() => {
        auth.signOut();
        Alert.alert("Account Deleted", "Your account has been deleted.");
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <Header title={"Nustatymai"} navigation={navigation} />

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={
              currentUser?.photoURL
                ? { uri: currentUser.photoURL }
                : require("../../assets/images/user/user1.jpeg")
            }
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {currentUser?.displayName || "Naudotojas"}
            </Text>
            <Text style={styles.profileEmail}>{currentUser?.email}</Text>
          </View>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => setIsPasswordModalVisible(true)}
          >
            <MaterialCommunityIcons
              name="lock-reset"
              size={24}
              color={Colors.grayColor}
            />
            <Text style={styles.optionText}>Pakeisti slaptažodį</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={Colors.grayColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => setIsMapModalVisible(true)}
          >
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={24}
              color={Colors.grayColor}
            />
            <Text style={styles.optionText}>Žemėlapio nustatymai</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={Colors.grayColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => setIsDeleteModalVisible(true)}
          >
            <MaterialCommunityIcons
              name="account-remove"
              size={24}
              color={Colors.redColor}
            />
            <Text style={[styles.optionText, { color: Colors.redColor }]}>
              Paskyros ištrinimas
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={Colors.grayColor}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Map Settings Modal */}
      <Modal visible={isMapModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Map Settings</Text>
            <EntryInputField
              headerText="Radius (km)"
              placeholderText={populateRadius || "Enter radius"}
              keyboardType="numeric"
              isPassword={false}
              onChangeText={(text) => setRadius(text)}
            />
            <EntryInputField
              headerText="Max Stops"
              placeholderText={populateStops || "Enter max stops"}
              keyboardType="numeric"
              isPassword={false}
              onChangeText={(text) => setStops(text)}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleUpdateMapData}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setIsMapModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Password Modal */}
      <Modal visible={isPasswordModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <EntryInputField
              headerText="New Password"
              placeholderText="Enter new password"
              isPassword
              onChangeText={(text) => setNewPassword(text)}
            />
            <EntryInputField
              headerText="Confirm Password"
              placeholderText="Confirm new password"
              isPassword
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handlePasswordChange}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setIsPasswordModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Account Modal */}
      <Modal visible={isDeleteModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setIsDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bodyBackColor,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: Colors.primaryColor,
    padding: 20,
  },
  headerText: {
    color: Colors.whiteColor,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.whiteColor,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.grayColor,
  },
  optionsContainer: {
    marginTop: 10,
    backgroundColor: Colors.whiteColor,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrayColor,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
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
  modalText: {
    fontSize: 14,
    color: Colors.grayColor,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
