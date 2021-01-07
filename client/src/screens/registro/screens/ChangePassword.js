import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

export default function ChangePassword({ navigation, route }) {

    const [state, setState] = useState({
        code: "",
        password: "",
        setNewPassword: "",
    });
    const [ newPassword, setNewPassword ] = useState(false)
    const email = route.params
    
    const onHandleChangePassword = () => {
        if(state.code === "" || state.password === "" || state.setNewPassword === ""){
            return alert('Ingrese todos los campos por favor')
        }else if(state.password !== state.setNewPassword){
            return alert("Las contraseñas no coinciden.")
        }else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(state.password)){
            return alert('Debes ingresar una contraseña de 8 caracteres alfanumericos y como mínimo una mayúscula.')
        }
        axios.get(`https://walletfly.glitch.me/users/getUserByEmail?email=${email}`)
        .then(({data}) => {
            if(data.segNumber == state.code){
                return axios.put(`https://walletfly.glitch.me/users/${data.id}`, {password: state.password})
            }else{
                return Alert.alert('El codigo ingresado es invalido')
            }
        })
        .then(() => {
            setNewPassword(!newPassword)
        })
        .catch(err => console.log(err))
    }
    const onHandleLogin = () => {
        navigation.navigate('WalletFly')
    }
    const handleTextChange = (name, value) => {
        setState({ ...state, [name]: value });
    };
    return (
        <>
        <View>
            <Text>{email}</Text>
            <TextInput
                placeholder="code"
                onChangeText={(value) => handleTextChange("code", value)}
            />
            <TextInput
                placeholder="password"
                onChangeText={(value) => handleTextChange("password", value)}
            />
            <TextInput
                placeholder="newpassword"
                onChangeText={(value) => handleTextChange("setNewPassword", value)}
            />
            <TouchableOpacity onPress={() => onHandleChangePassword()}>
                <Text>Aceptar</Text>
            </TouchableOpacity>
        </View>
            {newPassword &&
                <View style={s.containerAgregar}>
                    <View style={s.containerAgregar2}>
                        <Text style={{ marginTop: 40, marginBottom: 10 }}>
                            Contraseña Cambiada!!
                        </Text>
                        <TouchableOpacity onPress={() => onHandleLogin()}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            } 
        </>
    )
}
const s = StyleSheet.create({
    containerAgregar: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        top: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        width: "100%",
    },
    containerAgregar2: {
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
    },
    buttonClose: {
        position: "absolute",
        right: 10,
        top: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 60,
    },
})