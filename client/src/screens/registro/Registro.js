import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Register from './screens/Register';
import Login from './screens/Login';
import { Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();
export default function Registro(){
{/* Colocamos Logo o algo para decorar*/}
    return (
        <>
        {/* <Text>LOGO</Text> */}
        <Tab.Navigator>
            <Tab.Screen name="Iniciar sesión" component={Login} />
            <Tab.Screen name="Registrarse" component={Register} />
        </Tab.Navigator>
        </>
    )
}