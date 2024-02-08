import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  interpolateNode,
} from "react-native-reanimated";
import Card from "./Card";
import { runOnJS } from "react-native-reanimated";

const windowHeight = Dimensions.get("window").height;
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
      if (Math.abs(offset.value) > swipeThreshold) {
        isSwiped.value = true;
        runOnJS(handleSwipe)({ swiped: true });
      } else {
        isSwiped.value = false;
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
