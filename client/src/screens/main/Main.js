import React from 'react';
// componentes
import Home from './screens/Home';
import Transacciones from './screens/Transacciones';
import UserProfile from './screens/userProfile/UserProfile';
import Contactos from './screens/Contactos';
// react navigation
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function Footer() {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#e91e63"
      //   style={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={26} color={color} />
            ),
          }} />
        <Tab.Screen
          name="Transacciones"
          component={Transacciones}
          options={{
            tabBarLabel: 'Transacciones',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="chart-bar" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={UserProfile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" size={26} color={color} />
            ),
          }} />
        <Tab.Screen
          name="Contactos"
          component={Contactos}
          options={{
            tabBarLabel: 'Contactos',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-plus" size={26} color={color} />
            ),
          }}
        />
    </Tab.Navigator>
  );
}

