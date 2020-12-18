import axios from "axios";
import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { Button, Dialog, Paragraph } from 'react-native-paper'
import stylesInputs from './styles/inputs/s';

export default function AuthEmail(props) {
  const [authCode, setAuthCode] = useState(0);
  const handleTextChange = (value) => {
    setAuthCode(value);
  };
  const [visible, setVisible] = useState(false)
  const [ alertMessage, setAlertMessage ] = useState("")
  const hideDialog = () => {
    setVisible(!visible)
  }
  const authenticateEmail = () => {
      var userCode = "";
      const userId = props.route.params;      
      axios.get(`http://localhost:3001/users/${userId}`)
        .then((user) => {              
          userCode = user.data.segNumber;
          if(userCode == authCode){                
            props.navigation.navigate("UpdateUser", userId);
          }else {   
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
