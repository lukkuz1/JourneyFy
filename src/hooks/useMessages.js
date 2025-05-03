import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import firebase from "../services/firebase";
import { formatTime } from "../utils/formatTime";

export default function useMessages(rideId) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!rideId) return;
    const user = firebase.auth.currentUser;
    if (!user) return;

    const msgsRef = collection(firebase.db, "journeys", rideId, "messages");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((docSnap) => {
          const { text, senderId, createdAt } = docSnap.data();
          return {
            id: docSnap.id,
            message: text,
            senderId,
            isSender: senderId === user.uid,
            time: formatTime(createdAt),
          };
        });
        setMessages(list);
      },
      (err) => console.error("Messages listen error:", err)
    );

    return () => unsub();
  }, [rideId]);

  return messages;
}
