import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/native";

const MessagesScreen = () => {
  const { params } = useRoute();
  const { matchedUser } = params;
  const { user } = useAuth();
  const [input, setInput] = useState("");

  const sendMessage = () => {};

  return (
    <SafeAreaView>
      <Header title={matchedUser.displayName} callEnabled={true}></Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-row justify-between items-center border-t border-gray-200 px-5 py-2">
            <TextInput
              className="h-10 text-lg"
              placeholder="Say hi to your match"
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              value={input}
            ></TextInput>
            <Button title="send" color="#FF5864" onPress={sendMessage} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesScreen;
