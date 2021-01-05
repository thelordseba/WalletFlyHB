import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Button,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../reducer/ActionCreator";
import { Dialog, Paragraph, Appbar } from "react-native-paper";
import stylesInputs from "./styles/inputs/s";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { APP_API } from "../../../../env";
import * as LocalAuthentication from "expo-local-authentication";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { active } = useSelector((state) => state.huella);
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };
  const dispatch = useDispatch();
  const { USER } = api;

  const [error, setError] = useState("");

  const AuthWithFinger = async () => {
    if (state.email !== "" && !state.password !== "") {
      const res = await LocalAuthentication.hasHardwareAsync();
      if (!res) {
        return Alert.alert("Su dispositivo no soporta los metodos de login");
      }
      const autorization = await LocalAuthentication.supportedAuthenticationTypesAsync(
        {}
      );
      if (!autorization) return Alert.alert("No autorizado");
      const huella = await LocalAuthentication.isEnrolledAsync();
      if (!huella) return Alert.alert("No tiene autorizacion");
      const login = await LocalAuthentication.authenticateAsync({
        promptMessage: "Ingrese su huella por favor",
      });
      if (login.success) {
        axios
          .post(`http://${APP_API}/users/login`, state)
          .then(({ data }) => {
            dispatch({
              type: USER,
              payload: data,
            });
          })
          .catch((err) => alert(`Error! ${err}`));
      }
    } else {
      Alert.alert("Complete todos los campos por favor");
    }
  };

  const validateUser = () => {
    if (state.email === "" || state.password === "") {
      Alert.alert("Complete todos los campos por favor");
    } else {
      axios
        .post(`http://${APP_API}/users/login`, state)
        .then(({ data }) => {
          dispatch({
            type: USER,
            payload: data,
          });
        })
        .catch((err) => alert(`Error! ${err}`));
    }
  };
  const validateUserLogin = () => {
    active ? AuthWithFinger() : validateUser();
  };

  useEffect(() => {
    if (!state.password || !state.email) {
      setError("Este campo es obligatorio");
    } else {
      setError(null);
    }
  }, [state, setError]);
  return (
    <View style={stylesInputs.container}>
      <Text style={stylesInputs.inputsText}>Email</Text>
      <View style={stylesInputs.containerInput}>
        <MaterialCommunityIcons
          name="account-outline"
          color={"#f23b6c"}
          size={30}
          style={{ margin: "0.2rem" }}
        />
        <TextInput
          style={stylesInputs.inputsLogin}
          placeholder="Ingrese su Email"
          onChangeText={(value) => handleTextChange("email", value)}
        />
      </View>
      {!state.email && <Text style={stylesInputs.error}>{error}</Text>}
      <Text style={stylesInputs.inputsText}>Contraseña</Text>
      <View style={stylesInputs.containerInput}>
        <MaterialCommunityIcons
          name="lock-outline"
          color={"#f23b6c"}
          size={30}
          style={{ margin: "0.2rem" }}
        />
        <TextInput
          style={stylesInputs.inputsLogin}
          placeholder="Ingrese su Contraseña"
          secureTextEntry={true}
          onChangeText={(value) => handleTextChange("password", value)}
        />
      </View>
      {!state.password && <Text style={stylesInputs.error}>{error}</Text>}
      <Text style={stylesInputs.forgottenPassword}>
        ¿Olvidaste tu contraseña?
      </Text>

      <View style={stylesInputs.containerButton}>
        <TouchableOpacity
          style={stylesInputs.button}
          onPress={() => validateUser()}
        >
          <Text style={stylesInputs.textButton}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={
          stylesInputs.help
        } /* onPress={() => props.navigation.navigate("FAQ")} */
      >
        ¿Necesitas ayuda?
      </Text>
    </View>
  );
}
