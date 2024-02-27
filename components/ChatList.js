import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { onSnapshot, collection, where, query } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const matchesRef = collection(db, "matches");
  const q = query(matchesRef, where("users", "array-contains", user.uid));

  useEffect(() => {
    try {
      const unsub = onSnapshot(q, (snapshot) => {
        const fetchedMatches = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatches(fetchedMatches);
      });
      console.log("matches", matches);
      return () => unsub();
    } catch (error) {
      console.log("error getting matches", error);
    }
  }, [user]);

  return matches.length > 0 ? (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <Text>no match found</Text>
  );
};

export default ChatList;
