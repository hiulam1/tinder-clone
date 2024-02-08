import { View, Text, Image } from "react-native";
import { Dimensions } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const goldenRatio = (1 + Math.sqrt(5)) / 2;
const cardWidth = windowWidth * 0.9;
const cardHeight = windowHeight * 0.85;

const Card = ({ profile }) => {
  // define swipe right and left functions

  return (
    <>
      <View style={styles.container}>
        <View className="mt-7 shadow-lg" style={styles.card}>
          <Image
            source={{ uri: profile.photoURL }}
            style={styles.image}
            resizeMode="cover"
          ></Image>
          <AntDesign
            name="closecircleo"
            size={50}
            color="#fe3c72"
            style={[styles.yesAndNoButton, styles.noButton]}
          />
          <Ionicons
            name="heart-circle-outline"
            size={64}
            color="#148c5c"
            style={[styles.yesAndNoButton, styles.yesButton]}
          />
          <Text style={styles.cardName}>{profile.firstName}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },

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
  yesAndNoButton: {
    position: "absolute",
  },
  noButton: {
    left: 70,
    bottom: 40,
  },
  yesButton: {
    right: 70,
    bottom: 31,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
});

export default Card;
