// src/hooks/useWalletValue.js
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../services/firebase";
import { getAuth } from "firebase/auth";

const useWalletValue = () => {
  const [walletValue, setWalletValue] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      return;
    }
    const walletRef = ref(rtdb, `users/${user.uid}/walletValue`);
    const unsubscribe = onValue(
      walletRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setWalletValue(snapshot.val());
        } else {
          setWalletValue(0);
        }
      },
      (error) => {
        console.error("Error fetching walletValue:", error);
        setWalletValue(0);
      }
    );
    return () => unsubscribe();
  }, [user]);

  return walletValue;
};

export default useWalletValue;