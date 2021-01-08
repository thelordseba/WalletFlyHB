import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function PantallaWalletFly({ navigation }){
    return (
        <View>
            <Text>Estilos</Text>
            <TouchableOpacity onPress={() => navigation.navigate("WalletFly")}>
                <Text>COMENZAR</Text>
            </TouchableOpacity>
        </View>
    )
}