import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import SwipeableCard from "./SwipeableCard";
import AllCardsSwiped from "./AllCardsSwiped";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
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
  const userSwiped = profiles[currentIndex];

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
        console.log(user.uid);
      }
    });
    return () => unsub();
  }, []);

  // listener of all the profiles in the database
  useEffect(() => {
    const fetchRejectedProfiles = async () => {
      try {
        const rejectedProfileIds = await fetchSwipedProfileIds("rejected");
        const likedProfileIds = await fetchSwipedProfileIds("liked");

        // filter out the profiles that have been rejected or liked
        const renderFilteredProfiles = onSnapshot(
          query(
            collection(db, "users"),
            where("id", "not-in", [...rejectedProfileIds, ...likedProfileIds])
          ),
          (snapshot) => {
            setProfiles(
              snapshot.docs
                .filter((doc) => doc.id !== user.uid)
                .map((doc) => doc.data())
            );
          }
        );
        return () => renderFilteredProfiles();
      } catch (error) {
        console.log("error fetching rejected profiles", error);
      }
    };

    fetchRejectedProfiles();
  }, [user.uid, db]);

  const addProfileToRejected = () => {
    setDoc(doc(db, "users", user.uid, "rejected", userSwiped.id), userSwiped);
  };

  const addProfileToLiked = () => {
    setDoc(doc(db, "users", user.uid, "liked", userSwiped.id), userSwiped, {
      timestamp: serverTimestamp(),
    });
  };

  const renderNextCard = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setAllCardsSwiped(true);
    }
  };

  const fetchSwipedProfileIds = async (collectionPath) => {
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, collectionPath)
    );
    if (querySnapshot.empty) {
      console.log(`No profiles in ${collectionPath}`);
      return ["null"];
    } else {
      return querySnapshot.docs.map((doc) => doc.id);
    }
  };

  const handleSwiped = ({ rejected, liked }) => {
    if (rejected) {
      addProfileToRejected();
    } else if (liked) {
      addProfileToLiked();
      checkIfMatched(userSwiped.id);
    }
    renderNextCard();
  };

  const checkIfMatched = async (userSwipedId) => {
    try {
      const likeDocRef = doc(db, "users", userSwipedId, "liked", user.uid);
      const checkForLike = await getDoc(likeDocRef);
      if (!checkForLike.exists()) {
        console.log("no match");
      } else {
        const matchDocRef = doc(collection(db, "matches"));
        await setDoc(matchDocRef, {
          [user.uid]: true,
          [userSwipedId]: true,
          timestamp: serverTimestamp(),
        });
        console.log("match added successfully");
      }
    } catch (error) {
      console.log("error checking for match", error);
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
