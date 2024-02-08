import { View, Text } from "react-native";
import React, { useState } from "react";
import Card from "./Card";
import SwipeableCard from "./SwipeableCard";
import AllCardsSwiped from "./AllCardsSwiped";

const Deck = ({ dummyData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allCardsSwiped, setAllCardsSwiped] = useState(false);
  const handleSwiped = ({ swiped }) => {
    if (swiped) {
      console.log("swiped");
      if (currentIndex < dummyData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setAllCardsSwiped(true);
      }
    }
  };

  return (
    <View>
      {allCardsSwiped ? (
        <AllCardsSwiped />
      ) : (
        <SwipeableCard
          profile={dummyData[currentIndex]}
          handleSwipe={handleSwiped}
        />
      )}
    </View>
  );
};

export default Deck;
