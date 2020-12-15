import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function DatosPersonales(props){
    const email = useSelector(state => state.email)
    const user = useSelector(state => state.user)
    const userDirection = useSelector(state => state.userDirection)
    return (
        <SafeAreaView>
            <View style={s.container}>
               <Text>Email</Text>
               <Text>{email}</Text>
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
               <Text>{userDirection.address} Nº {userDirection.addressNumber}</Text>
            </View>
            <View style={s.container}>
               <Text>Código Postal</Text>
               <Text>{userDirection.postalCode}</Text>
            </View>
            <View style={s.container}>
               <Text>Localidad</Text>
               <Text>{userDirection.city}</Text>
            </View>
            <View style={s.container}>
               <Text>Provincia</Text>
               <Text>{userDirection.province}</Text>
            </View>
            <View style={s.container}>
               <Text>País</Text>
               <Text>{userDirection.country}</Text>
            </View>
        </SafeAreaView>
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
        marginTop: 20
    }
})
