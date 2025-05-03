import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import MapDirection from "../../../components/EndRide/MapDirection";
import RideInfoSheet from "../../../components/EndRide/RideInfoSheet";
import EndRideButton from "../../../components/EndRide/EndRideButton";
import { Colors } from "../../../constants/styles";
import firebase from "../../../services/firebase";
import { doc, onSnapshot, getDoc } from "firebase/firestore";

const EndRideScreen = ({ navigation, route }) => {
  const { rideId } = route.params;
  const [ride, setRide] = useState(null);
  const [passengersList, setPassengersList] = useState([]);

  useEffect(() => {
    const rideRef = doc(firebase.db, "journeys", rideId);
    const unsub = onSnapshot(rideRef, async (snap) => {
      const data = snap.data();
      setRide({ id: snap.id, ...data });
      if (data.passengers?.length) {
        const users = await Promise.all(
          data.passengers.map(async (uid) => {
            const uSnap = await getDoc(doc(firebase.db, "users", uid));
            if (uSnap.exists()) return { id: uid, ...uSnap.data() };
            return { id: uid, firstName: "Vairuotojas", lastName: "" };
          })
        );
        setPassengersList(users);
      } else {
        setPassengersList([]);
      }
    });
    return unsub;
  }, [rideId]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Kelionė" navigation={navigation} />
        <MapDirection ride={ride} />
        <RideInfoSheet ride={ride} passengersList={passengersList} />
        <EndRideButton navigation={navigation} rideId={rideId} />
      </View>
    </View>
  );
};

export default EndRideScreen;
