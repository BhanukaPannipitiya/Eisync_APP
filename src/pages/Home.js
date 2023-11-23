import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import NavigationBarBottom from "../components/NavigationBarBottom";
import BottomNav from "../components/NavigationBarBottom";
import Header from "../components/Header";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.centerContent}>
          <Text>Home</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
