import { getAuth, deleteUser } from "firebase/auth";
import { Alert } from "react-native";

export const useDeleteAccount = () => {
  const auth = getAuth();

  const handleDeleteAccount = () => {
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        auth.signOut();
        Alert.alert("Account Deleted", "Your account has been deleted.");
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        Alert.alert("Error", "Failed to delete account.");
      });
  };

  return { handleDeleteAccount };
};
