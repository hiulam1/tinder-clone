import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { firebase } from "@react-native-firebase/auth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, error, firebaseError, logOut } = useAuth();

  return (
    <View>
      <Text>
        HomeScreen
        {user ? (
          <>
            <Text>{JSON.stringify(user.email)}</Text>{" "}
            <Button title="logout" onPress={logOut}></Button>
          </>
        ) : null}
        {error && <Text>error{JSON.stringify(error)}</Text>}
      </Text>
      <Button
        title="Go to Chat"
        onPress={() => navigation.navigate("Chat")}
      ></Button>
    </View>
  );
};

export default HomeScreen;
