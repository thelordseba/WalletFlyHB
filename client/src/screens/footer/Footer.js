import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export default function Footer(props) {
  return (
    <View style={s.container}>
      <ButtonLink onPress={() => props.navigation.navigate("Main")}>
        <HomeIcon/>
        Inicio
      </ButtonLink>
      <ButtonLink onPress={() => props.navigation.navigate("Transactions")}>
        <MonetizationOnIcon/>
        Transferencias
      </ButtonLink>
      <ButtonLink onPress={() => props.navigation.navigate("Login")}>
        <AssessmentIcon/>
        Estadisticas
      </ButtonLink>
      <ButtonLink onPress={() => props.navigation.navigate("UserProfile")}>
        <PersonIcon/>
        Perfil
      </ButtonLink>
    </View>
  );
}

const ButtonLink = styled.View`
    width: 40px;
    display: flex;
    align-items: center;
    height: 30px;
    color: #000;
    margin: 5px 0px;
    border-radius: 5px;
    font-size: 11px;
`
const s = StyleSheet.create({
  container: {
    flex: .07,
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    color: '#fff',
    backgroundColor: 'red'
  }
})