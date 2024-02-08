import { View, Text } from "react-native";
import React, { useState } from "react";
import Card from "./Card";
import SwipeableCard from "./SwipeableCard";

const Deck = ({ dummyData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topCardSwiped, setTopCardSwiped] = useState(false);

  const handleSwiped = ({ swiped }) => {
    if (swiped) {
      console.log("swiped");
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
    setTopCardSwiped(false);
  };

  return (
    <View>
      <SwipeableCard
        profile={dummyData[currentIndex]}
        handleSwipe={handleSwiped}
      />
    </View>
  );
};

export default Deck;
