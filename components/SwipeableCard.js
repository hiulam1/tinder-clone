import { View, Text, Dimensions } from "react-native";
import React from "react";
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

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const SwipeableCard = ({ profile }) => {
  const onLeft = useSharedValue(true);
  const offset = useSharedValue(0);
  const pan = Gesture.Pan()
    .onChange((e) => {
      offset.value = e.translationX;
    })
    .onEnd((e) => {
      offset.value = withTiming(0, { duration: 100 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value * 2 },
      {
        rotate: `${interpolate(
          offset.value,
          [-windowWidth / 2, windowWidth / 2], // Input range
          [-20, 20], // Output range
          Extrapolation.CLAMP // Clamping the output
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
