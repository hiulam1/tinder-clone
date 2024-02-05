import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // Add this import statement
import StackNavigator from "./stackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import app from "./firebase"; // Adjust the path according to your file structure
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
