import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { rtdb } from "../services/firebase";

const useUpdateWalletValueFromAmount = (amount, operation = "add") => {
  const [walletValue, setWalletValue] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user && amount) {
      const walletRef = ref(rtdb, `users/${user.uid}/walletValue`);
      get(walletRef)
        .then((snapshot) => {
          const currentValue = snapshot.exists() ? snapshot.val() : 0;
          const adjustment = Number(amount);
          const newValue =
            operation === "add"
              ? currentValue + adjustment
              : currentValue - adjustment;
          update(ref(rtdb, `users/${user.uid}`), { walletValue: newValue })
            .then(() => {
              setWalletValue(newValue);
            })
            .catch((error) => {
              console.error("Error updating walletValue:", error);
              setWalletValue(currentValue);
            });
        })
        .catch((error) => {
          console.error("Error fetching current walletValue:", error);
          setWalletValue(0);
        });
    }
  }, [amount, user, operation]);

  return walletValue;
};

export default useUpdateWalletValueFromAmount;
