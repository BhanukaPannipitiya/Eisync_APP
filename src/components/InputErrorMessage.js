import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Formik } from "formik";
import CustomTextFieldWithTitle from "../components/CustomTextFieldWithTitle";
import InputErrorMessage from "../components/InputErrorMessage";
import { SignupSchemaFirstPageSchema } from "../models/FormValidationSchema";

const SignUpPage = () => {
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../assets/splash.png")} />
      </View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>
          Let’s make your
          <Text style={styles.highlightText}> account!</Text>
        </Text>
      </View>
      <Formik
        initialValues={{
          usernameInput: "",
          passwordInput: "",
          confirmPasswordInput: "",
        }}
        validationSchema={SignupSchemaFirstPageSchema}
        onSubmit={(values) => {
          // handle signup logic here
          console.log(values);
        }}>
        {({ handleChange, touched, setFieldTouched, errors, handleSubmit }) => (
          <View style={styles.formContainer}>
            <View style={styles.signupInputfieldContainer}>
              <CustomTextFieldWithTitle
                placeholder={"Email"}
                onChangeText={handleChange("usernameInput")}
                onBlur={() => setFieldTouched("usernameInput")}
              />
            </View>
            {errors.usernameInput && touched.usernameInput && (
              <InputErrorMessage message={errors.usernameInput} />
            )}
            <View style={styles.signupInputfieldContainer}>
              <CustomTextFieldWithTitle
                secureTextEntry={hidePass}
                placeholder={"Password"}
                onChangeText={handleChange("passwordInput")}
                onBlur={() => setFieldTouched("passwordInput")}
              />
              <View style={styles.hideIcon}>
                <TouchableOpacity
                  onPress={() => {
                    setHidePass(!hidePass);
                  }}>
                  <Image
                    style={styles.eyeIcon}
                    source={
                      hidePass
                        ? require("../assets/eye-closed.png")
                        : require("../assets/eye-open.png")
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            {errors.passwordInput && touched.passwordInput && (
              <InputErrorMessage message={errors.passwordInput} />
            )}
            <View style={styles.signupInputfieldContainer}>
              <CustomTextFieldWithTitle
                secureTextEntry={hideConfirmPass}
                placeholder={"Confirm password"}
                onChangeText={handleChange("confirmPasswordInput")}
                onBlur={() => setFieldTouched("confirmPasswordInput")}
              />
              <View style={styles.hideIcon}>
                <TouchableOpacity
                  onPress={() => {
                    setHideConfirmPass(!hideConfirmPass);
                  }}>
                  <Image
                    style={styles.eyeIcon}
                    source={
                      hideConfirmPass
                        ? require("../assets/eye-closed.png")
                        : require("../assets/eye-open.png")
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            {errors.confirmPasswordInput && touched.confirmPasswordInput && (
              <InputErrorMessage message={errors.confirmPasswordInput} />
            )}
            <View style={styles.signupSubmitButtonContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.customSubmitButton}>
                <Text style={styles.submitText}>Next</Text>
              </TouchableOpacity>
              {loading && (
                <View style={styles.indicator}>
                  <ActivityIndicator size="large" color="#B8B369" />
                </View>
              )}
            </View>
          </View>
        )}
      </Formik>
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
  signupInputfieldContainer: {
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(3),
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(50),
    justifyContent: "space-evenly",
    marginTop: heightPercentageToDP(2),
  },
  logo: {
    marginTop: heightPercentageToDP(6),
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(10),
  },
  hideIcon: {
    right: 10,
    position: "absolute",
  },
  indicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10,
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
  customSubmitButton: {
    backgroundColor: "#FDCDB6",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitText: {
    color: "#FFF",
    fontSize: heightPercentageToDP(2),
    fontWeight: "bold",
    fontFamily: "Popins",
  },
  eyeIcon: {
    width: widthPercentageToDP(5),
    height: heightPercentageToDP(2),
    resizeMode: "contain",
  },
});
