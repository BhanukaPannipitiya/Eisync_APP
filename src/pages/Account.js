import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomSubmit from "../components/CustomSubmitButton";
import { REACT_APP_BASE_URL } from "@env";
import AuthContext from "../context/AuthContext";

const Account = () => {
  const { userId } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
  useEffect(() => {
    // Make the API call to retrieve user details
    fetch(`${REACT_APP_BASE_URL}/getUserDetailsById/?id=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.userDetails) {
          const { name, phoneNumber, country } = data.userDetails;
          setName(name);
          setPhone(phoneNumber);
          setCountry(country);
        }
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userId]);

  

  const updateUser = async () => {
    try {
      // Replace 'your-api-url' with the actual API URL
      const apiUrl = `${REACT_APP_BASE_URL}/updateUserDetails/?id=${userId}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          name,
          phone,
          country,
        }),
      });

      const data = await response.json();

      console.log(data);
      showToast("User Updated Succssfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle the error, e.g., show an error message
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require("../assets/photo.png")}
          style={styles.photoContainer}
        />
        <View style={styles.details}>
          <Text style={styles.name}>Name</Text>
          <View style={styles.nameContainer}>
            <Ionicons name="person" size={24} color="black" />
            <TextInput
              style={styles.nameInput}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <Text style={styles.phone}>Phone</Text>
          <View style={styles.phoneContainer}>
            <Ionicons name="call" size={24} color="black" />
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter your phone"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
          <Text style={styles.address}>Country</Text>
          <View style={styles.countryContainer}>
            <Ionicons name="location" size={24} color="black" />
            <TextInput
              style={styles.addressInput}
              placeholder="Enter your country"
              value={country}
              onChangeText={(text) => setCountry(text)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={updateUser}>
          <CustomSubmit
            buttonFunction={updateUser}
            inlineStyle={{ color: "white" }}
            submitText={"Save "}
            backgroundColor={"#4ECCA3"}
            style={styles.submitButton}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    alignItems: "center",
  },
  photoContainer: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  details: {
    marginTop: 50,
    borderRadius: 10,
    height: 400,
    width: 400,
  },
  name: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    color: "#000",
  },
  email: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    color: "#000",
  },
  phone: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    color: "#000",
  },
  address: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    color: "#000",
  },
  nameInput: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#4ECCA3",
  },
  addressInput: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#4ECCA3",
  },
  phoneInput: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    width: 300,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#4ECCA3",
  },
  nameContainer: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  phoneContainer: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  countryContainer: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
