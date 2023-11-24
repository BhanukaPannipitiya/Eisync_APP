import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

const ViewDevices = () => {
  const [appliances, setAppliances] = useState([]);

  useEffect(() => {
    fetchAppliances();
  }, []);

  const fetchAppliances = async () => {
    try {
      const response = await fetch(
        "http://192.168.8.164:3000/getAllAppliances"
      );
      const data = await response.json();
      setAppliances(data);
    } catch (error) {
      console.error("Error fetching appliances:", error);
    }
  };

  const renderItem = ({ item, index }) => {
    if (index === 0){
      return (
        <TouchableOpacity style={styles.addDevice} key="addButton">
        <Ionicons name="add-circle-outline" size={100} color="#4ECCA3" />  
      </TouchableOpacity>
      )
    }
    

    return (
     
      <View style={styles.deviceContainer} key={item._id}>
        <Text style={styles.deviceName}>{item.deviceType}</Text> 
        <Text style={styles.deviceVoltage}>{item.voltage}</Text>
        <Text style={styles.devicePower}>{item.power}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          Your <Text style={styles.subHeading}>Devices</Text>
        </Text>
      </View>
     
      {appliances.length === 0 ? (
        <View style={styles.noDevicesContainer}>
          <Text style={styles.noDevicesText}>No devices found</Text>
        </View>
      ) : null}

      <FlatList
        data={appliances}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 10,
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
  container: {
    flex: 1,
    paddingTop: 22,
  },
  addDevice: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    padding: 10,
    borderColor: "#000",
    height: heightPercentageToDP(20),
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  noDevicesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDevicesText: {
    fontSize: 18,
    color: "#000",
  },
  deviceContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#186049",
    borderColor: "#000",
    height: heightPercentageToDP(20),
    borderRadius: 10,
    backgroundColor: "#186049",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  deviceName: {
    fontSize: 16,
    marginBottom: 4,
    color: "#FFF",
  },
  deviceVoltage: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 4,
  },
  devicePower: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 4,
  },
  deviceCost: {
    fontSize: 14,
    color: "#FFF",
  },
});

export default ViewDevices;
