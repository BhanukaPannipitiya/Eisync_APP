import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const SignUpPage = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../assets/splash.png")} />
      </View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>
          Let’s make your
          <Text style={styles.highlighText}> account!</Text>
        </Text>
      </View>
      <View style={styles.signUpOptions}>
        <Text style={styles.signUpOptionsText}>Sign up with</Text>
      </View>
    </View>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    marginTop: heightPercentageToDP(6),
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(10),
  },
  heading: {
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    marginTop: heightPercentageToDP(2),
    marginLeft: widthPercentageToDP(10),
    marginRight: widthPercentageToDP(10),
    fontSize: heightPercentageToDP(4),
    fontWeight: "bold",
    fontFamily: "Popins",
  },
  highlighText: {
    color: "#4ECCA3",
  },
  signUpOptions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
