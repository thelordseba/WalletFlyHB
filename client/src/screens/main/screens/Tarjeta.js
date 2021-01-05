import React from 'react';
import { View, Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
import CreditCardDisplay from 'react-native-credit-card-display';
import { useSelector } from 'react-redux';

export default function Tarjeta({ navigation }){

    const user = useSelector(state => state.user)
    let parteUno = Math.round(Math.random() * (9999 - 1000 + 1) + 1000);
    let parteDos = Math.round(Math.random() * (9999 - 1000 + 1) + 1000);
    let parteTres = Math.round(Math.random() * (9999 - 1000 + 1) + 1000);
    let parteCuatro = Math.round(Math.random() * (9999 - 1000 + 1) + 1000);
    parteUno = parteUno.toString()
    parteDos = parteDos.toString()
    parteTres = parteTres.toString()
    parteCuatro = parteCuatro.toString()
    let stringNumber = `${parteUno} ${parteDos} ${parteTres} ${parteCuatro}`
    console.log(stringNumber)
    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
                <Appbar.Content title="Tarjeta" />
            </Appbar.Header>
            <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
                <CreditCardDisplay
                    onFocused
                    cardStyles={{}}
                    flipped={true}
                    appStack
                    width={(Dimensions.get("screen").width) - 10}
                    cvc={963}
                    fontSize={15}
                    since="   2020"
                    name={`${user.firstName} ${user.lastName}`}
                    number={stringNumber.replace(/(.{4})/g, "$1 ").trim()}
                    expiration="   04/21"
                    scale={1.1}
                />
            </View>
        </>
    )
}