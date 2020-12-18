import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from 'react-redux';
import { Button, Avatar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UserProfile(props) {
    const email = useSelector(state => state.email)
    const user = useSelector(state => state.user)
    const userLogin = useSelector(state => state.userLogin)

    return (
        <SafeAreaView>
            <View style={s.container}>
                <View style={s.containerImg}>
                    {/* en celular no muestra el icono, segun doc hay que importar img */}
                    <Avatar.Image size={70} source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGT5W0D9qW_SkbX2W1OR7vC_ttDmX0mNnBPg&usqp=CAU" /> 
                    <Text style={s.textUser}>{user ? user.firstName : userLogin.firstName} {user ? user.lastName : userLogin.lastName}</Text>
                    <Text style={s.textEmail}>{email ? email : userLogin.email}</Text>
                </View>
                <Button mode="outlined" onPress={() => props.navigation.push("DatosPersonales")}>
                    Mi Código QR
                </Button>
                <Button mode="outlined" onPress={() => props.navigation.push("DatosPersonales")}>
                    MI CVU
                </Button>
                <Button mode="outlined" onPress={() => props.navigation.push("DatosPersonales")}>
                    Datos Personales
                </Button>
                    
                
            </View>
        </SafeAreaView>
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