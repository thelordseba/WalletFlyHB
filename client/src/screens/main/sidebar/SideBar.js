import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerContent from '../screens/DrawerContent';
import Main from '../Main';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()
// No borrar este archivo de momento, estoy haciendo pruebas (Maico)
export default function SideBar(props) {
    return (
        <>
            <Drawer.Navigator drawerStyle={{ width: 320 }} drawerContent={props => <DrawerContent {...props} />}>
                <Stack.Screen name="HomeDrawer" component={Main} />

            </Drawer.Navigator>
        </>
    )
}

