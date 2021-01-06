import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../reducer/ActionCreator";
import stylesInputs from "./styles/inputs/s";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as LocalAuthentication from "expo-local-authentication";

export default function Login({ navigation }) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [ newPassword, setNewPassword ] = useState(false)
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
          .post(`https://walletfly.glitch.me/users/login`, state)
          .then(({ data }) => {
            dispatch({
              type: USER,
              payload: data,
            });
          })
          .catch((err) => Alert.alert(`Error! ${err}`));
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
        .post(`https://walletfly.glitch.me/users/login`, state)
        .then(({ data }) => {
          dispatch({
            type: USER,
            payload: data,
          });
        })
        .catch((err) => Alert.alert(`Error! ${err}`));
    }
  };
  const validateUserLogin = () => {
    if (state.password === "" || state.email === "") {
      return Alert.alert('Llene todos los campos')
    } else {
      axios.get(`https://walletfly.glitch.me/users/getUserByEmail?email=${state.email}`)
        .then(({ data }) => {
          if (data) {
            active ? AuthWithFinger() : validateUser();
          }
          else {
            return Alert.alert('Usuario o Contraseña incorrecta')
          }
        })
        .catch(err => {
          return Alert.alert('Sucedio un error' + err)
        })
    }
  };

  const enviarEmail = () => {
    if(state.email === ""){
      return Alert.alert('Ingrese el email, para enviarle su codigo de recuperación')
    }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(state.email)){
      return Alert.alert('Has introducido una dirección de email no valida.')
    }else {
      axios.put('https://walletfly.glitch.me/passwordEmail', state.email)
      .then(({config}) => {
        setNewPassword(!newPassword)
        navigation.navigate('ChangePassword', config.data)
      })
      .catch(err => {
        return Alert.alert('Ocurrio un Error!' + err)
      })
    }
    
  }

  return (
    <>
    <View style={stylesInputs.container}>
      <Text style={stylesInputs.inputsText}>Email</Text>
      <View style={stylesInputs.containerInput}>
        <MaterialCommunityIcons
          name="account-outline"
          color={"#f23b6c"}
          size={30}
          style={{ margin: 3 }}
        />
        <TextInput
          style={stylesInputs.inputsLogin}
          placeholder="Ingrese su Email"
          placeholderTextColor="#cb3065"
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
          style={{ margin: 3 }}
        />
        <TextInput
          style={stylesInputs.inputsLogin}
          placeholder="Ingrese su Contraseña"
          placeholderTextColor="#cb3065"
          secureTextEntry={true}
          onChangeText={(value) => handleTextChange("password", value)}
        />
      </View>
      {!state.password && <Text style={stylesInputs.error}>{error}</Text>}
      <TouchableOpacity onPress={() => setNewPassword(!newPassword)}>
        <Text style={stylesInputs.forgottenPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <View style={stylesInputs.containerButton}>
        <TouchableOpacity
          style={stylesInputs.button}
          onPress={() => validateUserLogin()}
        >
          <Text style={stylesInputs.textButton}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("QuestionAndAnswers")}>
        <Text style={stylesInputs.help}>¿Necesitas ayuda?</Text>
      </TouchableOpacity>
    </View>
      {newPassword &&
        <View style={s.containerAgregar}>
          <View style={s.containerAgregar2}>
            <TouchableOpacity
              onPress={() => setNewPassword(!newPassword)}
              style={s.buttonClose}
            >
              <Text>
                <MaterialCommunityIcons name="close" size={26} />
              </Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 40, marginBottom: 10 }}>
              Ingrese su Email, para poder enviarle un correo con los pasos a seguir.
            </Text>
            <TextInput
              placeholder="Email"
              onChangeText={(value) => handleTextChange("email", value)}
            />
            <TouchableOpacity onPress={() => enviarEmail()}>
              <Text>Enviar Codigo</Text>
            </TouchableOpacity>
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
  buttonClose: {
    position: "absolute",
    right: 10,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 60,
  },
})