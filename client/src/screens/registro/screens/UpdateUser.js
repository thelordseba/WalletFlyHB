import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Button, Dialog, Paragraph } from 'react-native-paper'
import stylesInputs from './styles/inputs/s'

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
  const [visible, setVisible] = useState(false)
  const [ alertMessage, setAlertMessage ] = useState("")
  const hideDialog = () => {
    setVisible(!visible)
  }
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
      setAlertMessage("Debes completar todos los campos antes de continuar.")
      setVisible(!visible)
    } else {  
      if (birth() >= 16) {
        navigation.navigate('UpdateUser2', state)
      } else {
        setAlertMessage("Debes ser mayor de 16 años para registrarte!")
        setVisible(!visible)
      }
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
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Apellido(s)"
          onChangeText={(value) => handleTextChange("lastName", value)}
        />
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Fecha de Nacimiento"
          onChangeText={(value) => handleTextChange("birthdate", value)}
        />
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Número de Documento"
          onChangeText={(value) => handleTextChange("documentNumber", value)}
        />
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Teléfono"
          onChangeText={(value) => handleTextChange("phone", value)}
        />
        <Button mode="contained" onPress={() => next()}>Siguiente</Button>
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