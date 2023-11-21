import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP } from "react-native-responsive-screen";

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.dashboardIcon}>
          <Ionicons
            name="menu"
            size={30}
            color="#000"
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Image
          source={require("../assets/splash.png")}
          style={styles.logoContainer}
        />
        <TouchableOpacity style={styles.notificationIcon}>
          <View style={styles.profileContainer}>
            <Image
              source={require("../assets/profpic.png")}
              style={styles.profileIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginTop: heightPercentageToDP(4),
    marginLeft: heightPercentageToDP(1),
    marginRight: heightPercentageToDP(1),
  },
  logoContainer: {
    height: heightPercentageToDP(5),
    width: heightPercentageToDP(5),
  },
  profileContainer: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#4ECCA3",
    height: heightPercentageToDP(5),
    width: heightPercentageToDP(5),
  },
  profileIcon: {
    borderRadius: 50,
    marginLeft: heightPercentageToDP(0.3),
    marginTop: heightPercentageToDP(0.1),
    height: heightPercentageToDP(4),
    width: heightPercentageToDP(4),
  },
});
