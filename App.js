// App.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import AppNavigation from "./src/routings/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default function App() {
  const [loaded] = useFonts({
    Poppins: require("./src/assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:heightPercentageToDP(5),
  },
});
