import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

const ViewDevices = () => {
  const devices = [
    { name: "TV", voltage: "20v", power: "4W" },
    { name: "AC", voltage: "20v", power: "7W" },
    { name: "Oven", voltage: "4v", power: "6W" },
    { name: "20v 4W", voltage: "5v", power: "5W" },
    { name: "Washing machine", voltage: "20V", power: "4W" },
    { name: "Fan", voltage: "20v", power: "8W" },
    { name: "Laptop", voltage: "20V", power: "1W" },
    { name: "Microwave", voltage: "20v", power: "2W" },
    { name: "Trimmer", voltage: "20v", power: "4W" },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceName}>{item.name}</Text>
      <Text style={styles.deviceVoltage}>{item.voltage}</Text>
      <Text style={styles.devicePower}>{item.power}</Text>
      <Text style={styles.deviceCost}>{item.cost}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  deviceContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20, // Adjust the marginBottom to create space between rows
    padding: 10,
    backgroundColor: "#186049",
    borderColor: "#000",
    height: heightPercentageToDP(20),
  },
  deviceName: {
    fontSize: 16,
    marginBottom: 4,
  },
  deviceVoltage: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  devicePower: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  deviceCost: {
    fontSize: 14,
    color: "#666",
  },
});

export default ViewDevices;
