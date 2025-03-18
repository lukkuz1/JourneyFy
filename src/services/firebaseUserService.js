import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import firebaseServices from "../services/firebase";

const { db } = firebaseServices;

export const fetchUserProfile = async (currentUserId, populateUserData, initializeUserProfile) => {
  if (!currentUserId) return;

  try {
    const userRef = doc(db, "users", currentUserId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      populateUserData(userDoc.data());
    } else {
      await initializeUserProfile(userRef);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const initializeUserProfile = async (userRef) => {
  await setDoc(userRef, {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: null,
  });
};

export const updateProfileInFirestore = async (currentUserId, profileData) => {
  const userRef = doc(db, "users", currentUserId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    console.log("📄 User document not found, creating one.");
    await setDoc(userRef, profileData);
  } else {
    console.log("📌 Updating existing user document.");
    await updateDoc(userRef, profileData);
  }
};
