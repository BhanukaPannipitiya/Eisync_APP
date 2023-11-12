import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import CustomSubmit from "../components/CustomSubmitButton";
import { useNavigation } from "@react-navigation/native";

const OTPVerificationPage = () =>{

  const navigation = useNavigation();

  const createNewPasswordNavigation = () => {
    navigation.navigate("CreateNewPassword");
    
  };
  const showAlert = () => {
    Alert.alert('Eisync', 'Code Sent Successfully!')
  }
    return(
        <View style= {styles.container}>
            <View>
                <Image style= {styles.logo} source={require("../assets/splash.png")} />
            </View>
            <View>
            <Image style={styles.otpverify} source={require("../assets/otpverify.png")}/>
            </View>
            <View style={styles.heading}>
                <Text style= {styles.headingText}> OTP
                <Text style={styles.highlighText}> Verification</Text>
                </Text>
            </View>
            <View>
                <Text style={styles.text}>Enter the verification code we just sent on your email address.</Text>
            </View>
            <View style={styles.boxContainer}>
              <View style= {styles.box}>
               <TextInput style={styles.boxText} keyboardType="numeric"/>
               </View>
               <View style={styles.box}>
               <TextInput style= {styles.boxText} keyboardType="numeric"/>
               </View>
               <View style={styles.box}>
               <TextInput style= {styles.boxText} keyboardType="numeric"/> 
               </View>
               <View style={styles.box}>
               <TextInput  style= {styles.boxText} keyboardType="numeric"/> 
               </View>
               <View style={styles.box}>
               <TextInput  style= {styles.boxText} keyboardType="numeric"/> 
               </View>
            </View>
            <View> 
            <CustomSubmit
          inlineStyle={{ color: "white" }}
          submitText={"Verify"}
          backgroundColor={"#4ECCA3"}
          buttonFunction={() => createNewPasswordNavigation()}
        />
            </View>
            <View>
              <Text style={styles.text}>Didn't recieved code? 
              <Text style={styles.highlighText} onPress={showAlert}> Resend</Text>
              </Text>
            </View>
        </View>
    )

}

export default OTPVerificationPage;


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
      marginTop: heightPercentageToDP(5),
      marginLeft: widthPercentageToDP(-22),
      marginRight: widthPercentageToDP(2),
      fontSize: heightPercentageToDP(4),
      fontWeight: "bold",
      fontFamily: "Popins",
    },
    highlighText: {
      color: "#4ECCA3",
    },
   
    otpverify:{
        marginTop:heightPercentageToDP(8),
        
    },
    text:{
      marginTop: heightPercentageToDP(1),
        marginLeft: widthPercentageToDP(8),
        marginRight:widthPercentageToDP(15),
        color: "#696565",
        fontWeight:"500",
        fontFamily:"Poppins",
        
    },
    button:{
      marginBottom: heightPercentageToDP(20),
      marginRight: widthPercentageToDP(2),
    },
    box:{
      marginTop:heightPercentageToDP(5),
      marginBottom:heightPercentageToDP(5),
      borderWidth: 1,
      width:widthPercentageToDP(10),
      height:heightPercentageToDP(6),
      backgroundColor: "#F4F4F4",
      borderColor:"#4ECCA3",
      marginRight: widthPercentageToDP(5),
      borderRadius:8
    },
    boxContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between'
      
    },
    boxText:{
      fontFamily:"Poppins",
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 30,
      
    }
  });