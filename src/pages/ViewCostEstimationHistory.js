import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AuthContext from "../context/AuthContext";
import {REACT_APP_BASE_URL} from "@env";

const ViewCostEstimationHistory = () => {
  const { userId } = useContext(AuthContext); // Get user ID from context

  const [estimations, setEstimations] = useState([]);

  const fetchEstimations = async () => {
    try {
      // Fetch estimations for the specific user ID (replace 'your-api-endpoint' with the actual API endpoint)
      const response = await fetch(
        `${REACT_APP_BASE_URL}/getAllEstimationsByUserId/?id=${userId}`
      );
      const data = await response.json();
      setEstimations(data);
    } catch (error) {
      console.error("Error fetching estimations:", error.message);
    }
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };
  console.log("estimations", estimations);

  useEffect(() => {
    // Fetch estimations when the component mounts
    fetchEstimations();
  }, []); // Re-run the effect when the user ID changes

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>
          View Cost{" "}
          <Text style={styles.headingAlternate}>Estimation History</Text>
        </Text>
      </View>
      <Image
        source={require("../assets/costEstimationHostory.png")}
        style={styles.ImageContainer}
      />
      <View style={styles.subHeading}>
        <TouchableOpacity>
          <Text style={styles.subHeadingText}>create a new estimation+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.HeadingsContainer}>
        <Text style={styles.headingText}>From Date</Text>
        <Text style={styles.headingText}>To Date</Text>
        <Text style={styles.headingText}>Cost</Text>
        <Text style={styles.headingText}>View</Text>
      </View>
      {/* here is the container for rendered estimations */}
      <View style={styles.estimationContainer}>
        {estimations.map((estimation, index) => (
          <View key={index} style={styles.singleEstimation}>
            <Text style={styles.estimationText}>
              {formatDate(estimation.fromDate)}
            </Text>
            <Text style={styles.estimationText}>
              {formatDate(estimation.toDate)}
            </Text>
            <Text style={styles.estimationText}>
              {estimation.estimatedCost}
            </Text>
            <TouchableOpacity>
              <Ionicons name="eye" size={24} color="#186049" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ViewCostEstimationHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  heading: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#000000",
  },
  subHeading: {
    flexDirection: "row",
    marginTop: 10,
    marginRight: 20,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    right: 0,
  },
  subHeadingText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#4ECCA3",
  },
  headingAlternate: {
    color: "#4ECCA3",
  },
  ImageContainer: {
    marginTop: 40,
    marginLeft: 20,
  },
  HeadingsContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  headingText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#186049",
  },
  estimationContainer: {
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
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
  singleEstimation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#4ECCA3",
    borderRadius: 20,
    padding: 5,
  },
  estimationText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#186049",
  },
});
