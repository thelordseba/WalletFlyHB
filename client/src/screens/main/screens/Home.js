import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';
import axios from 'axios';
import api from '../../../reducer/ActionCreator'
import { Appbar } from 'react-native-paper';
import { diasDeSemana, diasMes, seisMeses, unAño } from '../../../utils/Days';
import { SieteDias, filtroMes, filtroSeisMeses, filtroUnAño } from '../../../utils/Valores'
import { APP_API } from "../../../../env";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import emptyAvatar from '../../../../assets/descarga.png'
import firebaseConfig from "../../../firebase/firebase-config.js";
import firebase from "firebase/app";
import 'firebase/storage';

firebase.initializeApp(firebaseConfig);

export default function Home({ navigation }) {
    const [value, setValue] = useState(0)  
    const user = useSelector(state => state.user)
    const userImage = useSelector(state => state.userImage)
    const saldo = useSelector(state => state.saldo)
    const { todo } = useSelector(state => state.transacciones)
    const { dialogVisible, showCode, enterCode, code } = useSelector(state => state.huella)
    const [ codeHuellaValue, setCodeHuellaValue ] = useState("")
    const dispatch = useDispatch()
    const { TRANSACCIONES, HUELLA, USER_IMAGE } = api
    const date = new Date();
    const day = date.getDay()
    let dayMonth = date.getDate()
    let currentYear = date.getFullYear();
    let month = date.getMonth()
    
    const CreatedAt = () => {
        todo && todo.transactions.map(el => {
            if (el.createdAt.indexOf('T') !== -1) {
                let indexT = el.createdAt.indexOf("T");
                let newCreatedAt = el.createdAt.slice(0, indexT);
                el.createdAt = newCreatedAt.split("-");
            }
        })
    }
    CreatedAt()
    const Datos = (args) => {
        switch (args) {
            case 2:
                return filtroMes(todo, dayMonth, month, currentYear)
            case 3:
                return filtroSeisMeses(todo, dayMonth, month, currentYear)
            case 4:
                return filtroUnAño(todo, dayMonth, month, currentYear)
            default:
                return SieteDias(todo, dayMonth, month, currentYear)
                //return [1,2,3,4,5,6,7];
        }
    }
    const Label = (args) => {
        switch (args) {
            case 2:
                return diasMes(dayMonth, month)
            case 3:
                return seisMeses(month)
            case 4:
                return unAño(month)
            default:
                return diasDeSemana(day)
        }
    }
    const onHandleHuella = () => {
        if(codeHuellaValue == code){
            dispatch({
                type: HUELLA,
                payload: {
                    active: false,
                    dialogVisible: false,
                    showCode: false,
                    code: false,
                    enterCode: false
                }
            })
            Alert.alert('Huella digital Desactivada')
        }else {
            dispatch({
                type: HUELLA,
                payload: {
                    active: true,
                    dialogVisible: false,
                    showCode: false,
                    code: code,
                    enterCode: false
                }
            })
            Alert.alert("El codigo ingresado es Incorrecto")
        }
    }
    useEffect(() => {
        axios.get(`https://${APP_API}/transaction/${user.id}`)
            .then(({ data }) => {
                dispatch({
                    type: TRANSACCIONES,
                    payload: {
                        todo: data,
                        ingreso: data.transactions.length ? data.transactions.filter(ingreso => ingreso.type === "ingreso") : false,
                        gasto: data.transactions.length ? data.transactions.filter(gasto => gasto.type === "egreso") : false,
                    }
                })
            })
            .catch(err => console.log(`Sucedio un error ${err}`))
    }, [saldo])

    useEffect(()=>{       
        firebase.storage().ref(`/profileImage/${user.email}`).getDownloadURL()  
        .then(image =>{                     
            dispatch({
                type: USER_IMAGE,
                payload: image
            });
        })
        .catch(error => {
            dispatch({
                type: USER_IMAGE,
                payload: false
            })
            //console.log(error);
        });               
    },[])

    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
                <Appbar.Content title={`Bienvenido ${user.firstName}`} />
            </Appbar.Header>
            <View style={s.container}>
                <View style={s.containerPerfil}>
                    <Avatar.Image size={70} source={{ uri: userImage ? userImage : emptyAvatar  }} />
                    <View style={s.containerNameEmail}>
                        <Text style={s.textNombre}>{user.firstName} {user.lastName}</Text>
                        <Text style={s.textEmail}>{user.email}</Text>
                    </View>
                </View>
                <View>
                    <Text style={s.balance}>Saldo ${todo && todo.balance} ARS</Text>
                    <LineChart
                        data={{
                            labels: Label(value),
                            datasets: [{ data: Datos(value) }]
                        }}
                        width={Dimensions.get('screen').width}
                        height={300}
                        yAxisLabel="$"
                        yAxisInterval={1}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2,
                            color: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 5
                        }}
                    />
                    <View style={s.textButton}>
                        <Text onPress={() => setValue(0)}>7 dias</Text>
                        <Text onPress={() => setValue(2)}>1 mes</Text>
                        <Text onPress={() => setValue(3)}>6 meses</Text>
                        <Text onPress={() => setValue(4)}>1 año</Text>
                    </View>
                </View>
                <View style={s.containerButton}>
                    <Button title="Recargar" onPress={() => navigation.navigate("EnEfectivo")} />
                    <Button title="Enviar" onPress={() => navigation.navigate("Enviar")} />
                </View>
            </View>
            {
                dialogVisible && showCode ?
                    <View style={s.containerAgregar}>
                        <View style={s.containerAgregar2}>
                            <TouchableOpacity onPress={() => {
                                dispatch({
                                    type: HUELLA,
                                    payload: {
                                        active: true,
                                        dialogVisible: false,
                                        showCode: false,
                                        code: code,
                                        enterCode: false
                                    }
                                })
                            }} style={s.buttonClose}>
                                <Text><MaterialCommunityIcons name="close" size={26} /></Text>
                            </TouchableOpacity>
                            <Text style={{ marginTop: 40, marginBottom: 10 }}>
                                Por su seguridad, se le pedirá este codigo, si quiere desactivar su huella digital. No la pierda!
                            </Text>
                            <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
                                {code && code}
                            </Text>
                        </View>
                    </View>
                    : null
            }
            {
                dialogVisible && enterCode ?
                    <View style={s.containerAgregar}>
                        <View style={s.containerAgregar2}>
                            <TouchableOpacity onPress={() => {
                                dispatch({
                                    type: HUELLA,
                                    payload: {
                                        active: true,
                                        dialogVisible: false,
                                        showCode: false,
                                        code: code,
                                        enterCode: false
                                    }
                                })
                            }} style={s.buttonClose}>
                                <Text><MaterialCommunityIcons name="close" size={26} /></Text>
                            </TouchableOpacity>
                            <Text style={{ marginTop: 40, marginBottom: 10 }}>
                                Ingrese el codigo de seguridad para desactivar su huella digital
                            </Text>
                            <TextInput
                                placeholder="Ingrese el codigo"
                                onChangeText={(e) => setCodeHuellaValue(e)}
                            />
                            <TouchableOpacity onPress={() => onHandleHuella()}>
                                <Text>Ingresar Codigo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : null
            }
        </>
    )
}
const s = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        // backgroundColor: "#22074d"
    },
    textBienvenida: {
        textAlign: "center",
        fontSize: 20,
        // color: "#49e1f4",
        marginTop: 10,
        marginBottom: 10,
    },
    containerPerfil: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 15,
    },
    containerNameEmail: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
    },
    textNombre: {
        // color: "#49e1f4",
        fontSize: 18,
    },
    textEmail: {
        // color: "#49e1f4",
        fontSize: 14,
    },
    containerButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
    },
    balance: {
        // color: "#49e1f4",
        fontSize: 20,
        marginTop: 15,
    },
    textButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 5,
        paddingLeft: 5,
    },
    containerAgregar:{
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        position: "absolute", 
        bottom: 0,
        top: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        width: '100%',
      },
      containerAgregar2:{
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
      },
      buttonClose:{
        position: "absolute",
        right: 10,
        top: 10,
        justifyContent:"center",
        alignItems: "center",
        borderWidth:1,
        width: 40,
        height:40,
        backgroundColor:'#fff',
        borderRadius: 60,
      },
      buttonAceptarCambios: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 30,
        marginLeft: "auto",
        marginRight: 'auto',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 80,
        marginTop: 20,
      }
});
