import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function DatosPersonales(props) {
   const email = useSelector(state => state.email)
   const user = useSelector(state => state.user)
   const userDirection = useSelector(state => state.userDirection)
   const userLogin = useSelector(state => state.userLogin)
   return (
      <View>
         <View style={s.container}>
            <Text>Email</Text>
            <Text>{email ? email : userLogin.email}</Text>
         </View>
         <View style={s.container}>
            <Text>Fecha de nacimiento</Text>
            <Text>{user ? user.birthdate : userLogin.birthdate}</Text>
         </View>
         <View style={s.container}>
            <Text>Telefono</Text>
            <Text>{user ? user.phone : userLogin.phone}</Text>
         </View>
         <View style={s.container}>
            <Text>Nº de documento</Text>
            <Text>{user ? user.documentNumber : userLogin.documentNumber}</Text>
         </View>
         <View style={s.container}>
            <Text>Domicilio</Text>
            <Text>{userDirection ? userDirection.address : userLogin.address} Nº {user ? userDirection.addressNumber : userLogin.addressNumber}</Text>
         </View>
         <View style={s.container}>
            <Text>Código Postal</Text>
            <Text>{userDirection ? userDirection.postalCode : userLogin.postalCode}</Text>
         </View>
         <View style={s.container}>
            <Text>Localidad</Text>
            <Text>{userDirection ? userDirection.city : userLogin.city}</Text>
         </View>
         <View style={s.container}>
            <Text>Provincia</Text>
            <Text>{userDirection ? userDirection.province : userLogin.province}</Text>
         </View>
         <View style={s.container}>
            <Text>País</Text>
            <Text>{userDirection ? userDirection.country : userLogin.country}</Text>
         </View>
      </View>
   )
}
const s = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
    }
})
