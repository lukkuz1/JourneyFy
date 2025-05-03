import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const useDriver = (userId) => {
  const [driver, setDriver] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    if (userId) {
      const fetchDriver = async () => {
        try {
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setDriver(userSnap.data());
          } else {
            console.log("No such driver document!");
          }
        } catch (error) {
          console.error("Error fetching driver details: ", error);
        }
      };
      fetchDriver();
    }
  }, [userId, db]);

  return driver;
};

export default useDriver;
