import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, Alert, } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../reducer/ActionCreator";
import { Button } from "react-native-paper";
import stylesInputs from "./styles/inputs/s";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as LocalAuthentication from "expo-local-authentication";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { active } = useSelector(state => state.huella)
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };
  const dispatch = useDispatch();
  const { USER } = api;

  const [error, setError] = useState("");

  // Descomentar esta funcion en dia de la demo
  const AuthWithFinger = async () => {
    if (state.email !== "" && !state.password !== "") {
      const res = await LocalAuthentication.hasHardwareAsync();
      if (!res) {
        return Alert.alert("Su dispositivo no soporta los metodos de login");
      }
      const autorization = await LocalAuthentication.supportedAuthenticationTypesAsync({});
      if (!autorization) return Alert.alert("No autorizado");
      const huella = await LocalAuthentication.isEnrolledAsync();
      if (!huella) return Alert.alert("No tiene autorizacion");
      const login = await LocalAuthentication.authenticateAsync({
        promptMessage: "Ingrese su huella por favor"
      });
      if (login.success) {
        axios
          .post(`https://walletfly.glitch.me/users/login`, state)
          .then(({ data }) => {
            dispatch({
              type: USER,
              payload: data,
            });
          })
          .catch((err) => alert(`Error! ${err}`));
      }
    } else {
      Alert.alert("Complete todos los campos por favor")
    }
  }
  const validateUser = () => {
    if (state.email === "" || state.password === "") {
      Alert.alert("Complete todos los campos por favor")
    } else {
      axios
        .post(`https://walletfly.glitch.me/users/login`, state)
        .then(({ data }) => {
          dispatch({
            type: USER,
            payload: data,
          });
        })
        .catch((err) => alert(`Error! ${err}`));
    }
  }
  const validateUserLogin = () => {
    active ? AuthWithFinger() : validateUser()  
  };

  useEffect(() => {
    if (!state.password || !state.email) {
      setError("Este campo es obligatorio");
    } else {
      setError(null);
    }
  }, [state, setError]);



  return (
    <View style={s.container}>
      <Text style={s.text}>Email</Text>
      <View style={s.containerInput}>
        <MaterialCommunityIcons name="account-outline" size={20} />
        <TextInput
          style={stylesInputs.inputsLogin}
          placeholder="Ingrese su Email"
          onChangeText={(value) => handleTextChange("email", value)}
        />
      </View>
      {!state.email && <Text style={s.error}>{error}</Text>}
      <Text style={s.text}>Contraseña</Text>
      <View style={s.containerInput}>
        <MaterialCommunityIcons name="lock-outline" size={20} />
        <TextInput
          style={stylesInputs.inputsLogin}
          placeholder="Ingrese su Contraseña"
          secureTextEntry={true}
          onChangeText={(value) => handleTextChange("password", value)}
        />
      </View>
      {!state.password && <Text style={s.error}>{error}</Text>}

      <Button
        style={{ marginTop: 20 }}
        mode="contained"
        onPress={() => validateUserLogin()}
      >
        Ingresar
        </Button>
      <Text style={{ textAlign: "center", marginTop: 10 }}>
        ¿Olvidaste tu contraseña?{" "}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 13,
    color: "#999",
    marginLeft: 10,
    marginTop: 10,
  },
  containerInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  error: {
    color: "#cB3065",
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 10,
  },
});
