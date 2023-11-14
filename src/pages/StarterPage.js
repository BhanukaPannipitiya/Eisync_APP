import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const StarterPage = () => {
  const navigation = useNavigation();
  const navigate = () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>
          Lets get you <Text style={styles.highlighText}>onboard!</Text>
        </Text>
      </View>
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingText}>
          Finish setting up your account and start saving energy instantly.
        </Text>
      </View>
      <View>
        <Image source={require("../assets/wind.png")} />
      </View>
      <View style={styles.forward}>
        <TouchableOpacity onPress={navigate}>
          <Image source={require("../assets/Forward.png")} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StarterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    marginTop: heightPercentageToDP(5),
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    marginTop: heightPercentageToDP(10),
    marginLeft: widthPercentageToDP(10),
    marginRight: widthPercentageToDP(10),
    fontSize: heightPercentageToDP(4),
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  highlighText: {
    color: "#4ECCA3",
  },
  subHeading: {
    marginTop: heightPercentageToDP(1),
    alignItems: "center",
    justifyContent: "center",
  },
  subHeadingText: {
    color: "#696565",
    fontFamily: "Poppins",
    fontSize: heightPercentageToDP(2),
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: heightPercentageToDP(3),
    marginLeft: widthPercentageToDP(8),
    marginRight: widthPercentageToDP(8),
  },
  forward: {
    marginTop: heightPercentageToDP(5),
  },
});
