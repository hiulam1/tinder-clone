import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const MatchScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { loggedInUserData, userSwiped } = params;
  return (
    <View className="flex-1 bg-red-500" style={{ opacity: 0.89 }}>
      <View className="justify-center px-10 pt-40 ">
        <Image
          style={{ height: 100 }}
          source={{
            uri: "https://img.wattpad.com/6d88d144abdfc76a91ce52256657c45437d778a3/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f2d345943354b4a4a66722d7136413d3d2d3433303735343237392e313463623138613234623035323534323334383637373531393132372e706e67?s=fit&w=720&h=720",
          }}
        />
      </View>
      <Text className="text-white text-center mt-5 text-2xl">
        You swiped with {userSwiped.displayName}
      </Text>
      <View className="flex-row justify-evenly mt-20">
        <Image
          className="h-32 w-32 rounded-full"
          source={{ uri: userSwiped.photoURL }}
        ></Image>
        <Image
          className="h-32 w-32 rounded-full"
          source={{ uri: loggedInUserData.photoURL }}
        ></Image>
      </View>
      <TouchableOpacity
        className="bg-white m-5 px-10 py-8 rounded-full mt-20"
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text className="text-center">Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;
