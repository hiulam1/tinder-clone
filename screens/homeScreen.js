import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Deck from "../components/Deck";

import dummyData from "../components/dummyData";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, error, firebaseError, logOut } = useAuth();
  console.log(user);

  return (
    <SafeAreaView>
      <View className="flex-row justify-between items-center px-5">
        <TouchableOpacity onPress={logOut}>
          <Image
            className="w-10 h-10 rounded-full"
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Modal");
          }}
        >
          <Image
            className="w-14 h-14 rounded-full"
            source={require("../assets/tinder-logo.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubble-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Deck dummyData={dummyData} />

      {/* <Text>
        {user ? (
          <>
            <Text>fds{JSON.stringify(user.email)}</Text>{" "}
            <Button title="logout" onPress={logOut}></Button>
          </>
        ) : null}
        {error && <Text>error{JSON.stringify(error)}</Text>}
      </Text>
      <Button
        title="Go to Chat"
        onPress={() => navigation.navigate("Chat")}
      ></Button> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
