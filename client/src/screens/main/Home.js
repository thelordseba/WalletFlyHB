import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@material-ui/core';

export default function Home(props){

    return (
        <View style={s.container}>
            <Text style={s.textBienvenida}>Bienvenido USUARIO!!</Text>
            <View style={s.containerPerfil}>
                <Avatar style={{ minWidth: "80px", minHeight: "80px" }} />
                <View style={s.containerNameEmail}>
                    <Text style={s.textNombre}>Maico Loncomilla</Text>
                    <Text style={s.textEmail}>maicoloncomilla@gmail.com</Text>
                </View>
            </View>
            <View>
                En este contenedor tiene que ir un grafico de barras, donde muestre la evolucion del balance de la cuenta del usuario
            </View>
            <View style={s.containerButton}>
                <Button title="Recargar" />
                <Button title="Transferir" />
            </View>
        </View>
    )
}
const s = StyleSheet.create({
    container:{
        width: "100%",
        height: "100vh",
        backgroundColor: "#22074d"
    },
    textBienvenida: {
        textAlign: "center",
        fontSize: 20,
        color: "#49e1f4",
        marginTop: 10,
        marginBottom: 10
    },
    containerPerfil:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 15,
    },
    containerNameEmail:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10
    },
    textNombre:{
        color: "#49e1f4",
        fontSize: 18
    },
    textEmail:{
        color: "#49e1f4",
        fontSize: 14
    },
    containerButton:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
    },
})
