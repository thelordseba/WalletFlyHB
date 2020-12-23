import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Tabs
import Main from '../screens/main/Main';
import AuthEmail from '../screens/registro/screens/AuthEmail';
import UpdateUser from '../screens/registro/screens/UpdateUser';
import UpdateUser2 from '../screens/registro/screens/UpdateUser2';
import RegistroLogin from '../screens/registro/Registro';
import ChargeMoney from '../screens/ChargeMoney';
import QuestionAndAnswers from '../screens/faq/QuestionAndAnswers';
import UserProfile from '../screens/main/screens/userProfile/UserProfile';
import DatosPersonales from '../screens/main/screens/userProfile/DatosPersonales';
import Enviar from '../screens/main/screens/enviar/Enviar';
import ModificarContacto from '../screens/main/screens/modificarContactos/ModificarContacto';

// import SideBar from '../screens/main/sidebar/SideBar';
import SideBar from '../screens/main/screens/DrawerContent';
import EnEfectivo from '../screens/main/screens/recargar/EnEfectivo';
import StackEstadisticas from '../screens/main/screens/estadisticas/StackEstadisticas';


const Stack = createStackNavigator()
const HomeScreenStack = createStackNavigator()
const Drawer = createDrawerNavigator();

export default function MyStack(props) {

    const user = useSelector(state => state.user)
    const activate = useSelector(state => state.activate)
    // const user = true
    return (
        <>
            {
                activate ?
                    <ChargeMoney /> : user ?
                        <Drawer.Navigator drawerStyle={{ width: 320 }} drawerContent={props => <SideBar {...props} />} >
                            <Stack.Screen name="HomeDrawer" component={Main} />
                            <Stack.Screen name="UserProfile" component={UserProfile} />
                            <Stack.Screen name="DatosPersonales" component={DatosPersonales} />
                            <Stack.Screen name="EnEfectivo" component={EnEfectivo} />
                            <Stack.Screen name="Enviar" component={Enviar} />
                            <Stack.Screen name="QuestionAndAnswers" component={QuestionAndAnswers} />
                            <Stack.Screen name="ModificarContacto" component={ModificarContacto} />
                            <Stack.Screen name="StackEstadisticas" component={StackEstadisticas} />
                        </Drawer.Navigator>
                        // NO BORRAR ESTO, ESTOY HACIENDO PRUEBAS PARA NO REPETIR CODIGO..... (Maico)

                        // <HomeScreenStack.Navigator drawerStyle={{ width: 320 }} drawerContent={props => <SideBar {...props} />}>
                        //     <Stack.Screen name="SideBar" component={SideBar}/>
                        //     <Stack.Screen name="HomeDrawer" component={Main} />
                        //     <Stack.Screen name="UserProfile" component={UserProfile} />
                        //     <Stack.Screen name="DatosPersonales" component={DatosPersonales} />
                        //     <Stack.Screen name="Recargar" component={Recargar} />
                        //     <Stack.Screen name="Enviar" component={Enviar} />
                        // </HomeScreenStack.Navigator>
                        :
                        <>
                            <HomeScreenStack.Navigator screenOptions={({ navigation }) => ({
                                headerStyle: {
                                    backgroundColor: "#22074D"
                                },
                                headerTitle: "",
                                headerRight: () => (
                                    <MaterialCommunityIcons name="help-circle" size={26} color="#fff" style={{ marginRight: 10 }} onPress={() => navigation.navigate("QuestionAndAnswers")} />
                                ),
                                headerLeft: ({ canGoBack, onPress }) =>
                                    canGoBack && (
                                        <MaterialCommunityIcons name="arrow-left" size={26} color="#fff" style={{ marginLeft: 10 }} onPress={onPress} />
                                    )
                            })}>
                                <Stack.Screen name="WalletFly" component={RegistroLogin} />
                                <Stack.Screen name="AuthEmail" component={AuthEmail} />
                                <Stack.Screen name="UpdateUser" component={UpdateUser} />
                                <Stack.Screen name="UpdateUser2" component={UpdateUser2} />
                                <Stack.Screen name="QuestionAndAnswers" component={QuestionAndAnswers} />
                            </HomeScreenStack.Navigator>
                        </>
            }
        </>
    )
}      
