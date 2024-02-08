import { View, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const AllCardsSwiped = ({ handleSwipeAgain }) => {
  return (
    <View className="flex-1 justify-center items-center ">
      <Text className="text-4xl mb-6">All Cards Swiped :( </Text>
      <Text className="text-lg mb-6">Would you like to swipe again?</Text>

      <TouchableOpacity
        className="p-3 rounded-xl bg-red-400"
        onPress={() => {
          handleSwipeAgain();
        }}
      >
        <Text className="text-white text-bold text-lg">Swipe Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllCardsSwiped;
