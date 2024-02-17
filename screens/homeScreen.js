import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Deck from "../components/Deck";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 ">
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
      <Deck />
    </SafeAreaView>
  );
};

export default HomeScreen;
