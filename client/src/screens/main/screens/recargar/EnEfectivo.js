import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../reducer/ActionCreator';
import { Appbar } from 'react-native-paper';

export default function EnEfectivo(props) {
  const code = Math.round(Math.random() * 1000000000000);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { RECARGA } = api;
  const data = {
    code: code,
    email: user.email
  }
  const recargar = () => {
    props.navigation.navigate('ChargeMoney');
    dispatch({
      type: RECARGA,
      payload: data
    })
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Recargar" />
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Recarga de dinero</Text>
        <View>
          <Text>Para recargar dinero en tu cuenta tenes que entregar el siguente código a la cajera del Pago fácil</Text>
          <View><Text>Código de recarga:</Text></View>
          <View><Text>{code}</Text></View>
          <Button onPress={() => recargar()}>Recargar</Button>
        </View>
      </View>
    </>

  )
}