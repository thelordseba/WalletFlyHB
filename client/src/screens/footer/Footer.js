import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../main/Home';
import Transacciones from '../main/Transacciones';
import UserProfile from '../userProfile/UserProfile';
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { createStackNavigator } from '@react-navigation/stack';
import DatosPersonales from '../userProfile/DatosPersonales'

const Tab = createMaterialBottomTabNavigator();
const SettingsStack = createStackNavigator();

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
            <HomeIcon style={{color: color}}/>
          ),
        }}
      />
      <Tab.Screen
        name="Transacciones"
        component={Transacciones}
        options={{
          tabBarLabel: 'Transacciones',
          tabBarIcon: ({ color }) => (
            <AssessmentIcon style={{color: color}}/>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile"
        // component={UserProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <PersonIcon style={{color: color}}/>
          ),
        }}>
        {() => (
          <SettingsStack.Navigator>
            <SettingsStack.Screen name="UserProfile" component={UserProfile}/>
            <SettingsStack.Screen name="DatosPersonales" component={DatosPersonales}/>
          </SettingsStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}





// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// import styled from "styled-components/native";
// import HomeIcon from "@material-ui/icons/Home";
// import PersonIcon from "@material-ui/icons/Person";
// import AssessmentIcon from "@material-ui/icons/Assessment";
// import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
// import Home from '../main/Home';
// import Transacciones from '../main/Transacciones';

// export default function Footer(props) {
 
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Transacciones" component={Transacciones} />
//     </Tab.Navigator>
    // <StyledView>
    //   <ButtonLink onPress={() => props.navigation.navigate("Main")}>
    //     <HomeIcon />
    //     Inicio
    //   </ButtonLink>
    //   <ButtonLink onPress={() => props.navigation.navigate("Transactions")}>
    //     <MonetizationOnIcon />
    //     Transferencias
    //   </ButtonLink>
    //   <ButtonLink onPress={() => props.navigation.navigate("Login")}>
    //     <AssessmentIcon />
    //     Estadisticas
    //   </ButtonLink>
    //   <ButtonLink onPress={() => props.navigation.navigate("UserProfile")}>
    //     <PersonIcon />
    //     Perfil
    //   </ButtonLink>
    // </StyledView>
//   );
// }

// const ButtonLink = styled.View`
//   width: 40px;
//   display: flex;
//   align-items: center;
//   height: 30px;
//   color: #000;
//   margin: 5px 0px;
//   border-radius: 5px;
//   font-size: 11px;
// `;
// const StyledView = styled.View`
//   flex: 0.07;
//   justify-content: space-around;
//   align-items: center;
//   color: #fff;
//   background-color: red;
// `;
