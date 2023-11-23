import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import BottomNav from "../components/NavigationBarBottom";
import CustomTextFieldWithTitle from "../components/CustomTextFieldWithTitle";
import CustomSubmit from "../components/CustomSubmitButton";

const AddNewAppliance = () => {
  const [deviceType, setDeviceType] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [power, setPower] = useState("");
  const [voltage, setVoltage] = useState("");
  const [estimatedOnHours, setEstimatedOnHours] = useState("");

  const submitForm = () => {
    // You can implement your logic to send data to the database here
    // For example, you can use a fetch or axios to make a network request
    const formData = {
      deviceType,
      deviceBrand,
      deviceModel,
      power,
      voltage,
      estimatedOnHours,
    };
  };
  return (
    <SafeAreaView style={styles.parentContainer}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              Add new <Text style={styles.subHeading}>appliance</Text>
            </Text>
          </View>
          
          <Image
            style={styles.image}
            source={require("../assets/appliance.png")}
          />

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Device Type"
              value={deviceType}
              onChangeText={(text) => setDeviceType(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Device Brand"
              value={deviceBrand}
              onChangeText={(text) => setDeviceBrand(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Device Model"
              value={deviceModel}
              onChangeText={(text) => setDeviceModel(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Power"
              value={power}
              onChangeText={(text) => setPower(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Voltage"
              value={voltage}
              onChangeText={(text) => setVoltage(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Estimated on Hours"
              value={estimatedOnHours}
              onChangeText={(text) => setEstimatedOnHours(text)}
            />
            {/* Add a button to submit the form */}
            <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
              <CustomSubmit
                buttonFunction={() => handleAppleSignIn()}
                inlineStyle={{ color: "white"}}
                submitText={"Add"}
                backgroundColor={"#4ECCA3"}
                style={styles.submitButton}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewAppliance;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headingContainer: {
    alignItems: "flex-start",
  },
  heading: {
    fontSize: 26,
    fontWeight: "normal",
    fontFamily: "Poppins",
    color: "#000000",
  },
  subHeading: {
    color: "#4ECCA3",
  },
  image: {
    height: heightPercentageToDP(20),
    width: heightPercentageToDP(40),
    marginTop: 20,
  },
  form: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    
  },
  input: {
    backgroundColor: "#FFF",
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "Poppins",
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
  },
  bottomNav: {
    bottom: 0,
    left: 0,
    right: 0,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#4ECCA3",
    justifyContent: "center",
    alignItems: "center",

  }
});
