import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomTextFieldWithTitle from "../components/CustomTextFieldWithTitle";
import CustomSubmit from "../components/CustomSubmitButton";
import { useNavigation } from "@react-navigation/native";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignInPage = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      // Handle form submission, you can use values object here
      console.log("Register", values);
    },
  });

  const signUpNavigation = () => {
    navigation.navigate("SignUp");
  };

  const handleFacebookSignIn = () => {
    console.log("Facebook login");
  };

  const handleGoogleSignIn = () => {
    console.log("Google login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/splash.png")} />
      </View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>
          Welcome back! Please
          <Text style={styles.highlightText}> Sign in!</Text>
        </Text>
      </View>
      <View style={styles.signUpContainer}>
        <View style={styles.signUpOptions}>
          <Text style={styles.signUpOptionsText}>Email</Text>
          <View style={styles.emailContainer}>
            <CustomTextFieldWithTitle
              placeholder={"Enter your email"}
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
            <Image
              style={styles.emailIcon}
              source={require("../assets/Email.png")}
            />
          </View>
          <Text style={styles.errorText}>
            {formik.touched.email && formik.errors.email}
          </Text>
        </View>
        <View style={styles.signUpOptions}>
          <Text style={styles.signUpOptionsText}>Password</Text>
          <View style={styles.lockContainer}>
            <CustomTextFieldWithTitle
              placeholder={"Enter password"}
              secureTextEntry={true}
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            <Image
              style={styles.emailIcon}
              source={require("../assets/Lock.png")}
            />
          </View>
          <Text style={styles.errorText}>
            {formik.touched.password && formik.errors.password}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={formik.handleSubmit}>
            <CustomSubmit
              buttonFunction={() => console.log("Register")}
              inlineStyle={{ color: "white" }}
              submitText={"Login"}
              backgroundColor={"#4ECCA3"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subHeading}>
        <TouchableOpacity>
          <Text style={styles.subHeadingText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subHeading}>
        <TouchableOpacity>
          <Text style={styles.subHeadingText}>
            Create an account
            <Text style={styles.highlightText} onPress={signUpNavigation}>
              {" "}
              Sign Up{" "}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.lineDivide}></View>
        <View>
          <Text style={styles.optionText}>Or</Text>
        </View>
        <View style={styles.lineDivide}></View>
      </View>
      <View style={styles.optionsIconsContainer}>
        <View>
          <TouchableOpacity
            style={styles.facebookIconContainer}
            onPress={handleFacebookSignIn}>
            <Image
              style={styles.facebookIcon}
              source={require("../assets/Facebook.png")}
            />
            <Text style={styles.facebookText}> Sign Up Using Facebook</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.googleContainer}
            onPress={handleGoogleSignIn}>
            <Image
              style={styles.googleIcon}
              source={require("../assets/Google.png")}
            />
            <Text style={styles.googleText}> Sign Up Using Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: heightPercentageToDP(6),
  },
  logo: {
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(10),
  },
  facebookIconContainer: {
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(5),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#4ECCA3",
    borderWidth: 2,
    borderRadius: 10,
  },
  googleContainer: {
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(5),
    paddingLeft: widthPercentageToDP(0),
    paddingRight: widthPercentageToDP(0),
    paddingBottom: heightPercentageToDP(0),
    paddingTop: heightPercentageToDP(0),
    marginTop: heightPercentageToDP(2),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#4ECCA3",
    borderWidth: 2,
    borderRadius: 10,
  },
  googleIcon: {
    width: widthPercentageToDP(7),
    height: heightPercentageToDP(3),
    marginRight: widthPercentageToDP(2),
  },
  emailContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  lockContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  googleText: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "Poppins",
    color: "black",
  },
  facebookIcon: {
    width: widthPercentageToDP(7),
    height: heightPercentageToDP(3),
    marginRight: widthPercentageToDP(2),
  },
  emailIcon: {
    width: widthPercentageToDP(5),
    height: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(1),
    marginLeft: widthPercentageToDP(3),
    position: "absolute",
  },
  facebookText: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "Poppins",
    color: "black",
  },
  heading: {
    alignItems: "left",
    justifyContent: "center",
  },
  optionsIconsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    marginTop: heightPercentageToDP(2),
    marginLeft: widthPercentageToDP(10),
    marginRight: widthPercentageToDP(10),
    fontSize: heightPercentageToDP(4),
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  highlightText: {
    color: "#4ECCA3",
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: heightPercentageToDP(2),
  },
  lineDivide: {
    borderBottomColor: "#696565",
    width: 130,
    margin: 20,
    borderBottomWidth: 1,
  },
  optionText: {
    marginLeft: widthPercentageToDP(2),
    marginRight: widthPercentageToDP(2),
    fontSize: 14,
    fontFamily: "Poppins",
    color: "black",
  },
  signUpOptions: {
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(2),
  },
  signUpOptionsText: {
    fontSize: heightPercentageToDP(2),
    color: "#696565",
    fontWeight: "normal",
    fontFamily: "Poppins",
  },
  signUpContainer: {
    marginLeft: widthPercentageToDP(10),
  },
  subHeadingText: {
    marginLeft: widthPercentageToDP(10),
    marginTop: heightPercentageToDP(2),
    fontSize: heightPercentageToDP(2),
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: widthPercentageToDP(13),
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
