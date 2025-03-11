import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseServices from "../services/firebase";

const { db } = firebaseServices;

export default function useUserInfo() {
  const [error, setError] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  const saveUserInfo = async (username, name, surname, dateOfBirth) => {
    if (!username || !name || !surname || !dateOfBirth) {
      setError("Užpildykite visus laukus");
      return false;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        username,
        name,
        surname,
        dateOfBirth: dateOfBirth.toISOString().split("T")[0],
      });
      return true;
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Klaida išsaugant naudotojo informaciją");
      return false;
    }
  };

  return { saveUserInfo, error, setError };
}
