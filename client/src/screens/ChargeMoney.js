import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import axios from 'axios';
import image from "../../assets/pagofacil.jpg";
import { useDispatch, useSelector } from 'react-redux';
import api from '../reducer/ActionCreator';
import { Button, Dialog, Paragraph } from 'react-native-paper';
import stylesInputs from './registro/screens/styles/inputs/s';

export default function ChargeMoney(props) {
  const [state, setState] = useState({
    codigo: "",
    monto: 0,
  });
  const [visible, setVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const hideDialog = () => {
    setVisible(!visible)
  }
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };
  const recarga = useSelector(state => state.recarga)
  const { SALDO, EFECTIVO } = api
  const dispatch = useDispatch()
  console.log(props)
  const chargeMoney = () => {
    if (recarga.code === parseInt(state.codigo)) {
      const data = {
        title: 'PagoFacil',
        type: 'ingreso',
        description: 'Recarga de dinero a tavés de Pago Facil.',
        total: parseInt(state.monto, 10)
      };
      axios.post(`http://192.168.0.2:3001/transaction/byUserEmail/${recarga.email}`, data)
        .then(({ data }) => {
          dispatch({
            type: SALDO,
            payload: data.balance
          })
          dispatch({
            type: EFECTIVO,
            payload: false,
          })
          dispatch({
            type: RECARGA,
            payload: {}
          })
          props.navigation.navigate('Home');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setAlertMessage("El código ingresado no es correcto")
      setVisible(!visible)
    }
  };

  return (
    <>
      <View>
        <Image
          style={{ width: 300, height: 90, marginBottom: 20 }}
          source={{ uri: image }}
        />
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Ingrese código de usuario"
          onChangeText={(value) => handleTextChange("codigo", value)}
        />
        <TextInput
          style={stylesInputs.inputs}
          keyboardType='numeric'
          placeholder="Ingrese el monto de la recarga"
          onChangeText={(value) => handleTextChange("monto", value)}
        />
        <Button style={s.button} mode="contained" onPress={() => chargeMoney()}>
          Recargar Dinero
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
  button: {
    backgroundColor: "rgb(255, 221, 0)",
  }
})