import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Home from './Home'
import Transacciones from './Transacciones';
import Contactos from './Contactos';
import UserProfile from './userProfile/UserProfile';
import { Avatar, Title, Caption, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import AssessmentIcon from "@material-ui/icons/Assessment";
import { useSelector } from 'react-redux';

export default function DrawerContent(props){
    const user = useSelector(state => state.user)
    const userLogin = useSelector(state => state.userLogin)
    const email = useSelector(state => state.email)
    const [ isDarkTheme, setIsDarkTheme ] = useState(false)
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={s.drawerContent}>
                    <View style={s.userInfoSection}>
                        <View style={{flexDirection: "row", marginTop: 15}}>
                            <Avatar.Image source={{uri: ""}} size={50}/>
                            <View style={{marginLeft: 15, flexDirection:"column"}}>
                                <Title style={s.title}>{user ? user.firstName: userLogin.firstName} {user ? user.lastName: userLogin.lastName}</Title>
                                <Caption style={s.caption}>{email ? email : userLogin.email}</Caption>
                            </View>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={s.drawerSection}>
                    <DrawerItem
                        name="Main"
                        icon={({ color, size }) => (
                            <HomeIcon color={color} size={size} />
                        )}
                        label="Home"
                        onPress={() => props.navigation.navigate('Main')}
                    />
                    <DrawerItem
                        name="Profile"
                        icon={({ color, size }) => (
                            <PersonIcon color={color} size={size} />
                        )}
                        label="Perfil"
                        onPress={() => props.navigation.navigate('UserProfile')}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <PermContactCalendarIcon color={color} size={size} />
                        )}
                        label="Contactos"
                        onPress={() => { }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <AssessmentIcon color={color} size={size} />
                        )}
                        label="Transacciones"
                        onPress={() => { }}
                    />
                </Drawer.Section>
                <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={() => toggleTheme()}>
                        <View style={s.preference}>
                            <Text>Tema Oscuro</Text>
                            <View pointerEvents="none">
                                <Switch value={isDarkTheme}/>
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={s.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) =>(
                        <ExitToAppIcon color={color} size={size}/>
                    )}
                    label="Cerrar sesión"
                    onPress={() => {}}
                />
            </Drawer.Section>
        </View>
    )
}

const s = StyleSheet.create({
    drawerContent:{
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
    drawerSection:{
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