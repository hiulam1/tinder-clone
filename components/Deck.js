import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import SwipeableCard from "./SwipeableCard";
import AllCardsSwiped from "./AllCardsSwiped";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import NoProfiles from "./NoProfiles";

const Deck = ({ dummyData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allCardsSwiped, setAllCardsSwiped] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const { user } = useAuth();

  const navigation = useNavigation();

  // function to handle swiping again, passed to child component
  const handleSwipeAgain = () => {
    console.log("swipe again");
    setCurrentIndex(0);
    setAllCardsSwiped(false);
  };

  // listener of the user's profile, if it exists
  useLayoutEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        console.log("No such document");
        navigation.navigate("Modal");
      } else {
        console.log("Document data:", snapshot.data());
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setProfiles(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsub();
  }, []);

  const handleSwiped = ({ swiped }) => {
    if (swiped) {
      console.log("swiped");
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setAllCardsSwiped(true);
      }
    }
  };

  return (
    <View className="flex-1">
      {profiles.length === 0 ? (
        <NoProfiles />
      ) : allCardsSwiped ? (
        <AllCardsSwiped handleSwipeAgain={handleSwipeAgain} />
      ) : (
        <SwipeableCard
          profile={profiles[currentIndex]}
          handleSwipe={handleSwiped}
        />
      )}
    </View>
  );
};

export default Deck;
