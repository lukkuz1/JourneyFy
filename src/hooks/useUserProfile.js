import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import firebaseServices from "../services/firebase";

const { db } = firebaseServices;

export const useUserProfile = () => {
  const [user, setUser] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const currentUserId = firebaseServices.auth.currentUser?.uid;
      if (!currentUserId) return;

      const userRef = doc(db, "users", currentUserId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setUser(userDoc.data());
      } else {
        await setDoc(userRef, { firstName: "", lastName: "" });
        setUser({ firstName: "", lastName: "" });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserProfile();
    setRefreshing(false);
  };

  return { user, fetchUserProfile, refreshing, onRefresh };
};
