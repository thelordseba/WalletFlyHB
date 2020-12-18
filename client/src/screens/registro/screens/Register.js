import React, { useState } from "react";
import axios from "axios";
import { View, TextInput, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import api from '../../../reducer/ActionCreator';
import { Button, Dialog, Paragraph } from 'react-native-paper'
import stylesInputs  from './styles/inputs/s'; 

export default function CreateUserScreen(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordRepeat: ""
  });
  const [visible, setVisible] = useState(false)
  const [ alertMessage, setAlertMessage ] = useState("")
  const hideDialog = () => {
    setVisible(!visible)
  }
  const { EMAIL } = api;
  const dispatch = useDispatch();
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const next = () => {  
    if (state.email === "" || state.password === "" || state.passwordRepeat === "") {
      setAlertMessage("Debes completar todos los campos antes de continuar.")
      setVisible(!visible)
    } else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(state.email)){
      setAlertMessage("Ha introducido una dirección de email no valida.") 
      setVisible(!visible)  
    } else if(state.password !== state.passwordRepeat){
      setAlertMessage("Comprueba tu contraseña.")
      setVisible(!visible)
    } else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(state.password)){
      setAlertMessage("Debe ingresar una contraseña de 8 caracteres alfanumericos y como mínimo una mayúscula.")
      setVisible(!visible)
    } else {     
      axios.post(`http://localhost:3001/userEmail`, state)
        .then(({ data }) => {
          props.navigation.push("AuthEmail", data.user.id); //Le paso por props solo el userId que acabo de crear
          dispatch({
            type: EMAIL,
            payload: state.email
          })
        })
        .catch((error) => {
          setAlertMessage(`Error! ${error}`)
          setVisible(!visible)
        });
    }
  };

  return (
    <>
      <View>
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Email"
          onChangeText={(value) => handleTextChange("email", value)}
        />
        <TextInput
          style={stylesInputs.inputs}
          secureTextEntry={true}
          placeholder="Contraseña"
          onChangeText={(value) => handleTextChange("password", value)}
        />
        <TextInput
          style={stylesInputs.inputs}
          secureTextEntry={true}
          placeholder="Repite tu contraseña"
          onChangeText={(value) => handleTextChange("passwordRepeat", value)}
        />
        <Button mode="contained" onPress={() => next()}>Registarme</Button>
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
})
