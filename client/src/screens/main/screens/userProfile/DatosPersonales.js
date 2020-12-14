import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function DatosPersonales(props){
    return (
        <SafeAreaView>
            <View style={s.container}>
               <Text>Email</Text>
               <Text>maicoloncomilla@gmail.com</Text>
            </View>
            <View style={s.container}>
               <Text>Domicilio</Text>
               <Text>Calle falsa 123</Text>
            </View>
            <View style={s.container}>
               <Text>Código Postal</Text>
               <Text>8360</Text>
            </View>
            <View style={s.container}>
               <Text>Localidad</Text>
               <Text>Choele Choel</Text>
            </View>
            <View style={s.container}>
               <Text>Provincia</Text>
               <Text>Rio Negro</Text>
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
