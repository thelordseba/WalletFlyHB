import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialTopTabNavigator();
export default function Registro(props) {

  const [ account, setAccount ] = useState(true)

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontFamily: "Bree-Serif", fontSize: 14 },
          activeTintColor: "#F23B6C",
          inactiveTintColor: "#cB3065",
          indicatorStyle: { backgroundColor: "#ffffff", height: 45 },
          style: {
            boxShadow: "rgb(181 141 232 / 50%) 0px 1px 1px",
            backgroundColor: "#ffffff",
          },
        }}
      >
        <Tab.Screen name="Iniciar sesión" component={Login} />
        <Tab.Screen name="Registrarse" component={Register} />
      </Tab.Navigator>
      {account &&
        <View style={s.containerAgregar}>
          <View style={s.containerAgregar2}>
            <TouchableOpacity
              style={s.buttonRound}
              onPress={() => setAccount(!account)}
            >
              <Text>
                <MaterialCommunityIcons name="close" size={26} color="#f23b6c" />
              </Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 40, marginBottom: 10, color: "#cb3065", fontFamily: "OpenSans-Regular" }}>
              Email: Test@gmail.com
            </Text>
            <Text style={{ marginTop: 40, marginBottom: 10, color: "#cb3065", fontFamily: "OpenSans-Regular" }}>
              Password: Test1234567
            </Text>
          </View>
        </View>
      }
    </>
  );
}
const s = StyleSheet.create({
  containerAgregar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
  },
  containerAgregar2: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  buttonRound: {
    borderWidth: 2,
    borderColor: "#f23b6c",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginLeft: 'auto'
  },
})
