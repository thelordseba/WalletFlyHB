import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';

export default function UserProfile(props) {
    const email = useSelector(state => state.email)
    const user = useSelector(state => state.user)
    const userLogin = useSelector(state => state.userLogin)

    return (
        <SafeAreaView>
            <View style={s.container}>
                <View style={s.containerImg}>
                    <Avatar style={{ width: 200, height: 200, borderRadius: "50%" }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGT5W0D9qW_SkbX2W1OR7vC_ttDmX0mNnBPg&usqp=CAU' />
                    <Text style={s.textUser}>{user ? user.firstName : userLogin.firstName} {user ? user.lastName : userLogin.lastName}</Text>
                    <Text style={s.textEmail}>{email ? email : userLogin.email}</Text>
                </View>
                <View style={s.containerButtonIcon} onClick={() => alert("hola")}>
                    <Text style={s.ButtonText}>Mi Código QR</Text>
                    <NavigateNextIcon />
                </View>
                <View style={s.containerButtonIcon} onClick={() => alert("hola")}>
                    <Text style={s.ButtonText}>Mi CVU</Text>
                    <NavigateNextIcon />
                </View>
                <View style={s.containerButtonIcon} onClick={() => props.navigation.navigate("DatosPersonales")}>
                    <Text style={s.ButtonText}>Datos Personales</Text>
                    <NavigateNextIcon />
                </View>
            </View>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#232323',
        height: '100vh'
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
    containerButtonIcon: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        color: "#fff",
    },
    ButtonText: {
        color: '#fff'
    }
})