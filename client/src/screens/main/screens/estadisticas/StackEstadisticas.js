import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Todo from './screens/Todo';
import Ingresos from './screens/Ingresos';
import Gastos from './screens/Gastos';
import { Appbar } from 'react-native-paper';
import { PieChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

export default function StackEstadisticas({ navigation }){
    const { ingreso, gasto } = useSelector(state => state.transacciones)

    const SumIngreso = () => {
        let suma = 0;
        ingreso && ingreso.map(el => {
                suma += el.total
            })
        return suma
    }
    const SumGastos = () => {
        let gastos = 0;
        gasto && gasto.map(el => {
            gastos += el.total
        })
        return gastos
    }
    const dataGrafico = [
        {
            name: "Ingresos",
            population: SumIngreso(),
            color: "#3d3",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Gastos",
            population: SumGastos(),
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
    ];
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
                <Appbar.Content title="Estadisticas" />
            </Appbar.Header>
            <Text style={{textAlign: "center", marginTop: 5, marginBottom: 5}}>Saldo Actual: $ {SumIngreso() - SumGastos()} ARS</Text>
            <PieChart
                data={dataGrafico}
                width={Dimensions.get('screen').width}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
            />
            <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity onPress={() => navigation.navigate('Ingresos')} >
                    <View style={s.containerIngresos} >
                        <Text style={{ fontSize: 14, color: "#fff" }}>Ingresos</Text>
                        <Text style={{ fontSize: 16, color: "#fff" }}>$ {SumIngreso()} ARS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Gastos')} >
                    <View style={s.containerGastos}>
                        <Text style={{ fontSize: 14, color: "#fff" }}>Gastos</Text>
                        <Text style={{ fontSize: 16, color: "#fff" }}>$ {SumGastos()} ARS</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Tab.Navigator>
                <Tab.Screen name="Todo" component={Todo} />
                <Tab.Screen name="Ingresos" component={Ingresos} />
                <Tab.Screen name="Gastos" component={Gastos} />
            </Tab.Navigator>
        </>
    )
}

const s = StyleSheet.create({
    containerIngresos: {
        display: 'flex', 
        alignItems: "center", 
        backgroundColor: "#3d3", 
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5, 
        borderRadius: 10,
        marginBottom: 20
    },
    containerGastos: {
        display: 'flex', 
        alignItems: "center", 
        backgroundColor: "#d33", 
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5, 
        borderRadius: 10,
        marginBottom: 20
    }
})