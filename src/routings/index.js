import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackView,
} from "@react-navigation/native-stack";
import HomeScreen from "../pages/HomeScreen";
import WelcomPage from "../pages/WelcomPage";

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomPage"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WelcomPage" component={WelcomPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
