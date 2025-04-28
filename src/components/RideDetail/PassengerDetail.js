// src/components/RideDetail/PassengerDetail.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import {
  Sizes,
  Fonts,
  Colors,
  CommonStyles,
} from "../../constants/styles";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";

const placeholder = require("../../assets/images/user/user9.png");

const PassengerDetail = ({ rideId }) => {
  const [approvedRegs, setApprovedRegs] = useState([]);
  const [users, setUsers] = useState([]);

  // Listen only to registrations where approvedByRider == true
  useEffect(() => {
    const q = query(
      collection(db, "journeys", rideId, "registered_journeys"),
      where("approvedByRider", "==", true)
    );
    const unsub = onSnapshot(q, (snap) => {
      const regs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setApprovedRegs(regs);
    });
    return unsub;
  }, [rideId]);

  // Fetch user details for each approved registration
  useEffect(() => {
    const fetchUsers = async () => {
      const results = await Promise.all(
        approvedRegs.map(async (reg) => {
          try {
            const snap = await getDoc(doc(db, "users", reg.userId));
            if (snap.exists()) {
              return {
                id: reg.userId,
                ...snap.data(),
                registeredAt: reg.registeredAt.toDate(),
              };
            }
          } catch (e) {
            console.error("Error fetching user", reg.userId, e);
          }
          return {
            id: reg.userId,
            firstName: "Vartotojas",
            lastName: "",
            phoneNumber: "",
            photoURL: null,
            registeredAt: reg.registeredAt.toDate(),
          };
        })
      );
      setUsers(results);
    };
    if (approvedRegs.length) fetchUsers();
    else setUsers([]);
  }, [approvedRegs]);

  return (
    <View style={styles.wrapper}>
      <View style={[CommonStyles.rowAlignCenter, styles.header]}>
        <Text style={Fonts.secondaryColor17SemiBold}>
          Patvirtinti keleiviai
        </Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.passengerRow}>
            <Image
              source={item.photoURL ? { uri: item.photoURL } : placeholder}
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <Text style={[Fonts.blackColor14Medium, styles.name]}>
                {item.firstName} {item.lastName}
              </Text>
              {item.phoneNumber ? (
                <Text style={Fonts.grayColor12Medium}>
                  {item.phoneNumber}
                </Text>
              ) : null}
              <Text style={Fonts.grayColor12Medium}>
                Registruotas {item.registeredAt.toLocaleString()}
              </Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.whiteColor,
    marginVertical: Sizes.fixPadding * 2,
    paddingBottom: Sizes.fixPadding,
  },
  header: {
    paddingHorizontal: Sizes.fixPadding * 2,
    paddingVertical: Sizes.fixPadding,
  },
  listContent: {
    paddingHorizontal: Sizes.fixPadding * 2,
    paddingTop: Sizes.fixPadding,
  },
  passengerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Sizes.fixPadding,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Sizes.fixPadding,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    marginBottom: Sizes.fixPadding / 4,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: Sizes.fixPadding / 2,
  },
});

export default PassengerDetail;