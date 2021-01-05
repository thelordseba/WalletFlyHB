import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, TextInput, TouchableOpacity, Text, Button } from "react-native";
import { Dialog, Paragraph } from "react-native-paper";
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
        {<Text style={stylesInputs.error}>{alertMessage2}</Text>}
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
            secureTextEntry={true}
            placeholder="Ingrese su contraseña"
            onChangeText={(value) => handleTextChange("password", value)}
          />
        </View>
        {<Text style={stylesInputs.error}>{alertMessage4}</Text>}
        <Text style={stylesInputs.inputsText}>Repita su contraseña</Text>
        <View style={stylesInputs.containerInput}>
          <MaterialCommunityIcons
            name="lock-outline"
            color={"#f23b6c"}
            size={30}
            style={{ margin: "0.2rem" }}
          />
          <TextInput
            style={stylesInputs.inputsLogin}
            secureTextEntry={true}
            placeholder="Repita su contraseña"
            onChangeText={(value) => handleTextChange("passwordRepeat", value)}
          />
        </View>
        {<Text style={stylesInputs.error}>{alertMessage3}</Text>}
        <View style={stylesInputs.containerButton}>
          <TouchableOpacity style={stylesInputs.button} onPress={() => next()}>
            <Text style={stylesInputs.textButton}>Registrarse</Text>
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
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text style={stylesInputs.dialogText}>{alertMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <TouchableOpacity
            style={stylesInputs.button}
            onPress={() => setVisible(!visible)}
          >
            <Text style={stylesInputs.textButton}>Cerrar</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
