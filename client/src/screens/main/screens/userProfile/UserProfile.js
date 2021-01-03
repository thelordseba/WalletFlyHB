import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from 'react-redux';
import { Button, Avatar, Appbar } from 'react-native-paper';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadImage from './UploadImage';

export default function UserProfile({ navigation }) {
    
    const user = useSelector(state => state.user)

    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
                <Appbar.Content title="Perfil" />
            </Appbar.Header>

            <SafeAreaView>
                <View style={s.container}>
                    <View style={s.containerImg}>
                        {/* en celular no muestra el icono, segun doc hay que importar img */}                       

                        <UploadImage email= {user.email}/>                           

                        <Text style={s.textUser}>{user.firstName} {user.lastName}</Text>
                        <Text style={s.textEmail}>{user.email}</Text>
                    </View>
                    <Button mode="outlined" onPress={() => navigation.navigate("DatosPersonales")}>
                        Mi Código QR
                </Button>
                    <Button mode="outlined" onPress={() => navigation.navigate("DatosPersonales")}>
                        MI CVU
                </Button>
                    <Button mode="outlined" onPress={() => navigation.navigate("DatosPersonales")}>
                        Datos Personales
                </Button>
                </View>
            </SafeAreaView>
        </>
    )
}

const s = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#232323',
        height: '100%'
    },
    containerImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    textUser: {
        fontSize: 18,
        color: "#fff",
        marginTop: 8
    },
    textEmail: {
        color: "#fff",
        marginBottom: 20,
        fontSize: 14,
    },
})