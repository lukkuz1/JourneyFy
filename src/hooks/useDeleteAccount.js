import { getAuth, deleteUser } from "firebase/auth";
import { Alert } from "react-native";

export const useDeleteAccount = () => {
  const auth = getAuth();

  const handleDeleteAccount = () => {
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        auth.signOut();
        Alert.alert("Paskyra ištrinta", "Jūsų paskyra ištrinta.");
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        Alert.alert("Klaida", "Nepavyko ištrinti paskyros.");
      });
  };

  return { handleDeleteAccount };
};
