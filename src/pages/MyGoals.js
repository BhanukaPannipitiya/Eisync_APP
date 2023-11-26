import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import ToggleSwitch from "toggle-switch-react-native";
import { useNavigation } from "@react-navigation/native";
import CircularProgress from "react-native-circular-progress-indicator";
import { REACT_APP_BASE_URL } from "@env";

const MyGoals = () => {
  const navigation = useNavigation();
  const [appliances, setAppliances] = useState([]);

  useEffect(() => {
    fetchAppliances();
  }, []);

  const fetchAppliances = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_BASE_URL}/getAllAppliances`
      );
      const data = await response.json();
      setAppliances(data);
    } catch (error) {
      console.error("Error fetching appliances:", error);
    }
  };
  const handleToggle = (isOn, deviceId) => {
    console.log(`Device ${deviceId} status changed to ${isOn ? "on" : "off"}`);
    setAppliances((prevAppliances) =>
      prevAppliances.map((appliance) =>
        appliance._id === deviceId
          ? { ...appliance, localStatus: isOn }
          : appliance
      )
    );
  };

  const handleAddGoals = () => {
    console.log("Add new device");
    navigation.navigate("AddGoal");
  };
  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <TouchableOpacity
          style={styles.addDevice}
          key="addButton"
          onPress={handleAddGoals}>
          <Ionicons name="add-circle-outline" size={100} color="#4ECCA3" />
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.deviceContainer} key={item._id}>
        <View>
          <CircularProgress
            value={60}
            radius={50}
            duration={2000}
            progressValueColor={"#ecf0f1"}
            maxValue={200}
            title={"KM/H"}
            titleColor={"white"}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.deviceName}>Goal Name</Text>
          <Ionicons
            name="ios-trash-bin-outline"
            size={24}
            color="#fff"
            style={styles.trash}
            onPress={() => handleTrashIconClick(item._id)} // Handle trash icon click
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          My <Text style={styles.subHeading}>Goals</Text>
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
    justifyContent: "center",
    alignItems: "center",
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
  deviceIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deviceSpecContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",

    alignItems: "center",
  },
  deviceVoltageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  deviceCurrentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  deviceToggleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  trash: {
    marginLeft: 20,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: widthPercentageToDP(40),
    marginTop: 20,
  },
});

export default MyGoals;
