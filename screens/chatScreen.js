import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat"></Header>
    </SafeAreaView>
  );
};

export default ChatScreen;
