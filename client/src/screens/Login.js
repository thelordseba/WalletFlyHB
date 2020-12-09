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

const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const validateUser = () => {
    if (state.email === "" || state.password === "") {
      alert("Debes completar todos los campos antes de continuar.");
    } else {
      console.log(state);
      props.navigation.navigate("Main");
    }
  };

  return (
    <StyledScrollView>
      <StyledView>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => handleTextChange("email", value)}
        />
      </StyledView>
      <StyledView>
        <TextInput
          placeholder="Contraseña"
          onChangeText={(value) => handleTextChange("password", value)}
        />
      </StyledView>
      <View>
        <Button onPress={() => validateUser()}>
          <WhiteText>Ingresar</WhiteText>
        </Button>
      </View>
      <View>
        <Button primary onPress={() => props.navigation.navigate("CreateUser")}>
          <WhiteText primary>Crear Usuario</WhiteText>
        </Button>
      </View>
    </StyledScrollView>
  );
};

export default Login;