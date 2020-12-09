import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const StyledScrollView = styled.ScrollView`
  flex: 1;
  background-color: #fafafa;
  padding: 2rem;
`;

const StyledView = styled.View`
  flex: 1.5rem;
  padding: 0rem;
  margin-bottom: 1rem;
`;

const WhiteText = styled.Text`
  font-size: 1rem;
  color: ${(props) => (props.primary ? "#fafafa" : "#582d66")};
  padding: 0.5rem;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  margin-top: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.primary ? "#582d66" : "white")};
  border-color: ${(props) => (props.primary ? "white" : "#582d66")};
`;

export default function Main() {
  return (
    <StyledScrollView>
      <StyledView>
        {/* Logo */}
        <Text>Saldo</Text>
        <Button>
          <WhiteText>Cargar</WhiteText>
        </Button>
        <Button primary>
          <WhiteText primary>Enviar</WhiteText>
        </Button>
      </StyledView>
      <StyledView>{/* Movimientos */}</StyledView>
    </StyledScrollView>
  );
}
