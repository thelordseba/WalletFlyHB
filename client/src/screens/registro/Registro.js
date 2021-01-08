import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { Image } from 'react-native';

const Tab = createMaterialTopTabNavigator();
export default function Registro(props) {
  {
    /* Colocamos Logo o algo para decorar*/
  }
  const iconPng = require("../../images/Icon.png")
  return (
    <>
      <Image
        style={{
          width: "80%",
          height: 200,
          marginLeft: "auto",
          marginRight: "auto",
        }}
        source={iconPng}
      />
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
    </>
  );
}
