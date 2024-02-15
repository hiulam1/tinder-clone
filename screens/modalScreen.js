import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const ModalScreen = () => {
  const navigation = useNavigation();

  const { user } = useAuth();
  const [image, setImage] = useState("");
  const [occupation, setOccupation] = useState("");
  const [age, setAge] = useState("");

  const updateUserProfile = async () => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        displayName: user.displayName,
        photoURL: image,
        occupation: occupation,
        age: age,
        timestamp: serverTimestamp(),
      });
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error updating user profile", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 items-center ">
        <Image
          className="h-14 w-full"
          resizeMode="contain"
          source={require("/Users/territse/code/hiulam1/tinder-clone/assets/Tinder-logo2.png")}
        ></Image>
        <Text style={{ fontSize: 30 }} className="text-gray-500">
          hello to {user.displayName}
        </Text>
        <Text style={[styles.redText, styles.text]}>
          please enter profile URL
        </Text>
        <TextInput
          onChangeText={setImage}
          style={styles.text}
          placeholder="upload profile pic"
        ></TextInput>
        <Text style={[styles.redText, styles.text]}>Update occupation</Text>
        <TextInput
          style={styles.text}
          placeholder="occupation"
          onChangeText={setOccupation}
        ></TextInput>
        <Text style={[styles.redText, styles.text]}>Update age</Text>
        <TextInput
          style={styles.text}
          placeholder="age"
          keyboardType="numeric"
          onChangeText={setAge}
        ></TextInput>
        <TouchableOpacity
          className=" p-3 rounded-xl absolute bottom-4 bg-red-400 "
          onPress={updateUserProfile}
        >
          <Text style={{ fontSize: 18, color: "white" }}>Update profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    fontSize: 18,
  },
  redText: {
    color: "red",
  },
});
export default ModalScreen;
