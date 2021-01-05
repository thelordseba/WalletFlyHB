import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text, Linking } from "react-native";
import axios from 'axios';
import image from "../../assets/pagofacil.jpg";
import { useDispatch, useSelector } from 'react-redux';
import api from '../reducer/ActionCreator';
import { Button, Dialog, Paragraph } from 'react-native-paper';
import stylesInputs from './registro/screens/styles/inputs/s';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableRipple, Switch } from 'react-native-paper';

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
  const [wApp, setWApp] = useState(false);
  const recarga = useSelector(state => state.recarga)
  const user = useSelector(state => state.user)
  const { SALDO, RECARGA } = api
  const dispatch = useDispatch()

  const onWappPress = () => {
    setWApp(!wApp);
  };

  const wAppNotification = async () => {
    await Linking.openURL(
      `https://wa.me/+54${user.phone}?text=Hola *${user.firstName}*, se le acredito un total de: ${state.monto} gracias por confiar en WalletFly.`
    );
  };

  const cerrarPaypal = () => {
    dispatch({
      type: RECARGA,
      payload: {}
    })
    props.navigation.navigate('Home');
  }
  const chargeMoney = () => {
    if (state.monto > 0) {
      const data = {
        title: 'PagoFacil',
        type: 'ingreso',
        description: 'Recarga de dinero a tavés de Pago Facil.',
        total: parseInt(state.monto, 10)
      };
      axios.post(`https://walletfly.glitch.me/transaction/byUserEmail/${recarga.email}`, data)
        .then(({ data }) => {
          if(wApp){
            wAppNotification()
          }
          dispatch({
            type: SALDO,
            payload: data.balance
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
      if(state.monto < 0){
        setAlertMessage("No puede recargar un numero negativo")
        setVisible(!visible)
      }else{
        setAlertMessage("Ingrese un Monto")
        setVisible(!visible)
      }
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => cerrarPaypal()} style={{ marginTop: 90, marginLeft: 'auto' }}>
        <Text><MaterialCommunityIcons name="close" size={26} /></Text>
      </TouchableOpacity>
      <View>
        <Image
          style={{ width: '100%', height: 150, marginBottom: 20 }}
          source={image}
        />
        <View style={s.code}>
          <Text style={{ marginLeft: 10 }}>{recarga.code}</Text>
        </View>
        <TextInput
          style={stylesInputs.inputs}
          keyboardType='numeric'
          placeholder="Ingrese el monto de la recarga"
          onChangeText={(value) => handleTextChange("monto", value)}
        />
        <Button style={s.button} mode="contained" onPress={() => chargeMoney()}>
          Recargar Dinero
      </Button>
        <TouchableRipple onPress={() => onWappPress()}>
          <View>
            <Text>Mensaje de Wasap</Text>
            <View pointerEvents="none">
              <Switch value={wApp} />
            </View>
          </View>
        </TouchableRipple>
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
  },
  code: {
    width: '95%',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginLeft: 'auto',
    marginRight: "auto"
  }
})