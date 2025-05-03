// src/components/RideRequest/RequestSheet.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Overlay } from "@rneui/themed";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase";

const placeholder = require("../../assets/images/user/user9.png");

const RequestSheet = ({
  isVisible,
  ride,
  requestUsers = [],
  onApprove,
  onDecline,
  onClose,
}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      const enriched = await Promise.all(
        requestUsers.map(async (req) => {
          try {
            const snap = await getDoc(doc(db, "users", req.userId));
            if (snap.exists()) {
              const u = snap.data();
              return {
                id: req.id,
                registeredAt: req.registeredAt,
                photoURL: u.photoURL,
                nickname: (u.nickname || `${u.firstName} ${u.lastName}`).trim(),
              };
            }
          } catch (e) {
            console.error("Failed to fetch user", req.userId, e);
          }
          return {
            id: req.id,
            registeredAt: req.registeredAt,
            photoURL: null,
            nickname: "Vartotojas",
          };
        })
      );
      if (mounted) setUsers(enriched);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [isVisible, requestUsers]);

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={{
        width: "90%",
        maxHeight: "80%",
        borderRadius: Sizes.fixPadding * 2,
        padding: 0,
      }}
    >
      <View
        style={{
          height: 1,
          backgroundColor: Colors.lightGray,
          marginHorizontal: Sizes.fixPadding * 2,
        }}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primaryColor}
          style={{ marginTop: Sizes.fixPadding * 2 }}
        />
      ) : (
        <ScrollView style={{ backgroundColor: Colors.whiteColor }}>
          {users.length === 0 ? (
            <Text
              style={{
                ...Fonts.grayColor14Medium,
                textAlign: "center",
                margin: Sizes.fixPadding,
              }}
            >
              Nėra laukiančių keleivių
            </Text>
          ) : (
            users.map((u) => (
              <View
                key={u.id}
                style={{
                  ...CommonStyles.rowAlignCenter,
                  padding: Sizes.fixPadding,
                  borderBottomWidth: 1,
                  borderColor: Colors.lightGray,
                }}
              >
                <Image
                  source={u.photoURL ? { uri: u.photoURL } : placeholder}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                  <Text style={Fonts.blackColor15SemiBold}>
                    {u.nickname}
                  </Text>
                  <Text style={Fonts.grayColor12Medium}>
                    Registruotas:{" "}
                    {u.registeredAt
                      ? u.registeredAt.toDate().toLocaleString()
                      : ""}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => onApprove(u.id)}
                  style={{
                    backgroundColor: Colors.secondaryColor,
                    padding: Sizes.fixPadding,
                    borderRadius: Sizes.fixPadding / 2,
                    marginRight: Sizes.fixPadding,
                  }}
                >
                  <Text style={Fonts.whiteColor16SemiBold}>Patvirtinti</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onDecline(u.id)}
                  style={{
                    backgroundColor: Colors.redColor,
                    padding: Sizes.fixPadding,
                    borderRadius: Sizes.fixPadding / 2,
                  }}
                >
                  <Text style={Fonts.whiteColor16SemiBold}>Atmesti</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </Overlay>
  );
};

export default RequestSheet;