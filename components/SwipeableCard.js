import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import Card from "./Card";
import { runOnJS } from "react-native-reanimated";

const windowWidth = Dimensions.get("window").width;

const SwipeableCard = ({ profile, handleSwipe }) => {
  const [swipedRight, setSwipedRight] = useState(false);
  const [swipedLeft, setSwipedLeft] = useState(false);
  const isSwiped = useSharedValue(false);
  const offset = useSharedValue(0);
  const swipeThreshold = windowWidth / 2;

  const pan = Gesture.Pan()
    .onChange((e) => {
      offset.value = e.translationX;
    })
    .onEnd((e) => {
      if (offset.value < swipeThreshold * -1) {
        isSwiped.value = true;
        runOnJS(handleSwipe)({ rejected: true });
      } else if (offset.value > swipeThreshold) {
        console.log(offset.value);
        console.log(swipeThreshold);
        runOnJS(handleSwipe)({ liked: true });
      }
      offset.value = withTiming(0, { duration: 100 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value * 2 },
      {
        rotate: `${interpolate(
          offset.value,
          [-windowWidth / 2, windowWidth / 2],
          [-20, 20],
          Extrapolation.CLAMP
        )}deg`,
      },
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={animatedStyle}>
        <Card profile={profile} />
      </Animated.View>
    </GestureDetector>
  );
};

export default SwipeableCard;
