
import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import CustomTextFieldWithTitle from "../components/CustomTextFieldWithTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSubmit from "../components/CustomSubmitButton";
import { useNavigation } from "@react-navigation/native";

const PasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});


const CreateNewPasswordPage = () => {

  const navigation = useNavigation();

  
  const resetPasswordNavigation = () => {
    navigation.navigate("SignIn");
    
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: PasswordSchema,
    onSubmit: (values) => {
      // Handle form submission, you can use values object here
      console.log("changed!", values);
    },
  });

  return (
    <View>
       <View style={styles.container}>
           <Image style= {styles.logo} source={require("../assets/splash.png")} />
       </View>
       <Image style={styles.newPassword} source={require("../assets/newPassword.png")}/>
       <Text style={styles.heading}> Create </Text>
       <Text style={styles.highlightText} > new password</Text>
       <Text style={styles.subtitle}> Your new password must be unique from those previously used.</Text>
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
        <View style={styles.signUpOptions2}>
          <Text style={styles.signUpOptionsText2}>Confirm Password</Text>
          <View style={styles.lockContainer}>
            <CustomTextFieldWithTitle
              placeholder={"Enter confirm password"}
              secureTextEntry={true}
              value={formik.values.confirmPassword}
              onChangeText={formik.handleChange("confirmPassword")}
              onBlur={formik.handleBlur("confirmPassword")}
            />
            <Image
              style={styles.emailIcon}
              source={require("../assets/Lock.png")}
            />
          </View>
          <Text style={styles.errorText}>
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </Text>
        </View>
            <View style={styles.button}> 
            <CustomSubmit
          inlineStyle={{ color: "white" }}
          submitText={"Reset Password"}
          backgroundColor={"#4ECCA3"}
          buttonFunction={() => resetPasswordNavigation()}
          
        />
            </View>
    </View>
  )
}

export default CreateNewPasswordPage

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    
  },
  logo:{
    marginTop: heightPercentageToDP(8),
      width: widthPercentageToDP(25),
      height: heightPercentageToDP(10),
  },
  newPassword:{
    marginTop:heightPercentageToDP(20),
    marginLeft:widthPercentageToDP(10)

  },
  heading:{
    marginLeft: widthPercentageToDP(6),
    marginTop: heightPercentageToDP(1),
    fontFamily:"Poppins",
    fontWeight: "bold",
    fontSize: 30
  },
  highlightText :{
    color: "#4ECCA3",
    marginLeft: widthPercentageToDP(6),
    marginTop: heightPercentageToDP(-1),
    fontFamily:"Poppins",
    fontWeight: "bold",
    fontSize: 30
  },
  subtitle:{
    marginLeft: widthPercentageToDP(7),
    marginTop: heightPercentageToDP(1),
    marginRight:widthPercentageToDP(10),
    color: "#696565",
    fontFamily:"Poppins",
    fontSize: 15,
    fontWeight:"500"
  },
  signUpOptions: {
    marginTop: heightPercentageToDP(1),
    marginBottom: heightPercentageToDP(1),
    marginLeft: widthPercentageToDP(7)
  },
  signUpOptions2: {
    marginTop: heightPercentageToDP(0),
    marginBottom: heightPercentageToDP(3),
    marginLeft: widthPercentageToDP(7)
  },
  signUpOptionsText: {
    fontSize: heightPercentageToDP(2),
    color: "#696565",
    fontWeight: "normal",
    fontFamily: "Popins",
  },
  signUpOptionsText2: {
    fontSize: heightPercentageToDP(2),
    color: "#696565",
    fontWeight: "normal",
    fontFamily: "Popins",
  },
  lockContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  emailIcon: {
    width: widthPercentageToDP(5),
    height: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(1),
    marginLeft: widthPercentageToDP(3),
    position: "absolute",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  button:{
    marginLeft:widthPercentageToDP(12),
    marginTop: heightPercentageToDP(-2)
  }
})
