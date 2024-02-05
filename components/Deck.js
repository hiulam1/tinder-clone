import { View, Text } from "react-native";
import React, { useState } from "react";
import Card from "./Card";
import SwipeableCard from "./SwipeableCard";

const Deck = ({ dummyData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <View>
      <SwipeableCard profile={dummyData[currentIndex]} />
    </View>
  );
};

export default Deck;
