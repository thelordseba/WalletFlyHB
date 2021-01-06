import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function Modelo({ title, icon }) {
  return (
    <View style={s.container}>
      <Text
        style={{ fontSize: 14, fontFamily: "Bree-Serif", color: "#ffffff" }}
      >
        {title}
      </Text>
      <MaterialCommunityIcons
        name={`arrow-${icon ? "up" : "down"}-drop-circle-outline`}
        size={30}
        color={"#ffffff"}
      />
    </View>
  );
}
export function ModeloDrop({ text }) {
  return (
    <View style={s.containerDrop}>
      <Text style={{ color: "#ffffff", fontFamily: "OpenSans-Regular" }}>
        {text}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#F23B6C",
    padding: 10,

    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#cB3065",
  },
  containerDrop: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#cB3065",

    padding: 10,
    marginBottom: 5,
  },
});
