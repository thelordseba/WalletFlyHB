import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import api from '../../../reducer/ActionCreator';
import { Button, Dialog, Paragraph } from 'react-native-paper'
import stylesInputs from './styles/inputs/s';

export default function Login({ route, navigation }) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false)
  const hideDialog = () => {
    setVisible(!visible)
  }
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };
  const dispatch = useDispatch();
  const { USER } = api;

  const validateUser = () => {
    if (state.email === "" || state.password === "") {
      setVisible(!visible)
    } else {
      axios.post(`http://localhost:3001/users/login`, state)
        .then(({ data }) => {
          dispatch({
            type: USER,
            payload: data
          })
        })
        .catch(err => alert(`Error! ${err}`))
    }
  };

  return (
    <>
      <View style={s.container}>
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Email"
          onChangeText={(value) => handleTextChange("email", value)}
        />
        <TextInput
          style={stylesInputs.inputs}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(value) => handleTextChange("password", value)}
        />
        <Button mode="contained" onPress={() => validateUser()}>
          Ingresar
        </Button>
        <Text style={{textAlign: 'center', marginTop: 10}}>¿Olvidaste tu contraseña? </Text>
      </View>

      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>Complete todos los campos por favor</Paragraph>
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
  }
})
