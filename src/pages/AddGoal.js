import React, { useState } from "react";
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
import { heightPercentageToDP } from "react-native-responsive-screen";
import CustomSubmit from "../components/CustomSubmitButton";
import ToggleSwitch from "toggle-switch-react-native";
import CustomfiledwithDateButton from "../components/CustomfiledwithDateButton";

const AddGoal = () => {
  const [goalName, setGoalName] = useState("");
  const [goal, setGoal] = useState("");
  const [goalType, setGoalType] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalDuration, setGoalDuration] = useState("");
  const [goalStartDate, setGoalStartDate] = useState("");
  const [goalEndDate, setGoalEndDate] = useState("");
  const [goalStatus, setGoalStatus] = useState("");
  const [goalProgress, setGoalProgress] = useState("");
  const [goalAchieved, setGoalAchieved] = useState("");
  const [goalAchievedDate, setGoalAchievedDate] = useState("");
  const [goalAchievedStatus, setGoalAchievedStatus] = useState("");
  const [goalAchievedDescription, setGoalAchievedDescription] = useState("");
  const [fromDate, setFromDate] = useState(new Date()); // Initialize with a default date
  const [toDate, setToDate] = useState(new Date()); // Initialize with a default date

  const handleFromDateSelect = (date) => {
    setFromDate(date);
  };

  const handleToDateSelect = (date) => {
    setToDate(date);
  };

  const addGoal = async () => {
    try {
      const formData = {
        goalName,
        startDate: fromDate,
        endDate: toDate,
        goalAmount: parseFloat(goal),
        isActive: true,
        status: "",
        alertOverUsage: goalStatus,
        userId: "your_user_id",
      };

      const response = await fetch("http://192.168.8.164:3000/createGoal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Goal added successfully:", data);
      // Add further actions based on the server response
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleToggle = (isOn, itemId) => {
    // Implement your logic to handle the toggle here
    console.log(`Toggle for item ${itemId} is ${isOn ? "ON" : "OFF"}`);
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              Set <Text style={styles.subHeading}>energy goal</Text>
            </Text>
          </View>
          <Image style={styles.image} source={require("../assets/goal.png")} />
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Goal Name"
              value={goalName}
              onChangeText={(text) => setGoalName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Goal (Kwh)"
              value={goal}
              onChangeText={(text) => setGoal(text)}
            />
            <View style={styles.datePickerContainer}>
              <CustomfiledwithDateButton onSelectDate={handleFromDateSelect} />
              <Text style={styles.datePickerText}>to</Text>
              <CustomfiledwithDateButton onSelectDate={handleToDateSelect} />
            </View>
          </View>
          <View style={styles.overContainer}>
            <Text style={styles.alert}>Alert over usage </Text>
            <ToggleSwitch
              isOn={goalStatus} // Assuming goalStatus is a boolean state
              onColor="#7BF3FF"
              offColor="red"
              label="Device Status"
              labelStyle={{ color: "#fff" }}
              size="small"
              onToggle={(isOn) =>
                handleToggle(
                  isOn /* Pass the unique identifier of the item here */
                )
              }
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={addGoal}>
            <CustomSubmit
              buttonFunction={() => addGoal()}
              inlineStyle={{ color: "white" }}
              submitText={"Set "}
              backgroundColor={"#4ECCA3"}
              style={styles.submitButton}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    marginTop: 20,
  },
  form: {
    width: "100%",
    padding: 20,
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
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
  overContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  alert: {
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Poppins",
    color: "#000000",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePickerText: {
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Poppins",
  },
});

export default AddGoal;
