import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from 'react-native';
import axios from 'axios';
import stylesInputs from "./styles/inputs/s";
import { Appbar } from 'react-native-paper';
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
            <StatusBar
                backgroundColor="#f23b6c"
                barStyle={"light-content"}
                style={{ alignSelf: "center" }}
            />
            <Appbar.Header style={{ backgroundColor: "#ffffff", height: 45 }}>
                <Appbar.Action
                    icon="arrow-left"
                    color="#F23B6C"
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content
                    title="Modificar Contraseña"
                    color="#F23B6C"
                    titleStyle={{
                        textAlign: "center",
                        fontFamily: "Bree-Serif",
                        paddingRight: 54,
                    }}
                />
            </Appbar.Header>
            <View style={s.containerAll}>
                <TouchableOpacity style={s.header}></TouchableOpacity>
                <Text style={s.textEmail}>{email}</Text>
                <TextInput
                    style={s.inputsLogin}
                    placeholder="Ingrese el codigo"
                    placeholderTextColor="#cb3065"
                    onChangeText={(value) => handleTextChange("code", value)}
                />
                <TextInput
                    style={s.inputsLogin}
                    placeholder="Ingrese su contraseña"
                    placeholderTextColor="#cb3065"
                    secureTextEntry={true}
                    onChangeText={(value) => handleTextChange("password", value)}
                />
                <TextInput
                    style={s.inputsLogin}
                    placeholder="Repita la Contraseña"
                    placeholderTextColor="#cb3065"
                    secureTextEntry={true}
                    onChangeText={(value) => handleTextChange("setNewPassword", value)}
                />
                <TouchableOpacity style={s.buttonSecondary} onPress={() => onHandleChangePassword()}>
                    <Text style={{color: "#f23b6c", fontFamily: "Bree-Serif"}}>ACEPTAR</Text>
                </TouchableOpacity>
            </View>
            {newPassword &&
                <View style={s.containerAgregar}>
                    <View style={s.containerAgregar2}>
                        <Text style={s.textEmail}>
                            Contraseña Cambiada!!
                        </Text>
                        <TouchableOpacity style={stylesInputs.button} onPress={() => onHandleLogin()}>
                            <Text style={{color: "#fff", fontFamily: "Bree-Serif"}}>Aceptar</Text>
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
    header: {
        width: "40%",
        alignSelf: "center",
        position: "absolute",
        borderBottomWidth: 2,
        borderBottomColor: "#f23b6c",
    },
    containerAll: {
        width: '100%',
        height: '100%',
        backgroundColor: "#ffffff",
    },
    inputsLogin: {
        height: 40,
        paddingLeft: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontFamily: "OpenSans-Regular",
        borderColor: "rgb(181,141,232)",
        width: "85%",
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttonSecondary: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#f23b6c",
        width: "50%",
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    textEmail: {
        color: "#f23b6c", 
        fontFamily: "Bree-Serif",
        textAlign: 'center',
        marginTop: 15
    }
})