import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../../reducer/ActionCreator";
import { Appbar } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";

export default function EnEfectivo(props) {
  const code = Math.round(Math.random() * 1000000000000);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.huella);
  const { RECARGA } = api;
  const data = {
    code: code,
    email: user.email,
  };
  const recargar = async () => {
    if (active) {
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
        props.navigation.navigate("ChargeMoney");
        dispatch({
          type: RECARGA,
          payload: data,
        });
      }
    } else {
      props.navigation.navigate("ChargeMoney");
      dispatch({
        type: RECARGA,
        payload: data,
      });
    }
  };

  return (
    <>
      <Appbar.Header
        style={{ backgroundColor: "#f23b6c", borderBottomColor: "#f23b6c" }}
      >
        <Appbar.Action
          icon="arrow-left"
          onPress={() => props.navigation.goBack()}
        />
        <Appbar.Content title="Recargar" />
      </Appbar.Header>
      <View style={s.container}>
        <Text style={s.title}>Recarga de dinero</Text>
        <View>
          <Text style={s.text}>
            Para recargar dinero en tu cuenta tenes que entregar el siguente
            código al cajero del Pago fácil
          </Text>
          <View>
            <Text style={s.textCode}>Código de recarga:</Text>
          </View>
          <View>
            <Text style={s.code}>{code}</Text>
          </View>

          <View style={s.containerButton}>
            <TouchableOpacity
              style={s.buttonSecondary}
              onPress={() => recargar()}
            >
              <Text style={s.textButtonSecondary}>Recargar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontFamily: "Bree-Serif",
    color: "#f23b6c",
    fontSize: "2rem",
    justifyContent: "center",
  },
  text: {
    fontSize: "1rem",
    textAlign: "center",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "3%",
    marginBottom: "3%",
    fontFamily: "OpenSans-Regular",
    color: "#cb3065",
  },
  textCode: {
    fontFamily: "Bree-Serif",
    color: "#f23b6c",
    fontSize: "1.5rem",
    textAlign: "center",
  },
  containerButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "0.5rem",
  },
  buttonSecondary: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#f23b6c",
    width: "50%",
    height: "2.5rem",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  code: {
    fontFamily: "Bree-Serif",
    color: "#cb3065",
    fontSize: "3rem",
    textAlign: "center",
  },
  textButtonSecondary: {
    color: "#f23b6c",
    fontSize: "1rem",
    fontFamily: "Bree-Serif",
    justifyContent: "center",
  },
});
