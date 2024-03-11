import { View, Text } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <View
      className="bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2 border-black border-2 border-solid"
      style={{ alignSelf: "flex-start", marginLeft: "auto" }}
    >
      <Text className="text-white">{message.message}</Text>
      <Text className="text-black">hello</Text>
    </View>
  );
};

export default SenderMessage;
