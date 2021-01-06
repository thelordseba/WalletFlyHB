import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Dialog, Paragraph } from "react-native-paper";
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
      <View style={stylesInputs.container}>
        <Text style={stylesInputs.inputsText}>Nombre</Text>
        <View style={stylesInputs.containerInputSolo}>
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Nombre"
            placeholderTextColor="#cb3065"
            onChangeText={(value) => handleTextChange("firstName", value)}
          />
        </View>
        {!state.firstName && <Text style={stylesInputs.error}>{error}</Text>}
        <Text style={stylesInputs.inputsText}>Apellido(s)</Text>
        <View style={stylesInputs.containerInputSolo}>
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Apellido(s)"
            placeholderTextColor="#cb3065"
            onChangeText={(value) => handleTextChange("lastName", value)}
          />
        </View>
        {!state.lastName && <Text style={stylesInputs.error}>{error}</Text>}
        <Text style={stylesInputs.inputsText}>Fecha de Nacimiento</Text>
        <View style={stylesInputs.containerInputSolo}>
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#cb3065"
            onChangeText={(value) => handleTextChange("birthdate", value)}
          />
        </View>
        {<Text style={stylesInputs.error}>{alertMessage2}</Text>}
        {!state.birthdate && <Text style={stylesInputs.error}>{error}</Text>}
        <Text style={stylesInputs.inputsText}>Número de documento</Text>
        <View style={stylesInputs.containerInputSolo}>
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Número de Documento"
            placeholderTextColor="#cb3065"
            onChangeText={(value) => handleTextChange("documentNumber", value)}
          />
        </View>
        {!state.documentNumber && (
          <Text style={stylesInputs.error}>{error}</Text>
        )}
        <Text style={stylesInputs.inputsText}>Teléfono</Text>
        <View style={stylesInputs.containerInputSolo}>
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Teléfono"
            placeholderTextColor="#cb3065"
            onChangeText={(value) => handleTextChange("phone", value)}
          />
        </View>
        {!state.phone && <Text style={stylesInputs.error}>{error}</Text>}

        <View style={stylesInputs.containerButton}>
          <TouchableOpacity
            style={stylesInputs.buttonSecondary}
            onPress={() => next()}
          >
            <Text style={stylesInputs.textButtonSecondary}>Siguiente</Text>
          </TouchableOpacity>
        </View>
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
