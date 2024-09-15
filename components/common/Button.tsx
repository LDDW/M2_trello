import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

interface ButtonProps {
  onPress: () => void;
  text: string;
  buttonStyle?: object;
  textStyle?: object;
}

export default function Button({
  onPress,
  buttonStyle,
  textStyle,
  text,
}: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#254EDB",
},
buttonText: {
    fontSize: 15,
    color: "white"
  },
});
