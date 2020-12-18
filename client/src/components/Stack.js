import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Tabs
import Main from '../screens/main/Main';
import Drawer from '../screens/main/screens/DrawerContent'
// screens
import AuthEmail from '../screens/registro/screens/AuthEmail';
import UpdateUser from '../screens/registro/screens/UpdateUser';
import UpdateUser2 from '../screens/registro/screens/UpdateUser2';
import RegistroLogin from '../screens/registro/Registro';

const Stack = createStackNavigator()
const HomeScreenStack = createStackNavigator()
const Drawer2 = createDrawerNavigator();

export default function MyStack() {

    const user = useSelector(state => state.userDirection)
    const userLogin = useSelector(state => state.userLogin)
    // const user = true
    return (
        <>
            { user || userLogin ?
                <Drawer2.Navigator drawerContent={props => <Drawer {...props} />}>
                    <Drawer2.Screen name="HomeDrawer" component={Main} />
                </Drawer2.Navigator>
                :
                <HomeScreenStack.Navigator>
                    <Stack.Screen name="WalletFly" component={RegistroLogin}/>
                    <Stack.Screen name="AuthEmail" component={AuthEmail} />
                    <Stack.Screen name="UpdateUser" component={UpdateUser} />
                    <Stack.Screen name="UpdateUser2" component={UpdateUser2} />
                </HomeScreenStack.Navigator>
            }
        </>
    )
}