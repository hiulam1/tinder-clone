import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  return (
    <View className="p-2 flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold pl-2">{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity className="pr-2">
          <FontAwesome5 name="phone" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
