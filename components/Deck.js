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

  const fetchSwipedProfiles = async ({ profileIds, profiles }) => {
    if (profileIds.empty) {
      console.log("No swiped profiles");
    } else {
      profiles = profileIds.docs.map((doc) => doc.id);
      console.log("swiped profiles", profiles);
    }
  };
  // listener of all the profiles in the database
  useEffect(() => {
    const fetchRejectedProfiles = async () => {
      try {
        let rejectedProfiles = [];
        let likedProfiles = [];

        const rejectedProfileIds = await getDocs(
          collection(db, "users", user.uid, "rejected")
        );
        const likedProfileIds = await getDocs(
          collection(db, "users", user.uid, "liked")
        );

        fetchSwipedProfiles({
          profileIDs: rejectedProfileIds,
          profiles: rejectedProfiles,
        });
        fetchSwipedProfiles({
          profileIDs: likedProfileIds,
          profiles: likedProfiles,
        });

        rejectedProfiles =
          rejectedProfiles.length > 0 ? rejectedProfiles : ["null"];
        console.log("rejected profiles", rejectedProfiles);

        likedProfiles = likedProfiles.length > 0 ? likedProfiles : ["null"];

        const unsub = onSnapshot(
          query(
            collection(db, "users"),
            where("id", "not-in", [...rejectedProfiles, ...likedProfiles])
          ),
          (snapshot) => {
            setProfiles(
              snapshot.docs
                .filter((doc) => doc.id !== user.uid)
                .map((doc) => doc.data())
            );
          }
        );
        return () => unsub();
      } catch (error) {
        console.log("error fetching rejected profiles", error);
      }
    };

    fetchRejectedProfiles();
  }, [user.uid, db]);

  const addProfileToRejected = () => {
    setDoc(
      doc(db, "users", user.uid, "rejected", profiles[currentIndex].id),
      profiles[currentIndex]
    );
  };

  const addProfileToLiked = () => {
    setDoc(
      doc(db, "users", user.uid, "liked", profiles[currentIndex].id),
      profiles[currentIndex]
    );
  };

  const renderNextCard = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setAllCardsSwiped(true);
    }
  };

  const handleSwiped = ({ rejected, liked }) => {
    if (rejected) {
      addProfileToRejected();
    } else if (liked) {
      addProfileToLiked();
    }
    renderNextCard();
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
