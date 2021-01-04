import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../../reducer/ActionCreator';
import emptyAvatar from '../../../../assets/descarga.png'

export default function DrawerContent(props) {
    const user = useSelector(state => state.user)
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const userImage = useSelector(state => state.userImage)
    const huella = useSelector(state => state.huella)
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }
    const dispatch = useDispatch()
    const { USER, HUELLA } = api
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <MaterialCommunityIcons style={{ textAlign: "right", marginRight: 5 }} name="close-circle" size={30} onPress={() => props.navigation.toggleDrawer()} />
                <View style={s.drawerContent}>
                    <View style={s.userInfoSection}>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>

                        <Avatar.Image size={50} source={{ uri: userImage ? userImage : emptyAvatar }}/>

                            <View style={{ marginLeft: 15, flexDirection: "column" }}>
                                <Title style={s.title}>{user.firstName} {user.lastName}</Title>
                                <Caption style={s.caption}>{user.email}</Caption>
                            </View>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={s.drawerSection}>
                    <DrawerItem
                        name="Home"
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="home" size={size} color={color} />
                        )}
                        label="Home"
                        onPress={() => props.navigation.navigate('Home')}
                    />
                    <DrawerItem
                        name="Profile"
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="account" size={size} color={color} />
                        )}
                        label="Perfil"
                        onPress={() => props.navigation.navigate('Profile')}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="contacts" size={size} color={color} />
                        )}
                        label="Contactos"
                        onPress={() => props.navigation.navigate('Contactos')}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="chart-bar" size={size} color={color} />
                        )}
                        label="Estadisticas"
                        onPress={() => props.navigation.navigate('StackEstadisticas')}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="help-circle" size={size} color={color} />
                        )}
                        label="Ayuda"
                        onPress={() => props.navigation.navigate('QuestionAndAnswers')}
                    />
                </Drawer.Section>
                <Drawer.Section title="Configuración">
                    <TouchableRipple onPress={() => toggleTheme()}>
                        <View style={s.preference}>
                            <Text>Tema Oscuro</Text>
                            <View pointerEvents="none">
                                <Switch value={isDarkTheme} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {
                        let codigoHuella = huella.code ? huella.code : Math.round(Math.random() * 8999 + 1000);
                        if (!huella.active) {
                            dispatch({
                                type: HUELLA,
                                payload: {
                                    active: true,
                                    dialogVisible: true,
                                    showCode: true,
                                    enterCode: false,
                                    code: codigoHuella
                                }
                            })
                        }
                        if (huella.active) {
                            dispatch({
                                type: HUELLA,
                                payload: {
                                    active: true,
                                    dialogVisible: true,
                                    showCode: false,
                                    enterCode: true,
                                    code: codigoHuella
                                }
                            })
                        }
                        props.navigation.closeDrawer();
                        props.navigation.navigate("Home")
                    }}>
                        <View style={s.preference}>
                            <Text>Huella Digital</Text>
                            <View pointerEvents="none">
                                <Switch value={huella.active} />
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={s.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons name="exit-to-app" size={size} color={color} />
                    )}
                    label="Cerrar sesión"
                    onPress={() => {
                        props.navigation.closeDrawer();
                        dispatch({
                            type: USER,
                            payload: false
                        });
                    }}
                />
            </Drawer.Section>
        </View>
    )
}

const s = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: "bold"
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16
    },
})