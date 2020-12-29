import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function DetallesEstadistica({ navigation, route }){

    const { todo } = useSelector(state => state.transacciones)
    const transactionSelected = todo && todo.transactions.filter(el => el.id === route.params.id)
    console.log(transactionSelected)

    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
            </Appbar.Header>
            <View>
                <ScrollView>
                    <View>
                        <View style={{flexDirection: "column"}}>
                            <Text>Transacción creada el dia:</Text>
                            <Text>
                                {transactionSelected[0].createdAt[2]} / {transactionSelected[0].createdAt[1]} / {transactionSelected[0].createdAt[0]}
                            </Text>
                        </View>
                        <View style={{flexDirection: "column"}}>
                            <Text>Tipo de transacción:</Text>
                            <Text>{transactionSelected[0].type}</Text>
                        </View>
                        <Text>
                            Titulo: {transactionSelected[0].title}
                        </Text>
                        <Text>
                            Descripción: {transactionSelected[0].description}
                        </Text>
                        <Text>
                            Monto de la transaccion: $ {transactionSelected[0].total} ARS
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}