import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Button, Dialog, Paragraph } from "react-native-paper";
import stylesInputs from "./styles/inputs/s";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { APP_API } from "../../../../env";

export default function CreateUserScreen(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertMessage2, setAlertMessage2] = useState("");
  const [alertMessage3, setAlertMessage3] = useState("");
  const [alertMessage4, setAlertMessage4] = useState("");
  const hideDialog = () => {
    setVisible(!visible);
  };
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };
  const [error, setError] = useState("");
  useEffect(() => {
    if (!state.password || !state.email) {
      setError("Este campo es obligatorio");
    } else {
      setError(null);
    }
  }, [state, setError]);
  const next = () => {
    if (
      state.email === "" ||
      state.password === "" ||
      state.passwordRepeat === ""
    ) {
      setAlertMessage("Revisa todos los campos antes de continuar.");
      setVisible(!visible);
    }

    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        state.email
      )
    ) {
      setAlertMessage2("Has introducido una dirección de email no valida.");
    } else {
      setAlertMessage2("");
    }

    if (state.password !== state.passwordRepeat) {
      setAlertMessage3("Comprueba tu contraseña.");
      setVisible(!visible);
    } else {
      setAlertMessage3("");
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(state.password)) {
      setAlertMessage4(
        "Debes ingresar una contraseña de 8 caracteres alfanumericos y como mínimo una mayúscula."
      );
      setVisible(!visible);
    } else {
      setAlertMessage4("");
    }

    axios
      .post(`http://${APP_API}/userEmail`, state)
      .then(({ data }) => {
        props.navigation.navigate("AuthEmail", { id: data.user.id, state });
      })
      .catch((error) => {
        setAlertMessage(`Error! ${error}`);
        setVisible(!visible);
      });
  };

  return (
    <>
      <View>
        <Text style={s.text}>Email</Text>
        <View style={s.containerInput}>
          <MaterialCommunityIcons name="account-outline" size={20} />
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Ingrese su Email"
            onChangeText={(value) => handleTextChange("email", value)}
          />
        </View>
        {<Text style={s.error}>{alertMessage2}</Text>}
        <Text style={s.text}>Contraseña</Text>
        <View style={s.containerInput}>
          <MaterialCommunityIcons name="lock-outline" size={20} />
          <TextInput
            style={stylesInputs.inputsLogin}
            secureTextEntry={true}
            placeholder="Ingrese su contraseña"
            onChangeText={(value) => handleTextChange("password", value)}
          />
        </View>
        {<Text style={s.error}>{alertMessage4}</Text>}
        <Text style={s.text}>Repita su contraseña</Text>
        <View style={s.containerInput}>
          <MaterialCommunityIcons name="lock-outline" size={20} />
          <TextInput
            style={stylesInputs.inputsLogin}
            secureTextEntry={true}
            placeholder="Repita su contraseña"
            onChangeText={(value) => handleTextChange("passwordRepeat", value)}
          />
        </View>
        {<Text style={s.error}>{alertMessage3}</Text>}
        <Button
          style={{ marginTop: 20 }}
          mode="contained"
          onPress={() => next()}
        >
          Registarme
        </Button>
      </View>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>{alertMessage}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(!visible)}>Cerrar</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
const s = StyleSheet.create({
  container: {
    flex: 1,
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
  text: {
    fontSize: 13,
    color: "#999",
    marginLeft: 10,
    marginTop: 10,
  },
  error: {
    color: "#cB3065",
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 10,
  },
});
