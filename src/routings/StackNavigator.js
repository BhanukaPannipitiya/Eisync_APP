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
import AddNewAppliance from "../pages/AddNewAppliance";
import AddGoal from "../pages/AddGoal";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="StarterPage"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="StarterPage" component={StarterPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="SignIn" component={SignInPage} />
      <Stack.Screen name="addDevices" component={AddNewAppliance} />
      <Stack.Screen name="ViewDevices" component={ViewDevices} />
      <Stack.Screen name="AddGoal" component={AddGoal} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
