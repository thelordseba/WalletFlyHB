import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { Array } from '../../../utils/ArrayContactos';
import { Avatar } from 'react-native-paper';

export default function Contactos() {
    return (
        <View style={s.container}>
            <Text style={s.textContato}>Contactos WalletFly</Text>
            <ScrollView>
                {Array && Array.map(el => (
                    <View style={s.containerView} key={el.id}>
                        <Avatar.Image size={40} source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGT5W0D9qW_SkbX2W1OR7vC_ttDmX0mNnBPg&usqp=CAU" />
                        <View style={s.containerViewNameTransferencia}>
                            <Text style={s.name}>{el.name}</Text>
                            <Text style={s.tranferencia}>{el.tranferencia}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
const s = StyleSheet.create({
    container: {
        backgroundColor: "#232323",
        width: '100%',
        flex: 1
    },
    textContato: {
        marginTop: 20,
        marginBottom: 20,
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        color: "#fff",
    },
    containerView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: '95%',
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 10,
        marginLeft: "auto",
        marginRight: "auto",
    },
    containerViewNameTransferencia: {
        marginLeft: 5,
    },
    name: {
        fontSize: 16,
        color: "#fff"
    },
    tranferencia: {
        fontSize: 11,
        color: "#aaa"
    }
})