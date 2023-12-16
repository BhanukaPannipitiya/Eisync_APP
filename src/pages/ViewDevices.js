import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Alert,
} from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import ToggleSwitch from "toggle-switch-react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";
import { REACT_APP_BASE_URL } from "@env";

const ViewDevices = () => {
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation();
  const [appliances, setAppliances] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    fetchAppliances();
    getActiveDevices();
  }, [userId]);

  // console.log(userId);
  const fetchAppliances = async () => {
    console.log("userId before fetch:", userId);
    try {
      const response = await fetch(
        `${REACT_APP_BASE_URL}/getAllAppliances/?id=${userId}`
      );

      if (!response.ok) {
        console.error("Failed to fetch appliances:", response.statusText);
        return;
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log(data);

        // Map the devices to set initial localStatus
        const appliancesWithLocalStatus = data.map((appliance) => ({
          ...appliance,
          localStatus: appliance.deviceONStatus,
        }));

        setAppliances(appliancesWithLocalStatus);
      } else {
        console.error("Invalid response content type:", contentType);
      }
    } catch (error) {
      console.error("Error fetching appliances:", error);
    }
    console.log("userId after fetch:", userId);
  };

  const handleToggle = async (isOn, deviceId) => {
    console.log(`Device ${deviceId} status changed to ${isOn ? "on" : "off"}`);

    setAppliances((prevAppliances) =>
      prevAppliances.map((appliance) =>
        appliance._id === deviceId
          ? { ...appliance, localStatus: isOn }
          : appliance
      )
    );

    // Additional logic to update backend status if needed
    try {
      const response = await fetch(
        `${REACT_APP_BASE_URL}/updateDeviceOnHours`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceId,
            status: isOn ? "on" : "off",
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to update device status");
      }
    } catch (error) {
      console.error("Error updating device status:", error);
    }
  };

  const removeDevice = async (deviceId) => {
    try {
      // Additional logic to update backend and remove the device
      const response = await fetch(
        `${REACT_APP_BASE_URL}/removeDevice`, // Adjust the endpoint accordingly
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceId,
          }),
        }
      );

      if (response.ok) {
        // If the backend operation was successful, update the local state
        setAppliances((prevAppliances) =>
          prevAppliances.filter((appliance) => appliance._id !== deviceId)
        );

        // Close the modal after successfully removing the device
        closeModal();
      } else {
        console.error("Failed to remove device");
      }
    } catch (error) {
      console.error("Error removing device:", error);
    }
  };

  const handleTrashIconClick = (deviceId) => {
    Alert.alert(
      "Confirm Removal",
      "Are you sure you want to remove this device?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => removeDevice(deviceId),
        },
      ],
      { cancelable: false }
    );
  };
  const addDevice = () => {
    navigation.navigate("addDevices");
  };

  const openModal = (device) => {
    setSelectedDevice(device);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const getActiveDevices = () => {
    return appliances.filter((appliance) => appliance.isActive);
  };

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <TouchableOpacity
          style={styles.addDevice}
          key="addButton"
          onPress={addDevice}>
          <Ionicons name="add-circle-outline" size={100} color="#4ECCA3" />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => openModal(item)}>
        <View style={styles.deviceContainer} key={item._id}>
          <View style={styles.deviceIconContainer}>
            <Text style={styles.deviceName}>{item.deviceType}</Text>
          </View>
          <View style={styles.deviceSpecContainer}>
            <View style={styles.deviceVoltageContainer}>
              <Ionicons name="flash" size={24} color="#7BF3FF" />
              <Text style={styles.deviceVoltage}>{item.voltage}</Text>
            </View>
            <View style={styles.deviceCurrentContainer}>
              <Ionicons name="pulse" size={24} color="#7BF3FF" />
              <Text style={styles.devicePower}>{item.power}</Text>
            </View>
          </View>
          <View style={styles.deviceToggleContainer}>
            <ToggleSwitch
              isOn={item.localStatus}
              onColor="#7BF3FF"
              offColor="red"
              label="Device Status"
              labelStyle={{ color: "#fff" }}
              size="small"
              onToggle={(isOn) => handleToggle(isOn, item._id)}
            />
            <Ionicons
              name="ios-trash-bin-outline"
              size={24}
              color="#fff"
              style={styles.trash}
              onPress={() => handleTrashIconClick(item._id)} // Handle trash icon click
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
          data={getActiveDevices()}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
        />

        {/* Modal for displaying device details */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedDevice && (
                <>
                  <Text style={styles.modalTitle}>Device Details</Text>
                  <View style={styles.modalItem}>
                    <Text style={styles.modalLabel}>Device Type:</Text>
                    <Text style={styles.modalValue}>
                      {selectedDevice.deviceType}
                    </Text>
                  </View>
                  <View style={styles.modalItem}>
                    <Text style={styles.modalLabel}>Device Brand:</Text>
                    <Text style={styles.modalValue}>
                      {selectedDevice.deviceBrand}
                    </Text>
                  </View>
                  <View style={styles.modalItem}>
                    <Text style={styles.modalLabel}>Device Model:</Text>
                    <Text style={styles.modalValue}>
                      {selectedDevice.deviceModel}
                    </Text>
                  </View>
                  <View style={styles.modalItem}>
                    <Text style={styles.modalLabel}>Power:</Text>
                    <Text style={styles.modalValue}>
                      {selectedDevice.power}
                    </Text>
                  </View>
                  <View style={styles.modalItem}>
                    <Text style={styles.modalLabel}>Voltage:</Text>
                    <Text style={styles.modalValue}>
                      {selectedDevice.voltage}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeModal}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
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
    marginTop: 10,
    marginRight: 1,
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
    marginLeft: 7,
    marginRight: 0,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
  },
  modalContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
    height: "auto",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalLabel: {
    fontWeight: "bold",
  },
  modalValue: {
    marginLeft: 10,
  },
  closeButton: {
    backgroundColor: "#4ECCA3",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ViewDevices;
