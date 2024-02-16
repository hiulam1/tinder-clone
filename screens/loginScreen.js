import {
  Button,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const { signinWithGoogle, user, logOut, loading } = useAuth();
  const navigation = useNavigation();

  return (
    <>
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
            <Text>{JSON.stringify(user)}</Text>
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
    </>
  );
}
