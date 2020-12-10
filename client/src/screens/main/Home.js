import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';

export default function Home(props){
    return (
        <View>
            Hola
            <Button title="IR"  onPress={() => props.navigation.navigate("Transacciones")}/>
        </View>
    )
}