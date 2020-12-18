import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';

export default function EnEfectivo(props){
  const code = Math.round(Math.random()*1000000000000);
  const emailUser = useSelector(state=>state.email);
  const {email} = useSelector(state=>state.userLogin);
  const data = {
    code: code,
    email: emailUser ? emailUser : email
  }
    const recargar = ()=>{
      props.navigation.navigate('ChargeMoney', data);
    }

    return (        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Recarga de dinero</Text>
        <View>
          <Text>Para recargar dinero en tu cuenta tenes que entregar el siguente código a la cajera del Pago fácil</Text>
          <View>Código de recarga:</View> 
          <View>{code}</View> 
          <Button title="Recargar" onPress= {()=> recargar()}/>
       </View>
       </View>
       
    )
}