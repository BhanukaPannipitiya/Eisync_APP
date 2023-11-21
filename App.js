import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppNavigation from "./src/routings/AuthNavigator";
import { useFonts } from "expo-font";
import Header from "./src/components/Header";
import MainStack from "./src/routings/MainStack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [loaded] = useFonts({
    Poppins: require("./src/assets/fonts/Poppins-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
  );
}
