import { StatusBar } from "expo-status-bar";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useEffect, useLayoutEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const { signinWithGoogle, user, logOut, error, loading } = useAuth();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [user]);

  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1, position: "relative" }}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          className="absolute bottom-40 "
          style={{ alignSelf: "center" }}
        >
          <Text className="text-center">
            {loading ? "loading..." : "Sign In"}
          </Text>
          {user && <Text>{JSON.stringify(user.idToken)}</Text>}
          {error && <Text>error{JSON.stringify(error)}</Text>}
          {user ? (
            <Button title="logout" onPress={logOut} />
          ) : (
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
              onPress={signinWithGoogle}
              style={{ alignSelf: "center" }}
            />
          )}
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
