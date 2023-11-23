// AppNavigation.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import DrawerNavigator from "./DrawerNavigator";

const AppNavigation = () => {
  return (
      <StackNavigator />
  );
};

export default AppNavigation;