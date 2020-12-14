import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PorTranferencia from './screens/PorTranferencia';
import EnEfectivo from './screens/EnEfectivo';
import { View, Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();
export default function Recargar(){
    return (
      
        <Tab.Navigator>
            <Tab.Screen name="Por tranferencia" component={PorTranferencia} />
            <Tab.Screen name="En efectivo" component={EnEfectivo} />
        </Tab.Navigator>
  
    )
}




