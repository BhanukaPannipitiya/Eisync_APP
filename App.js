import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./src/routings";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    Poppins: require("./src/assets/fonts/Poppins-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return <AppNavigation />;
}
