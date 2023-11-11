import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const WelcomPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.navigate("Home"), 3000);
  }, []);
  return (
    <View style={styles.container}>
      <ExpoStatusBar style="light" />
      <View>
        <Image
          style={styles.imageStyles}
          source={require("../assets/splash.png")}
        />
      </View>
    </View>
  );
};

export default WelcomPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyles: {
    width: wp(50),
    height: hp(20),
  },
});
