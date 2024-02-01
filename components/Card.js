import { View, Text, Image } from "react-native";
import { Dimensions } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const goldenRatio = (1 + Math.sqrt(5)) / 2;
const cardWidth = windowWidth * 0.9;
const cardHeight = windowHeight * 0.85;

const Card = ({ profile }) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View className="mt-7 shadow-lg" style={styles.card}>
          <Image
            source={{ uri: profile.photoURL }}
            style={{ height: "100%", width: "100%", borderRadius: 20 }}
            resizeMode="cover"
          ></Image>
          <AntDesign
            name="closecircleo"
            size={50}
            color="#fe3c72"
            style={styles.noButton}
          />
          <Text style={styles.cardName}>{profile.firstName}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    height: cardHeight,
    width: cardWidth,
    borderRadius: 20,
  },
  cardName: {
    position: "absolute",
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    bottom: 120,
    left: 30,
  },
  noButton: {
    position: "absolute",
    bottom: 40,
    left: 70,
    fontWeight: "bold",
  },
});

export default Card;
