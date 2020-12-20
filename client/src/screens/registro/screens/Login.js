import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import api from '../../../reducer/ActionCreator';
import { Button, Dialog, Paragraph, Appbar } from 'react-native-paper';
import stylesInputs from './styles/inputs/s';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
      axios.post(`http://192.168.0.2:3001/users/login`, state)
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
        <Text style={s.text}>Email</Text>
        <View style={s.containerInput}>
          <MaterialCommunityIcons name="account-outline" size={20} />
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Ingrese su Email"
            onChangeText={(value) => handleTextChange("email", value)}
          />
        </View>
        <Text style={s.text}>Contraseña</Text>
        <View style={s.containerInput}>
          <MaterialCommunityIcons name="lock-outline" size={20} />
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Ingrese su Contraseña"
            secureTextEntry={true}
            onChangeText={(value) => handleTextChange("password", value)}
          />
        </View>
        <Button style={{marginTop: 20}} mode="contained" onPress={() => validateUser()}>
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
  },
  text: {
    fontSize: 13,
    color: '#999',
    marginLeft: 10,
    marginTop: 10
  },
  containerInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  }
})
