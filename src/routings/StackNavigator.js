// StackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StarterPage from "../pages/StarterPage";
import Home from "../pages/Home";
import AppNavigation from "./AppNavigation";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import ViewDevices from "../pages/ViewDevices";
import DrawerNavigator from "./DrawerNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerNavigator} options={{headerShown:false}} />
      <Stack.Screen name="StarterPage" component={StarterPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="SignIn" component={SignInPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
