import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import NavigationBarBottom from "../components/NavigationBarBottom";
import BottomNav from "../components/NavigationBarBottom";
import Header from "../components/Header";
import CircularProgress from "react-native-circular-progress-indicator";
import { LineChart } from "react-native-chart-kit";
import CustomSubmit from "../components/CustomSubmitButton";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";
import { REACT_APP_BASE_URL } from "@env";

const Home = () => {
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation();
  const [energyUsed, setEnergyUsed] = useState(0);
  const [activeDevices, setActiveDevices] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllActiveAppliances(userId);
        console.log("data",data)
        setEnergyUsed(data.totalPower);
        setActiveDevices(data.activeDeviceCount);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]); // Include userId as a dependency to re-fetch data when userId changes

  const addNewDevice = () => {
    navigation.navigate("addDevices");
  };

  const getAllActiveAppliances = async (userId) => {
    try {
      const apiUrl = `${REACT_APP_BASE_URL}/getAllActiveAppliances/?id=${userId}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("respomse",response)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching appliances:", error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Welcome <Text style={styles.subHeading}>Bhanuka</Text>
          </Text>
          <Image
            source={require("../assets/profpic.png")}
            style={styles.profileIcon}
          />
        </View>
        <View style={styles.Maincontainer}>
          <View style={styles.energyUsedConatiner}>
            <View style={styles.energyUSed}>
              <Text style={styles.insideText}>Energy Used</Text>
              <View>
                <CircularProgress
                  value={energyUsed}
                  radius={50}
                  inActiveStrokeOpacity={1}
                  activeStrokeWidth={15}
                  inActiveStrokeWidth={20}
                  progressValueStyle={{
                    fontWeight: "500",
                    color: "white",
                    fontSize: 20,
                  }}
                  activeStrokeSecondaryColor="#186049"
                  inActiveStrokeColor="#fff"
                  duration={5000}
                  dashedStrokeConfig={{
                    count: 50,
                    width: 4,
                  }}
                  valueSuffix={"w"}
                />
              </View>
            </View>
            <View style={styles.goal}>
              <Text style={styles.insideText}>Active Devices</Text>
              <View>
                <CircularProgress
                  value={activeDevices}
                  radius={50}
                  duration={2000}
                  progressValueColor={"#fff"}
                  maxValue={100}
                  titleColor={"#fff"}
                  titleStyle={{ fontWeight: "bold" }}
                  valueSuffix={""}
                />
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.headingContainerinner}>
          <Text style={styles.headinginner}>
            Check <Text style={styles.subHeadinginner}>Usage</Text>
          </Text>
        </View> */}
        {/* <View style={styles.graph}>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={350} // from react-native
            height={300}
            yAxisLabel=""
            yAxisSuffix="LKR"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#186049",
              backgroundGradientFrom: "#186049",
              backgroundGradientTo: "#4ECCA3",
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 15,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fff",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View> */}
        <View style={styles.button}>
          <CustomSubmit
            buttonFunction={addNewDevice}
            inlineStyle={{ color: "white" }}
            submitText={"Add an appliance"}
            backgroundColor={"#4ECCA3"}
            style={styles.submitButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
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
  energyUsedConatiner: {
    flexDirection: "row",
    borderRadius: 10,
    height: 200,
    width: 350,
  },
  energyUSed: {
    flex: 1,
    backgroundColor: "#4ECCA3",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  goal: {
    flex: 1,
    backgroundColor: "#186049",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  Maincontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginRight: 20,
  },
  insideText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins",
    marginBottom: 10,
  },
  headingContainerinner: {
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 20,
  },
  headinginner: {
    fontSize: 20,
    fontWeight: "normal",
    fontFamily: "Poppins",
    color: "#000000",
  },
  subHeadinginner: {
    color: "#4ECCA3",
  },
  graph: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    marginTop: 50,
    alignItems: "center",
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginLeft: 10,
    borderColor: "#4ECCA3",
    borderWidth: 2,
  },
});
