// DrawerNavigator.js
import React from "react";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import AppNavigation from "./AppNavigation";
import Account from "../pages/Account";
import AddNewAppliance from "../pages/AddNewAppliance";
import CostEstimation from "../pages/CostEstimation";
import EnergyConsumeAnalysis from "../pages/EnergyConsumeAnalysis";
import MyGoals from "../pages/MyGoals";
import ViewCostEstimationHistory from "../pages/ViewCostEstimationHistory";
import ViewDevices from "../pages/ViewDevices";
import StackNavigator from "./StackNavigator";
import Home from "../pages/Home";
import BottomNav from "../components/NavigationBarBottom";
import BottomTabNavigator from "./BottomTabNavigator";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawerContent from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    drawerContent={props =><CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#4ECCA3",
        drawerInactiveTintColor: "black",
      }}>
      <Drawer.Screen
        name="HomeDrawer"
        component={BottomTabNavigator}
        options={{
          headerTitle: "Home",
          drawerLabel: "Home",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "ios-home-sharp" : "ios-home-outline"}
              size={size}
              color={color}
            />
          ),
          drawerLabelStyle: {
            fontFamily: "Poppins",
            fontWeight: "bold",
            marginLeft: -15,
          },
        }}
      />
      <Drawer.Screen
        name="AccountDrawer"
        component={Account}
        options={{
          headerTitle: "Account",
          drawerLabel: "Account",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person-circle-sharp" : "person-circle-outline"}
              size={size}
              color={color}
            />
          ),
          drawerLabelStyle: {
            fontFamily: "Poppins",
            fontWeight: "bold",
            marginLeft: -15,
          },
        }}
      />
      <Drawer.Screen
        name="AddNewApplianceDrawer"
        component={AddNewAppliance}
        options={{
          headerTitle: "Add New Appliance",
          drawerLabel: "Add New Appliance",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "add-circle-sharp" : "add-circle-outline"}
              size={size}
              color={color}
            />
          ),
          drawerLabelStyle: {
            fontFamily: "Poppins",
            fontWeight: "bold",
            marginLeft: -15,
          },
        }}
      />
      <Drawer.Screen
        name="CostEstimationDrawer"
        component={CostEstimation}
        options={{
          headerTitle: "Cost Estimation",
          drawerLabel: "Cost Estimation",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "cash-sharp" : "cash-outline"}
              size={size}
              color={color}
            />
          ),
          drawerLabelStyle: {
            fontFamily: "Poppins",
            fontWeight: "bold",
            marginLeft: -15,
          },
        }}
      />
      <Drawer.Screen
        name="EnergyConsumeAnalysisDrawer"
        component={EnergyConsumeAnalysis}
        options={{
          headerTitle: "Energy Consume Analysis",
          drawerLabel: "Energy Consume Analysis",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "flash-sharp" : "flash-outline"}
              size={size}
              color={color}
            />
          ),
          drawerLabelStyle: {
            fontFamily: "Poppins",
            fontWeight: "bold",
            marginLeft: -15,
          },
        }}
      />
      <Drawer.Screen
        name="MyGoalsDrawer"
        component={MyGoals}
        options={{
          headerTitle: "My Goals",
          drawerLabel: "My Goals",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "bar-chart-sharp" : "bar-chart-outline"}
              size={size}
              color={color}
            />
          ),
          drawerLabelStyle: {
            fontFamily: "Poppins",
            fontWeight: "bold",
            marginLeft: -15,
          },
        }}
      />
      <Drawer.Screen
        name="ViewCostEstimationHistoryDrawer"
        component={ViewCostEstimationHistory}
        options={{
          headerTitle: "View Cost Estimation History",
          drawerLabel: "View Cost Estimation History",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "time-sharp" : "time-outline"}
              size={size}
              color={color}
            />
          ),
          drawerLabelStyle: {
            fontFamily: "Poppins",
            fontWeight: "bold",
            marginLeft: -15,
          },
        }}
      />
      <Drawer.Screen
        name="ViewDevicesDrawer"
        component={ViewDevices}
        options={{
          headerTitle: "View Devices",
          drawerLabel: "View Devices",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "list-sharp" : "list-outline"}
              size={size}
              color={color}
            />
          ),
          drawerLabelStyle: {
            fontFamily: "Poppins",
            fontWeight: "bold",
            marginLeft: -15,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
