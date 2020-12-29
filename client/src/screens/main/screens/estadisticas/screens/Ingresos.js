import React from 'react';
import { Text, View, StyleSheet  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { ScrollView } from "react-native-gesture-handler";

export default function Ingresos() {

    const { ingreso } = useSelector(state => state.transacciones)
    return (
        <View style={{ flex: 1 }}>
            <ScrollView >
                {
                    ingreso && ingreso.map(el => (
                        <View style={s.container} key={el.id}>
                            <View style={s.containerIconDireccion}>
                                <View style={s.containerIconIngresaDinero}>
                                    <MaterialCommunityIcons name="currency-usd" size={20} />
                                </View>
                                <Text style={s.textDireccion}>{el.title}</Text>
                            </View>
                            <Text style={s.ingresaDinero}>${el.total} USD
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
    textDireccion: {
        color: "#666",
        fontSize: 15,
        marginLeft: 5,
    },
    ingresaDinero: {
        color: "#45ff45"
    },
})
