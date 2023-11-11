import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackView,
} from "@react-navigation/native-stack";
import HomeScreen from "../pages/StarterPage";
import WelcomPage from "../pages/WelcomPage";
import StarterPage from "../pages/StarterPage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomPage"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StarterPage" component={StarterPage} />
        <Stack.Screen name="WelcomPage" component={WelcomPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="SignIn" component={SignInPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
