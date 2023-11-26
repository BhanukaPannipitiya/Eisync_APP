import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomfiledwithDateButton from "../components/CustomfiledwithDateButton";
import CustomSubmit from "../components/CustomSubmitButton";
import AuthContext from "../context/AuthContext";

const CostEstimation = ({ navigation }) => {
  const { userId } = useContext(AuthContext);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [currencyType, setCurrencyType] = useState("");
  const [fixedUnits, setFixedUnits] = useState([]);
  const [devices, setDevices] = useState([
    // { name: "Washing machine", power: "2", activeHour: "200" },
    // { name: "Tv", power: "3", activeHour: "210" },
    // { name: "Laptop", power: "4", activeHour: "30" },
    // { name: "Fan", power: "4", activeHour: "220" },
    // { name: "A / C", power: "2", activeHour: "30" },
  ]);
  const [fixPrice, setFixPrice] = useState("");
  const [costPerUnit, setCostPerUnit] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [calculatePressed, setCalculatePressed] = useState(false);

  useEffect(() => {
    // Fetch devices from the database when the component mounts
    fetchDevicesFromDatabase();
  }, [userId]);

  const fetchDevicesFromDatabase = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint
      const response = await fetch(
        `http://192.168.8.164:3000/getAllAppliances/?id=${userId}`
      );
      const data = await response.json();
      console.log(data);
      const deviceList = data.map((device) => ({
        name: device.deviceType || "", // If name is null or undefined, default to an empty string
        power: device.power || 0, // If power is null or undefined, default to 0
        activeHour: device.onHours !== null ? device.onHours : 0, // If activeHour is null, default to 0
      }));
      // Assuming the response data is an array of devices
      console.log("first", deviceList);
      setDevices(deviceList);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };
  const renderItem = ({ item, index }) => (
    <View style={styles.deviceItem}>
      <View style={styles.deviceRow}>
        <Text style={styles.deviceHeading}>Device Name: </Text>
        <Text style={styles.deviceValue}>{item.name}</Text>
      </View>
      <View style={styles.deviceRow}>
        <Text style={styles.deviceHeading}>Power Consumption: </Text>
        <TextInput
          style={styles.inputDevice}
          keyboardType="numeric"
          placeholder="Power"
          value={item.power ? item.power.toString() : ""}
          onChangeText={(text) => handleDeviceChange(index, "power", text)}
        />
      </View>
      <View style={styles.deviceRow}>
        <Text style={styles.deviceHeading}>Active Hours: </Text>
        <TextInput
          style={styles.inputDevice}
          keyboardType="numeric"
          placeholder="Active Hour"
          value={item.activeHour ? item.activeHour.toString() : ""}
          onChangeText={(text) => handleDeviceChange(index, "activeHour", text)}
        />
      </View>
      <TouchableOpacity onPress={() => removeDevice(index)}>
        <Text style={styles.removeDeviceText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const handleDeviceChange = (index, property, value) => {
    const updatedDevices = [...devices];
    updatedDevices[index][property] = value;
    setDevices(updatedDevices);
  };

  const removeDevice = (index) => {
    const updatedDevices = [...devices];
    updatedDevices.splice(index, 1);
    setDevices(updatedDevices);
  };

  const addDevice = () => {
    const newDevice = { name: "New Device", power: "0", activeHour: "0" };
    setDevices([...devices, newDevice]);
  };

  const addFixedCharge = () => {
    const newFixedCharge = { from: "", to: "", costPerUnit: "" };
    setFixedUnits([...fixedUnits, newFixedCharge]);
    setCostPerUnit([...costPerUnit, ""]);
  };
  const removeFixedCharge = (index) => {
    const updatedFixedUnits = [...fixedUnits];
    updatedFixedUnits.splice(index, 1);
    setFixedUnits(updatedFixedUnits);
  };

  const handleFixedChargeChange = (index, field, value) => {
    const updatedFixedUnits = [...fixedUnits];
    updatedFixedUnits[index][field] = value;
    setFixedUnits(updatedFixedUnits);
  };

  const handleCostPerUnitChange = (index, value) => {
    const updatedCostPerUnit = [...costPerUnit];
    updatedCostPerUnit[index] = value;
    setCostPerUnit(updatedCostPerUnit);
    const updatedFixedUnits = [...fixedUnits];
    updatedFixedUnits[index].costPerUnit = value;
    setFixedUnits(updatedFixedUnits);
  };

  const saveEstimation = async () => {
    try {
      const response = await fetch("http://192.168.8.164:3000/saveEstimation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromDate,
          toDate,
          currencyType,
          devices,
          fixedUnits,
          fixPrice,
          costPerUnit,
          totalCost,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Estimation saved successfully:", result);
      toasstDisplay();
    } catch (error) {
      console.error("Error saving estimation:", error.message);
    }
  };

  const toasstDisplay = () => {
    ToastAndroid.showWithGravity(
      "Estimation saved successfully",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    navigation.navigate("Home");
  };
  const calculate = async () => {
    setCalculatePressed(true);

    try {
      const response = await fetch(
        "http://192.168.8.164:3000/calculateTotalCost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ devices, fixedUnits, fixPrice }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Total Bill:", result.totalBill.toFixed(2), "LKR");
      setTotalCost(result.totalBill.toFixed(2));
    } catch (error) {
      console.error("Error calculating total cost:", error.message);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>
                Cost <Text style={styles.subHeading}>Estimation</Text>
              </Text>
            </View>
            <View style={styles.TiimePeriodContainer}>
              <Text style={styles.headingTime}>
                Time <Text style={styles.subHeadingTime}>Period</Text>
              </Text>
              <View style={styles.dateContainer}>
                <CustomfiledwithDateButton
                  selectedDate={fromDate}
                  onDateChange={setFromDate}
                />
                <Text style={styles.to}>to</Text>
                <CustomfiledwithDateButton
                  selectedDate={toDate}
                  onDateChange={setToDate}
                />
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.subHeading}>
                  Your <Text style={styles.subHeadingText}>Active </Text>Device
                  List{" "}
                </Text>
                <TouchableOpacity onPress={addDevice}>
                  <Text style={styles.subHeadingText}> Add a new device+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.deviceList}>
                <FlatList
                  data={devices}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
              <Text style={styles.headingTime}>
                Customize your <Text style={styles.subHeadingTime}>energy</Text>{" "}
                rates
              </Text>
            </View>
          </View>

          <View style={styles.deviceList}>
            <View style={styles.headingContainer}>
              <Text style={styles.subHeading}>
                set your currency type{" "}
                <Text style={styles.subHeadingText}>LKR</Text>
              </Text>
            </View>
            <FlatList
              data={fixedUnits}
              renderItem={({ item, index }) => (
                <View style={styles.inputRowContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="From"
                    value={item.from}
                    onChangeText={(text) =>
                      handleFixedChargeChange(index, "from", text)
                    }
                  />
                  <Text>to</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="To"
                    value={item.to}
                    onChangeText={(text) =>
                      handleFixedChargeChange(index, "to", text)
                    }
                  />
                  <TextInput
                    style={styles.unitRangeCost}
                    placeholder="cost per unit"
                    value={costPerUnit[index]}
                    onChangeText={(text) =>
                      handleCostPerUnitChange(index, text)
                    }
                  />
                  <TouchableOpacity
                    style={styles.removeFixedCharge}
                    onPress={() => removeFixedCharge(index)}>
                    <Text style={styles.removeFixedChargeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity style={styles.addIcon} onPress={addFixedCharge}>
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
            <View style={styles.fixCharge}>
              <Text style={styles.subHeading}>Fixed Charges</Text>
              <TextInput
                style={styles.fixedUnits}
                placeholder=""
                value={fixPrice}
                onChangeText={(text) => setFixPrice(text)}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={calculate}>
            <CustomSubmit
              buttonFunction={() => calculate()}
              inlineStyle={{ color: "white" }}
              submitText={"Calculate"}
              backgroundColor={"#4ECCA3"}
              style={styles.submitButton}
            />
          </TouchableOpacity>

          {calculatePressed && (
            <View style={styles.calculationDetails}>
              <View style={styles.fromContainer}>
                <Text style={styles.CalculateText}>From</Text>
                <Text style={styles.CalculateText}>
                  {fromDate.toDateString()}
                </Text>
              </View>
              <View style={styles.toContainer}>
                <Text style={styles.CalculateText}>To</Text>
                <Text style={styles.CalculateText}>
                  {toDate.toDateString()}
                </Text>
              </View>
              <View style={styles.estimatedCostContainer}>
                <Text style={styles.CalculateText}>Estimated Cost </Text>
                <Text style={styles.CalculateText}>{totalCost}</Text>
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={calculate}>
                <CustomSubmit
                  buttonFunction={() => saveEstimation()}
                  inlineStyle={{ color: "white" }}
                  submitText={"Save Estimation"}
                  backgroundColor={"#4ECCA3"}
                  style={styles.submitButton}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 80,
    padding: 20,
  },
  headingContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
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
  headingTime: {
    fontSize: 20,
    fontWeight: "normal",
    fontFamily: "Poppins",
    color: "#000000",
    marginTop: 20,
  },
  subHeadingTime: {
    color: "#4ECCA3",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  subHeading: {
    color: "#000000",
  },
  subHeadingText: {
    color: "#4ECCA3",
  },
  deviceList: {
    marginBottom: 30,
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginTop: 20,
    padding: 20,
    width: "100%",
    height: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deviceItem: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#4ECCA3",
  },
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  deviceHeading: {
    fontWeight: "bold",
    marginRight: 5,
  },
  deviceValue: {
    flex: 1,
  },
  deviceName: {
    flexDirection: "column",
    fontSize: 12,
    fontWeight: "normal",
    fontFamily: "Poppins",
    color: "#000000",
  },
  deviceActiveHour: {
    flexDirection: "column",
    fontSize: 12,
    fontWeight: "normal",
    fontFamily: "Poppins",
    color: "#4ECCA3",
  },
  deviceNameContainer: {
    flexDirection: "column",
    marginRight: 50,
    paddingRight: 0,
  },
  devicePowerConatiner: {
    flexDirection: "column",
    marginLeft: 0,
    marginRight: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4ECCA3",
    padding: 2,
    borderRadius: 15,
    width: 60,
  },
  addIcon: {
    backgroundColor: "#4ECCA3",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  addText: {
    fontSize: 24,
    color: "#fff",
  },
  inputRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  fixedUnits: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderBottomColor: "#4ECCA3",
    padding: 2,
    width: 60,
    marginLeft: 50,
    marginRight: 20,
  },
  removeFixedCharge: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  removeFixedChargeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  removeDeviceText: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
  },
  fixCharge: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
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
  inputDevice: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderBottomColor: "#4ECCA3",
    padding: 2,
  },
  calculationDetails: {
    backgroundColor: "#186049",
    borderRadius: 15,
    marginTop: 20,
    padding: 20,
    width: "100%",
    height: "auto",
  },
  CalculateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fromContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  toContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  estimatedCostContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  unitRangeCost: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderBottomColor: "#4ECCA3",
    padding: 2,
  },
});

export default CostEstimation;
