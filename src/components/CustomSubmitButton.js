import React from "react";
import { View, Text, Pressable } from "react-native";
import StyleSheet from "react-native-media-query";
import { heightPercentageToDP } from "react-native-responsive-screen";
const CustomSubmit = ({
  submitText,
  buttonFunction,
  backgroundColor,
  borderColor,
  inlineStyle,
}) => {
  const { styles } = StyleSheet.create({
    submitButton: {
      "@media (max-width: 1600px) and (min-width: 800px)": {
        width: 350,
        height: 50,
        borderRadius: 20,
      },

      "@media (max-width: 799px)": {
        width: 300,
        height: 50,
        borderRadius: 20,
      },
      backgroundColor: backgroundColor,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderColor: borderColor ? borderColor : "none",
      borderWidth: borderColor ? 1 : 0,
    },

    submitText: {
      textAlign: "center",
      color: "#E92F17",
      fontSize: heightPercentageToDP(2),
    fontWeight: "bold",
      fontFamily: "poppins",
    },
  });

  return (
    <View>
      <Pressable onPress={buttonFunction} style={[styles.submitButton]}>
        <Text style={[styles.submitText, inlineStyle]}>{submitText}</Text>
      </Pressable>
    </View>
  );
};

export default CustomSubmit;
