import React from "react";
import { Appbar } from "react-native-paper";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function PantallaWalletFly({ navigation }) {
  const iconPng = require("../../../images/Icon.png");

  return (
    <>
      <StatusBar
        backgroundColor="#f23b6c"
        barStyle={"light-content"}
        style={{ alignSelf: "center" }}
      />
      <View style={s.container}>
        <TouchableOpacity style={s.header}></TouchableOpacity>
        <LinearGradient
          colors={["#cb3065", "#F23B6C", "#F23B6C", "#F23B6C", "#cb3065"]}
          style={s.header}
        >
          <Image
            style={{
              marginTop: 150,
              width: 150,
              height: 150,
              marginBottom: 150,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            source={iconPng}
          />
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              color: "#ffffff",
              padding: 5,
              paddingBottom: 0,
              fontFamily: "Bree-Serif",
            }}
          >
            Bienvenido a WalletFly
          </Text>
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              color: "#ffffff",
              padding: 5,
              paddingTop: 0,
              fontFamily: "Bree-Serif",
            }}
          >
            La App bancaria más segura
          </Text>
          <View style={s.containerButton}>
            <LinearGradient
              colors={["#F23B6C", "#F23B6C", "#cb3065"]}
              style={s.buttonRelieve}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("WalletFly")}
              >
                <Text style={s.textRelieve}>COMENZAR</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  header: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    position: "absolute",
  },
  textRelieve: {
    textAlign: "center",
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "Bree-Serif",
  },
  buttonRelieve: {
    width: "50%",
    height: 40,
    alignSelf: "center",
    margin: 5,
    borderRadius: 10,
  },
  containerButton: {
    alignItems: "center",
    margin: 10,
  },
});
