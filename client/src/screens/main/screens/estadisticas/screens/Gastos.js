import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from "react-native-gesture-handler";

export default function Gastos(){
    const { gasto } = useSelector(state => state.transacciones)
    return(
        <View style={{ flex: 1 }}>
            <ScrollView >
                {
                    gasto && gasto.map(el => (
                        <View style={s.container} key={el.id}>
                            <View style={s.containerIconDireccion}>
                                <View style={s.containerIconSaleDinero}>
                                    <MaterialCommunityIcons name="currency-usd-off" size={20} />
                                </View>
                                <Text style={s.textDireccion}>{el.title}</Text>
                            </View>
                            <Text style={s.saleDinero}>${el.total} USD
                        </Text>
                        </View>
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
    saleDinero: {
        color: "#ff4545"
    }
})