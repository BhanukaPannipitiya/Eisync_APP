import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Account from "../pages/Account";
import AddNewAppliance from "../pages/AddNewAppliance";
import CostEstimation from "../pages/CostEstimation";
import EnergyConsumeAnalysis from "../pages/EnergyConsumeAnalysis";
import MyGoals from "../pages/MyGoals";
import ViewCostEstimationHistory from "../pages/ViewCostEstimationHistory";
import {
  DrawerNavigator,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import MainStack from "./MainStack";
import DrawerContent from "../components/DrawerContent";
import Home from "../pages/Home";
import { heightPercentageToDP } from "react-native-responsive-screen";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  SimpleLineIcons,
  Feather,
} from "@expo/vector-icons";
import BottomTabNavigator from "./BottomTabNavigator";

const Drawer = createDrawerNavigator();
const AppNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: heightPercentageToDP(30),
        },
        drawerActiveBackgroundColor: "#fff",
        drawerActiveTintColor: "#186049",
        drawerInactiveBackgroundColor: "#fff",
        drawerInactiveTintColor: "#000",
      }}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Homedrawer"
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ focused, size }) => (
            <Ionicons name="home" size={20} color="#000" />
          ),
        }}
        component={Home}
        drawerIcon={() => <Ionicons name="home" size={30} color="#000" />}
      />
      {/* <Drawer.Screen name="Drawer b" component={BottomTabNavigator} /> */}
      <Drawer.Screen
        name="Account"
        options={{
          drawerLabel: "Account",
          drawerIcon: ({ focused, size }) => (
            <FontAwesome name="user" size={20} color="#000" />
          ),
        }}
        component={Account}
      />
      <Drawer.Screen
        name="Add New Appliance"
        options={{
          drawerLabel: "Add New Appliance",
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="add-to-queue" size={20} color="#000" />
          ),
        }}
        component={AddNewAppliance}
      />
      <Drawer.Screen
        name="Cost Estimation"
        options={{
          drawerLabel: "Cost Estimation",
          drawerIcon: ({ focused, size }) => (
            <FontAwesome name="dollar" size={20} color="#000" />
          ),
        }}
        component={CostEstimation}
      />
      <Drawer.Screen
        name="Energy Consume Analysis"
        options={{
          drawerLabel: "Energy Consume Analysis",
          drawerIcon: ({ focused, size }) => (
            <SimpleLineIcons name="energy" size={20} color="#000" />
          ),
        }}
        component={EnergyConsumeAnalysis}
      />
      <Drawer.Screen
        name="My Goals"
        options={{
          drawerLabel: "Energy Consume Analysis",
          drawerIcon: ({ focused, size }) => (
            <Feather name="target" size={20} color="#000" />
          ),
        }}
        component={MyGoals}
      />
      <Drawer.Screen
        name="View Cost Estimation History"
        options={{
          drawerLabel: "Energy Consume Analysis",
          drawerIcon: ({ focused, size }) => (
            <FontAwesome name="history" size={20} color="#000" />
          ),
        }}
        component={ViewCostEstimationHistory}
      />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    height: heightPercentageToDP(5),
    width: heightPercentageToDP(5),
  },
});
export default AppNavigation;
