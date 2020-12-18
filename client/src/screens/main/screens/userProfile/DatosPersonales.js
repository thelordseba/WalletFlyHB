import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function DatosPersonales(props) {
   const user = useSelector(state => state.user)

   return (
      <View>
         <View style={s.container}>
            <Text>Email</Text>
            <Text>{user.email}</Text>
         </View>
         <View style={s.container}>
            <Text>Fecha de nacimiento</Text>
            <Text>{user.birthdate}</Text>
         </View>
         <View style={s.container}>
            <Text>Telefono</Text>
            <Text>{user.phone}</Text>
         </View>
         <View style={s.container}>
            <Text>Nº de documento</Text>
            <Text>{user.documentNumber}</Text>
         </View>
         <View style={s.container}>
            <Text>Domicilio</Text>
            <Text>{user.address} Nº {user.addressNumber}</Text>
         </View>
         <View style={s.container}>
            <Text>Código Postal</Text>
            <Text>{user.postalCode}</Text>
         </View>
         <View style={s.container}>
            <Text>Localidad</Text>
            <Text>{user.city}</Text>
         </View>
         <View style={s.container}>
            <Text>Provincia</Text>
            <Text>{user.province}</Text>
         </View>
         <View style={s.container}>
            <Text>País</Text>
            <Text>{user.country}</Text>
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
