// src/hooks/useUpdateWalletValue.js
import { getAuth } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { rtdb } from "../services/firebase";

const useUpdateWalletValue = () => {
  const addMoneyToWallet = async (amount) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Naudotojas nėra prisijungęs");
    }
    const walletRef = ref(rtdb, `users/${user.uid}/walletValue`);
    try {
      const snapshot = await get(walletRef);
      let currentValue = 0;
      if (snapshot.exists()) {
        currentValue = snapshot.val();
      }
      const newValue = currentValue + Number(amount);
      await update(ref(rtdb, `users/${user.uid}`), { walletValue: newValue });
      return newValue;
    } catch (error) {
      console.error("Error updating wallet value:", error);
      throw error;
    }
  };

  return { addMoneyToWallet };
};

export default useUpdateWalletValue;
