import axios from "axios";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import stylesInputs from "./styles/inputs/s";
import { Dialog, Paragraph, Appbar } from "react-native-paper";

export default function AuthEmail({ route, navigation }) {
  const [authCode, setAuthCode] = useState(0);
  const handleTextChange = (value) => {
    setAuthCode(value);
  };
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const hideDialog = () => {
    setVisible(!visible);
  };
  const authenticateEmail = () => {
    const userId = route.params.id;

    axios
      .get(`https://walletfly.glitch.me/users/${userId}`)

      .then((user) => {
        let userCode = user.data.segNumber;
        if (userCode == authCode) {
          navigation.navigate("UpdateUser", route.params);
        } else {
          setAlertMessage("El código de autenticación es incorrecto.");
          setVisible(!visible);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <StatusBar
        backgroundColor="#f23b6c"
        barStyle={"light-content"}
        style={{ alignSelf: "center" }}
      />
      <Appbar.Header style={{ backgroundColor: "#ffffff", height: 45 }}>
        <Appbar.Content
          title="Autenticar cuenta"
          color="#F23B6C"
          titleStyle={{ textAlign: "center", fontFamily: "Bree-Serif" }}
        />
      </Appbar.Header>
      <View style={stylesInputs.container}>
        <TouchableOpacity style={stylesInputs.header}></TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            marginLeft: "10%",
            marginRight: "10%",
            marginTop: "3%",
            marginBottom: "3%",
            fontFamily: "OpenSans-Regular",
            color: "#cb3065",
          }}
        >
          Por favor ingrese el código de 6 dígitos que fue enviado a su casilla
          de E-mail. Recuerde revisar su bandeja de "Spam".
        </Text>
        <View style={stylesInputs.containerInputSolo}>
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Ingrese el código"
            placeholderTextColor="#cb3065"
            onChangeText={(value) => handleTextChange(value)}
          />
        </View>
        <View style={stylesInputs.containerButton}>
          <TouchableOpacity
            style={stylesInputs.buttonSecondary}
            onPress={() => authenticateEmail()}
          >
            <Text style={stylesInputs.textButtonSecondary}>Autenticar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text style={stylesInputs.dialogText}>{alertMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <View style={stylesInputs.containerButton}>
            <TouchableOpacity
              style={stylesInputs.button}
              onPress={() => setVisible(!visible)}
            >
              <Text style={stylesInputs.textButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
