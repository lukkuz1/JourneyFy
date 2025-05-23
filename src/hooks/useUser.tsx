import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { rtdb } from "../services/firebase";
import { child, ref, get, update } from "firebase/database";

type Props = {
  children?: React.ReactNode;
};

type UserData = {
  email: string;
  uid: string;
};

type UserContextData = {
  initialized: boolean;
  user: UserData;
  totalPoints: number;
  walletValue: number;
  initialize(user: UserData): Promise<void>;
  destroy(): void;
  updatePoints(newPoints: number): Promise<void>;
  updateWalletValue(newValue: number): Promise<void>;
  updateDataJSON(updateData: {}): Promise<void>;
};

const userContext = createContext({} as UserContextData);

export const useUser = () => {
  return useContext(userContext);
};

export const UserProvider: React.FC = ({ children }: Props) => {
  const [status, setStatus] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [walletValue, setWalletValue] = useState<number>(0);
  const originalTotal = useRef<number>();

  useEffect(() => {
    if (status) {
      console.log("useUser: User initialized (status = true)");
    } else {
      console.log("useUser: User is not initialized (status = false)");
    }
  }, [status]);

  useEffect(() => {
    if (user == null) {
      setStatus(false);
      setTotalPoints(0);
      setWalletValue(0);
    }
  }, [user]);

  const initialize = async (user: UserData): Promise<void> => {
    if (user != null) {
      setUser(user);

      let userExists = true;
      let updateRequired = false;
      let snapshotTotalPoints = 0;
      let snapshotWalletValue = 0;

      const dbRef = ref(rtdb);

      await get(child(dbRef, `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            snapshotTotalPoints = userData.totalPoints || 0;
            if (typeof userData.walletValue !== "undefined") {
              snapshotWalletValue = userData.walletValue;
            } else {
              snapshotWalletValue = 0;
              updateRequired = true;
            }
            setTotalPoints(snapshotTotalPoints);
            setWalletValue(snapshotWalletValue);
          } else {
            userExists = false;
          }
        })
        .catch((error) => {
          console.error(error);
        });

      if (!userExists || updateRequired) {
        const newUserData = {
          totalPoints: userExists ? snapshotTotalPoints : 0,
          walletValue: snapshotWalletValue,
        };

        await update(ref(rtdb, `users/${user.uid}`), newUserData)
          .then(() => {
            originalTotal.current = userExists ? snapshotTotalPoints : 0;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      setStatus(true);
    }
  };

  const destroy = () => {
    setUser(null);
  };

  const updatePoints = async (newPoints: number): Promise<void> => {
    if (status && user) {
      try {
        await update(ref(rtdb, `users/${user.uid}`), {
          totalPoints: newPoints,
        });
        setTotalPoints(newPoints);
      } catch (error) {
        console.error("Failed to update points", error);
      }
    } else {
      console.log(
        "Update points error, user is not logged in or status is false"
      );
    }
  };

  const updateWalletValue = async (newValue: number): Promise<void> => {
    if (status && user) {
      try {
        await update(ref(rtdb, `users/${user.uid}`), {
          walletValue: newValue,
        });
        setWalletValue(newValue);
      } catch (error) {
        console.error("Failed to update wallet value", error);
      }
    } else {
      console.log(
        "Update wallet value error, user is not logged in or status is false"
      );
    }
  };

  const updateDataJSON = async (updateData: any): Promise<void> => {
    if (status && user) {
    }
  };

  return (
    <userContext.Provider
      value={{
        initialized: status,
        user: user,
        totalPoints: totalPoints,
        walletValue: walletValue,
        initialize,
        destroy,
        updatePoints,
        updateWalletValue,
        updateDataJSON,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
