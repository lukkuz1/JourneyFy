import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

export const uploadImageAsync = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const storage = getStorage();
  const imageRef = storageRef(storage, `cars/${currentUser.uid}/${Date.now()}`);
  await uploadBytes(imageRef, blob);
  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
};
