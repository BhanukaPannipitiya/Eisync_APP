import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import CustomTextFieldWithTitle from "../components/CustomTextFieldWithTitle";
import CustomSubmit from "../components/CustomSubmitButton";

const SignUpPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/splash.png")} />
      </View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>
          Let’s make your
          <Text style={styles.highlightText}> account!</Text>
        </Text>
      </View>
      <View style={styles.signUpContainer}>
        <View style={styles.signUpOptions}>
          <Text style={styles.signUpOptionsText}>Email</Text>
          <CustomTextFieldWithTitle placeholder={"Email"} />
        </View>
        <View style={styles.signUpOptions}>
          <Text style={styles.signUpOptionsText}>Password</Text>
          <CustomTextFieldWithTitle
            placeholder={"Password"}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.signUpOptions}>
          <Text style={styles.signUpOptionsText}>Confirm Password</Text>
          <CustomTextFieldWithTitle
            placeholder={"Confirm Password"}
            secureTextEntry={true}
          />
        </View>
        <CustomSubmit
          inlineStyle={{ color: "white" }}
          submitText={"Register"}
          backgroundColor={"#4ECCA3"}
        />
      </View>
    </View>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center", // Align items in the center
    justifyContent: "center",
    marginTop: heightPercentageToDP(6),
  },
  logo: {
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
  highlightText: {
    color: "#4ECCA3",
  },
  signUpOptions: {
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(2),
  },
  signUpOptionsText: {
    fontSize: heightPercentageToDP(2),
    color: "#696565",
    fontWeight: "normal",
    fontFamily: "Popins",
  },
  signUpContainer: {
    marginLeft: widthPercentageToDP(10),
  },
});
