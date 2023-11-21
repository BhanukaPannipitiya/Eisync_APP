import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "../pages/StarterPage";
import WelcomPage from "../pages/WelcomPage";
import StarterPage from "../pages/StarterPage";
import SignUpPage from "../pages/SignUpPage";
import OTPVerificationPage from "../pages/OTPVerificationPage";
import SignInPage from "../pages/SignInPage";
import CreateNewPasswordPage from "../pages/CreateNewPasswordPage";
import Home from "../pages/Home";
import Account from "../pages/Account";
import AddNewAppliance from "../pages/AddNewAppliance";
import CostEstimation from "../pages/CostEstimation";
import EnergyConsumeAnalysis from "../pages/EnergyConsumeAnalysis";
import MyGoals from "../pages/MyGoals";
import ViewCostEstimationHistory from "../pages/ViewCostEstimationHistory";
import AppNavigation from "./AuthNavigator";
import CustomDrawerContent from "../components/DrawerContent";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="StarterPage"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StarterPage" component={StarterPage} />
      <Stack.Screen name="Home" component={AppNavigation} headerShown={false} />
      <Stack.Screen name="WelcomPage" component={WelcomPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="OtpVerification" component={OTPVerificationPage} />
      <Stack.Screen name="SignIn" component={SignInPage} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="AddNewAppliance" component={AddNewAppliance} />
      <Stack.Screen name="CostEstimation" component={CostEstimation} />
      <Stack.Screen
        name="EnergyConsumeAnalysis"
        component={EnergyConsumeAnalysis}
      />
      <Stack.Screen name="MyGoals" component={MyGoals} />
      <Stack.Screen
        name="ViewCostEstimationHistory"
        component={ViewCostEstimationHistory}
      />
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPasswordPage}
      />
    </Stack.Navigator>
  );
}
