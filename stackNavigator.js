import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/homeScreen"; // Fixed the file name casing
import ChatScreen from "./screens/chatScreen"; // Fixed the file name casing
import LoginScreen from "./screens/loginScreen"; // Fixed the file name casing
import useAuth from "./hooks/useAuth"; // Added import statement for useAuth hook
import ModalScreen from "./screens/modalScreen";
import MatchScreen from "./screens/matchScreen";

const stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();

  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <stack.Group>
            <stack.Screen name="Home" component={HomeScreen} />
            <stack.Screen name="Chat" component={ChatScreen} />
          </stack.Group>
          <stack.Group
            screenOptions={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          >
            <stack.Screen name="Modal" component={ModalScreen} />
          </stack.Group>
          <stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <stack.Screen name="Match" component={MatchScreen} />
          </stack.Group>
        </>
      ) : (
        <>
          <stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </stack.Navigator>
  );
};

export default StackNavigator;
