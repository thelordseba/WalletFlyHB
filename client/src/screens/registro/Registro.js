import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Register from './screens/Register';
import Login from './screens/Login';
import { Text, View } from 'react-native';

const Tab = createMaterialTopTabNavigator();
export default function Registro(props){
{/* Colocamos Logo o algo para decorar*/}
    return (
        <>
            <Text>Aqui va un logo, o lo que sea</Text>
            <Tab.Navigator>
                <Tab.Screen name="Iniciar sesión" component={Login} />
                <Tab.Screen name="Registrarse" component={Register} />
            </Tab.Navigator>
        </>
    )
}