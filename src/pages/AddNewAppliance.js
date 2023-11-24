import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
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
import { register } from "../Apis/UserAPI";

const AddNewAppliance = () => {
  const [deviceType, setDeviceType] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [power, setPower] = useState("");
  const [voltage, setVoltage] = useState("");
  const [estimatedOnHours, setEstimatedOnHours] = useState("");

  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const addAppliance = async () => {
    const apiUrl = "http://192.168.8.164:3000/addAppliance";

    const requestBody = {
      deviceType: deviceType,
      power: power,
      voltage: voltage,
      onHours: estimatedOnHours,
      deviceModel: deviceModel,
      deviceBrand: deviceBrand,
      isActive: true,
      createdOn: new Date(),
      userId: Math.floor(Math.random() * 100) + 1,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log("API response:", result);

      // Clear the form fields
      setDeviceType("");
      setDeviceBrand("");
      setDeviceModel("");
      setPower("");
      setVoltage("");
      setEstimatedOnHours("");

      // Display a toast message
      showToast("Device successfully added!");
    } catch (error) {
      console.error("Error:", error.message);
      showToast("Error adding device. Please try again.");
    }
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
            <TouchableOpacity
              style={styles.submitButton}
              onPress={addAppliance}>
              <CustomSubmit
                buttonFunction={() => addAppliance()}
                inlineStyle={{ color: "white" }}
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
  },
});
