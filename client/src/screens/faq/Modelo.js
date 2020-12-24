import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function Modelo({ title, icon }){
    return (
        <View style={s.container}>
            <Text style={{fontSize: 14}}>{title}</Text>
            <MaterialCommunityIcons name={`arrow-${icon ? "up" : "down"}-drop-circle-outline`} size={30} />
        </View>
    )
}
export function ModeloDrop({ text }){
    return (
        <View style={s.containerDrop}>
            <Text>{text}</Text>
        </View>
    )
}

const s = StyleSheet.create({
    container:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: "#e575ea",
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.5)',
    },
    containerDrop: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        marginBottom: 5
    }
})