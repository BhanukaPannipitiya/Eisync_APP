import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomSubmit from "../components/CustomSubmitButton";

const Account = () => {
  const updateUser = () => {
    console.log("Update user");
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
            <TextInput style={styles.nameInput} placeholder="Enter your name" />
          </View>
            <Text style={styles.phone}>Phone</Text>
          <View style={styles.phoneContainer}>
            <Ionicons name="call" size={24} color="black" />
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter your phone"
            />
          </View>
            <Text style={styles.address}>Country</Text>
          <View style={styles.countryContainer}>
            <Ionicons name="location" size={24} color="black" />
            <TextInput
              style={styles.addressInput}
              placeholder="Enter your country"
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
