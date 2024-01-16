import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // Add this import statement
import StackNavigator from "./stackNavigator";
import { AuthProvider } from "./hooks/useAuth";

import app from "./firebase"; // Adjust the path according to your file structure

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
