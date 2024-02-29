import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const MessagesScreen = () => {
  const { params } = useRoute();
  const { matchedUser, matchID } = params;
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    try {
      addDoc(collection(db, "matches", matchID, "messages"), {
        message: input,
        timestamp: serverTimestamp(),
        userId: user.uid,
        displayName: user.displayName,
        photoURL: matchedUser.photoURL,
      });
      setInput("");
    } catch (error) {
      console.log("error sending message", error);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <Header title={matchedUser.displayName} callEnabled={true} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            className="pl-4"
            renderItem={({ item: message }) => {
              message.userId === user.uid ? (
                <SenderMessage />
              ) : (
                <ReceiverMessage />
              );
            }}
          />
        </TouchableWithoutFeedback>
        <View className="flex-row bg-white justify-between items-center border-t border-gray-200 px-5 py-2">
          <TextInput
            className="h-10 text-lg"
            placeholder="Say hi to your match"
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          ></TextInput>
          <Button title="send" color="#FF5864" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesScreen;
