import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import useNavigation from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const ChatRow = ({ matchDetails }) => {
  const { user } = useAuth();
  const [matchedUser, setMatchedUser] = useState({});
  const [matchedPhoto, setMatchedPhoto] = useState("");

  useEffect(() => {
    const matchedUserID = matchDetails.users.filter(
      (matchedUserID) => matchedUserID != user.uid
    );
    const userData = matchDetails.userData;
    setMatchedUser(userData[matchedUserID[0]]);
  }, [matchDetails, user]);
  useEffect(() => {
    matchedUser && setMatchedPhoto(matchedUser?.photoURL);
  }, [matchedUser]);

  return (
    <TouchableOpacity
      style={styles.boxShadow}
      className="flex-row items-center py-3 px-5 mx-3 my-2 rounded-lg bg-white"
    >
      <Image
        source={{ uri: matchedPhoto }}
        className="h-16 w-16 mr-4 rounded-full"
      />
      <View>
        <Text className="text-lg font-bold">
          {matchedUser?.displayName} - {matchedUser?.age}
        </Text>
        <Text>Say Hi!</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
export default ChatRow;
