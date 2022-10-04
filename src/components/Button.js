import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Button({ title, onPress, customStyles }) {
  return (
    <View>
      <TouchableOpacity style={[styles.button, customStyles]} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 165,
    height: 45,
    backgroundColor: "#FFE600",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
});
