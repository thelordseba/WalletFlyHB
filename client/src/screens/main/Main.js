import React from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  margin-top: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background-color: #582d66;
`;

export default function Main() {
  return (
    <View>
      <ScrollView>
        <View>
          {/* Logo */}
          <Text>Saldo</Text>
          <Button>Cargar</Button>
          <Button>Enviar</Button>
        </View>
        <View>{/* Movimientos */}</View>
      </ScrollView>
    </View>
  );
}