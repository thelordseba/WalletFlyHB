import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, Dialog, Paragraph } from "react-native-paper";
import stylesInputs from "./styles/inputs/s";

export default function UpdateUserScreen({ route, navigation }) {
  const [state, setState] = useState({
    id: route.params.id,
    email: route.params.state.email,
    firstName: "",
    lastName: "",
    birthdate: "",
    // documentType: "",
    documentNumber: "",
    phone: "",
  });
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertMessage2, setAlertMessage2] = useState("");

  const [error, setError] = useState("");
  useEffect(() => {
    if (
      !state.firstName ||
      !state.lastName ||
      !state.birthdate ||
      !state.documentNumber ||
      !state.phone
    ) {
      setError("Este campo es obligatorio");
    } else {
      setError(null);
    }
  }, [state, setError]);

  const hideDialog = () => {
    setVisible(!visible);
  };
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };
  const birth = () => {
    var birthArray = state.birthdate.split("/");
    var Age = birthArray[2] + "-" + birthArray[1] + "-" + birthArray[0];
    var edad = Math.floor((new Date() - new Date(Age).getTime()) / 31557600000);
    return edad;
  };

  const next = () => {
    if (
      state.firstName === "" ||
      state.lastName === "" ||
      state.birthdate === "" ||
      // state.documentType === "" ||
      state.documentNumber === "" ||
      state.phone === ""
    ) {
      setAlertMessage("Revisa todos los campos antes de continuar.");
      setVisible(!visible);
    }

    if (birth() >= 16) {
      navigation.navigate("UpdateUser2", state);
      setAlertMessage2("");
    } else {
      setAlertMessage2("Debes ser mayor de 16 años para registrarte!");
    }
  };

  return (
    <>
      <View>
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Nombre"
          onChangeText={(value) => handleTextChange("firstName", value)}
        />
        {!state.firstName && <Text style={s.error}>{error}</Text>}
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Apellido(s)"
          onChangeText={(value) => handleTextChange("lastName", value)}
        />
        {!state.lastName && <Text style={s.error}>{error}</Text>}
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Fecha de Nacimiento"
          onChangeText={(value) => handleTextChange("birthdate", value)}
        />
        {<Text style={s.error}>{alertMessage2}</Text>}
        {!state.birthdate && <Text style={s.error}>{error}</Text>}
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Número de Documento"
          onChangeText={(value) => handleTextChange("documentNumber", value)}
        />
        {!state.documentNumber && <Text style={s.error}>{error}</Text>}
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Teléfono"
          onChangeText={(value) => handleTextChange("phone", value)}
        />
        {!state.phone && <Text style={s.error}>{error}</Text>}
        <Button mode="contained" onPress={() => next()}>
          Siguiente
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
  error: {
    color: "#cB3065",
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 10,
  },
});
