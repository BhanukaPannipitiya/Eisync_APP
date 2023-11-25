import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomfiledwithDateButton = ({ selectedDate, onDateChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedDateText, setSelectedDateText] = useState("");

  const toggleDatePicker = () => {
    setOpen(!open);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      onDateChange(currentDate); // Invoke the callback function
      setSelectedDateText(currentDate.toISOString().split("T")[0]);
    }
    toggleDatePicker();
  };

  return (
    <View style={styles.parentContainer}>
      {open && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={selectedDate}
          onChange={onChange}
        />
      )}
      <TouchableOpacity style={styles.dateIcon} onPress={() => setOpen(true)}>
        <Pressable>
          <TextInput
            style={styles.input}
            value={selectedDateText}
            editable={false}
          />
        </Pressable>
        <Ionicons name="calendar-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingRight: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    width: widthPercentageToDP(35),
    height: heightPercentageToDP(3.5),
    borderWidth: 1,
    borderColor: "#4ECCA3",
  },
  dateIcon: {
    flexDirection: "row",
    position: "absolute",
    right: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default CustomfiledwithDateButton;
