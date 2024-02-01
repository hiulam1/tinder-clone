import { View, Text } from "react-native";
import React, { useState } from "react";
import Card from "./Card";

const Deck = ({ dummyData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <View>
      <Card profile={dummyData[currentIndex]} />
    </View>
  );
};

export default Deck;
