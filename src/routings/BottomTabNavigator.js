// BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import CostEstimation from "../pages/CostEstimation";
import MyGoals from "../pages/MyGoals";
import AddNewAppliance from "../pages/AddNewAppliance";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import CustomTabBarButton from "../components/CustomTabBarButton";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeTab") {
            iconName = focused ? "ios-home-sharp" : "ios-home-outline";
          } else if (route.name === "CostEstimationTab") {
            iconName = focused ? "cash-sharp" : "cash-outline";
          } else if (route.name === "MyGoalsTab") {
            iconName = focused ? "flash-sharp" : "flash-outline";
          } else if (route.name === "AddNewApplianceTab") {
            iconName = focused ? "add-circle-sharp" : "add-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: "Home",
          // tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="CostEstimationTab"
        component={CostEstimation}
        options={{
          tabBarLabel: "Cost Estimation",
          // tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      {/* <Tab.Screen name="MyGoalsTab" component={MyGoals} options={{
        tabBarLabel: 'My Goals',
        // tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}/> */}
      <Tab.Screen
        name="AddNewApplianceTab"
        component={AddNewAppliance}
        options={{
          tabBarLabel: "Add New Appliance",
          // tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    elevation: 0,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    height: 60,
  },
});
export default BottomTabNavigator;
