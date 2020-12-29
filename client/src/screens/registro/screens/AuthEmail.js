import axios from "axios";
import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { Button, Dialog, Paragraph } from 'react-native-paper'
import stylesInputs from './styles/inputs/s';
import { APP_API } from "../../../../env"

export default function AuthEmail({ route, navigation }) {
  const [authCode, setAuthCode] = useState(0);
  const handleTextChange = (value) => {
    setAuthCode(value);
  };
  const [visible, setVisible] = useState(false)
  const [ alertMessage, setAlertMessage ] = useState("")
  const hideDialog = () => {
    setVisible(!visible)
  }
  console.log(route)
  const authenticateEmail = () => {
    const userId = route.params.id;
    axios.get(`http://${APP_API}/users/${userId}`)
      .then((user) => {
        let userCode = user.data.segNumber;
        if (userCode == authCode) {
          navigation.navigate("UpdateUser", route.params);
        } else {
          setAlertMessage("El código de autenticación es incorrecto.")
          setVisible(!visible)
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
    <View>
      <TextInput
      style={stylesInputs.inputs}
      placeholder="Ingrese el código"
      onChangeText={(value) => handleTextChange(value)}
      />
      <Button mode="contained" onPress={() => authenticateEmail()}>
        Siguiente
      </Button>
      <Text style={{textAlign: 'center', marginTop: 10}} /* onPress={() => props.navigation.navigate("FAQ")} */>
        ¿Necesitas ayuda?</Text>
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

// estilos StyleSheeet
