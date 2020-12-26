import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';
import axios from 'axios';
import api from '../../../reducer/ActionCreator'
import { Appbar } from 'react-native-paper';
import { diasDeSemana } from '../../../utils/Days';
import { SieteDias } from '../../../utils/Valores'

export default function Home({ navigation }) {
    const [value, setValue] = useState(0)
    const user = useSelector(state => state.user)
    const saldo = useSelector(state => state.saldo)
    const dispatch = useDispatch()
    const { todo } = useSelector(state => state.transacciones)
    const { TRANSACCIONES } = api
    const date = new Date();
    const day = date.getDay()
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
                return [200, 300, 10, 4, 3, 70, 10]
            case 3:
                return [1000, 750, 650, 2500]
            case 4:
                return [4000, 6500, 3400, 1200, 7000, 6400]
            default:
                return SieteDias(todo)
        }
    }
    const Label = (args) => {
        switch (args) {
            case 2:
                return ["1/4", "2/4", "3/4", "4/4"]
            case 3:
                return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
            case 4:
                return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            default:
                return diasDeSemana(day)
        }
    }
    useEffect(() => {
        axios.get(`http://192.168.0.2:3001/transaction/${user.id}`)
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
    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
                <Appbar.Content title={`Bienvenido ${user.firstName}`} />
                <Appbar.Action icon="chart-pie" onPress={() => navigation.navigate('StackEstadisticas')} />
            </Appbar.Header>
            <View style={s.container}>
                <View style={s.containerPerfil}>
                    <Avatar.Image size={70} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGT5W0D9qW_SkbX2W1OR7vC_ttDmX0mNnBPg&usqp=CAU" }} />
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
});
