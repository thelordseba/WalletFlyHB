import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { ScrollView } from "react-native-gesture-handler";

export default function Todo({ navigation }){

    const { todo } = useSelector(state => state.transacciones)
    return(
        <View style={{ flex: 1 }}>
            <ScrollView >
                {
                    todo && todo.transactions.map(el => (
                        <TouchableOpacity key={el.id} onPress={() => navigation.navigate("DetallesEstadistica", {id: el.id})}>
                            <View style={s.container} >
                                <View style={s.containerIconDireccion}>
                                    <View style={el.type === "ingreso" ? s.containerIconIngresaDinero : s.containerIconSaleDinero}>
                                        {el.type === "ingreso" ? <MaterialCommunityIcons name="currency-usd" size={20} /> : <MaterialCommunityIcons name="currency-usd-off" size={20} />}
                                    </View>
                                    <Text style={s.textDireccion}>{el.title}</Text>
                                </View>
                                <Text style={el.type === "ingreso" ? s.ingresaDinero : s.saleDinero}>
                                    ${el.total} ARS
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }         
            </ScrollView>
        </View>
    )
}
const s = StyleSheet.create({
    container: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#aaa"
    },
    containerIconDireccion: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    containerIconIngresaDinero: {
        backgroundColor: "#45aa45",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        width: 25,
        height: 25,
        color: "#fff"
    },
    containerIconSaleDinero: {
        backgroundColor: "#ff4545",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        width: 25,
        height: 25,
        color: "#fff"
    },
    textDireccion: {
        color: "#666",
        fontSize: 15,
        marginLeft: 5,
    },
    ingresaDinero: {
        color: "#45ff45"
    },
    saleDinero: {
        color: "#ff4545"
    }
})