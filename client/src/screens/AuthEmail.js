import React, { useState } from "react";
import { View, TextInput } from "react-native";
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
  border-bottom-width: 0.1rem;
  border-bottom-color: #cccccc;
`;

const Button = styled.TouchableOpacity`
  margin-top: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.primary ? "#582d66" : "white")};
  border-color: ${(props) => (props.primary ? "white" : "#582d66")};
`;

const WhiteText = styled.Text`
  font-size: 1rem;
  color: ${(props) => (props.primary ? "#fafafa" : "#582d66")};
  padding: 0.5rem;
  text-align: center;
`;

const AuthEmail = (props) => {
  const [authCode, setAuthCode] = useState("");

  const handleTextChange = (value) => {
    setAuthCode(value);
  };

  const authenticateEmail = () => {
      const userCode = "123456"; //Acá va el código que se generó al registrar el user. ESTA HARCODEADO      
      if(userCode === authCode){                
        props.navigation.navigate("UpdateUser", props.route.params); //Le paso a UpdateUser solo el userId como props
      }else {
          alert("El código de autenticación es incorrecto.");
      }
  };

  return (
    <StyledScrollView>
      <StyledView>
        <TextInput
          placeholder="Ingrese el código"
          onChangeText={(value) => handleTextChange(value)}
        />
      </StyledView>

      <View>
        <Button onPress={() => authenticateEmail()}>
          <WhiteText>Siguiente</WhiteText>
        </Button>
      </View>      
      <View>
      <WhiteText /*onPress={() => props.navigation.navigate("FAQ")} Hay que armar el componente> */ >
          ¿Necesitas ayuda?
        </WhiteText>
      </View>
    </StyledScrollView>
  );
};

export default AuthEmail;
