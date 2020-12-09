import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import AssessmentIcon from "@material-ui/icons/Assessment";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

export default function Footer(props) {
  return (
    <StyledView>
      <ButtonLink onPress={() => props.navigation.navigate("Main")}>
        <HomeIcon />
        Inicio
      </ButtonLink>
      <ButtonLink onPress={() => props.navigation.navigate("Transactions")}>
        <MonetizationOnIcon />
        Transferencias
      </ButtonLink>
      <ButtonLink onPress={() => props.navigation.navigate("Login")}>
        <AssessmentIcon />
        Estadisticas
      </ButtonLink>
      <ButtonLink onPress={() => props.navigation.navigate("UserProfile")}>
        <PersonIcon />
        Perfil
      </ButtonLink>
    </StyledView>
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
`;
const StyledView = styled.View`
  flex: 0.07;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  background-color: red;
`;
