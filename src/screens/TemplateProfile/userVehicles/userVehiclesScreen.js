import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Snackbar } from "react-native-paper";
import { getFirestore, collection, onSnapshot, deleteDoc, doc, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const defaultVehicleImage = require("../../../assets/images/vehicle/vehicle1.png");

const UserVehiclesScreen = ({ navigation }) => {
  const db = getFirestore();
  const auth = getAuth();
  const [vehicles, setVehicles] = useState([]);
  const [showSnackBar, setShowSnackBar] = useState(false);
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const q = query(
      collection(db, "cars"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedVehicles = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return {
          id: docSnapshot.id,
          image: data.imageUrl,
          name: data.vehicleName,
          capacityOfPerson: data.seat,
        };
      });
      setVehicles(fetchedVehicles);
    }, (error) => {
      console.error("Error fetching vehicles: ", error);
    });

    return () => unsubscribe();
  }, [auth.currentUser?.uid, db]);

  const deleteVehicle = ({ id }) => {
    deleteDoc(doc(db, "cars", id))
      .then(() => {
        setShowSnackBar(true);
      })
      .catch((error) => {
        console.error("Error deleting vehicle: ", error);
      });
  };

  const vehiclesInfo = () => {
    const renderItem = ({ item }) => (
      <View style={styles.vehicleItemContainer}>
        <ImageBackground
          source={
            item.image && item.image.trim() !== ""
              ? { uri: item.image }
              : defaultVehicleImage
          }
          style={styles.vehicleImage}
          imageStyle={{ borderRadius: Sizes.fixPadding }}
        >
          <TouchableOpacity
            onPress={() => deleteVehicle({ id: item.id })}
            style={styles.trashIconContainer}
          >
            <Ionicons name="trash" color={Colors.redColor} size={20} />
          </TouchableOpacity>
          <View style={styles.vehicleInfoContainer}>
            <Text numberOfLines={1} style={Fonts.whiteColor15SemiBold}>
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={[Fonts.whiteColor15Medium, { marginTop: Sizes.fixPadding - 8.0 }]}
            >
              {item.capacityOfPerson} žmogus
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
    return (
      <FlatList
        data={vehicles}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={"Mano automobilis"} navigation={navigation} />
        {vehiclesInfo()}
      </View>
      {addButton()}
      {snackBarInfo()}
    </View>
  );

  function snackBarInfo() {
    return (
      <Snackbar
        style={{ backgroundColor: Colors.blackColor }}
        elevation={0}
        visible={showSnackBar}
        duration={1000}
        onDismiss={() => setShowSnackBar(false)}
      >
        <Text style={Fonts.whiteColor14Medium}>Automobilis pašalintas</Text>
      </Snackbar>
    );
  }

  function addButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("AddVehicleScreen")}
        style={styles.addButtonStyle}
      >
        <MaterialIcons name="add" color={Colors.whiteColor} size={40} />
      </TouchableOpacity>
    );
  }
};

export default UserVehiclesScreen;

const styles = StyleSheet.create({
  vehicleItemContainer: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  vehicleImage: {
    width: "100%",
    height: 178.0,
    borderRadius: Sizes.fixPadding,
    overflow: "hidden",
    justifyContent: "space-between",
    padding: Sizes.fixPadding + 5.0,
  },
  trashIconContainer: {
    alignSelf: "flex-end",
  },
  vehicleInfoContainer: {
    // Additional styling if needed for the vehicle info section
  },
  flatListContainer: {
    paddingTop: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 7.0,
  },
  addButtonStyle: {
    position: "absolute",
    bottom: 0,
    width: 52.0,
    height: 52.0,
    borderRadius: 26.0,
    backgroundColor: Colors.secondaryColor,
    alignSelf: "center",
    margin: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
});
