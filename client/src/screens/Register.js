import React, { useState } from "react";
import axios from "axios";
import { View, TextInput } from "react-native";
import styled from "styled-components/native";

const StyledScrollView = styled.ScrollView`
  flex: 1;
  background-color: #fafafa;
  padding: 2rem;
`;

const Button = styled.TouchableOpacity`
  margin-top: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: 0.5rem;
  background-color: #582d66;
`;

const StyledTextInput = styled.TextInput`
  color: #22074d;
`;

const StyledView = styled.View`
  flex: 1.5rem;
  padding: 0rem;
  margin-bottom: 1rem;
  border-bottom-width: 0.1rem;
  border-bottom-color: #cccccc;
`;

const WhiteText = styled.Text`
  font-size: 1rem;
  color: #fafafa;
  padding: 0.5rem;
  text-align: center;
`;

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const next = () => {
    if (state.email === "" || state.password === "") {
      alert("Debes completar todos los campos antes de continuar.");
    } else {
      console.log(state);
      axios
        .post(`http://localhost:3001/users/`, state)
        .then(({ data }) => {
          console.log(data);

          props.navigation.navigate("UpdateUser", { user: data });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <StyledScrollView>
      <StyledView>
        <StyledTextInput
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
      <StyledView>
        <TextInput
          placeholder="Repite tu contraseña"
          // onChangeText={(value) => reviewPassword()} Esta hay que crearla!!
        />
      </StyledView>
      <View>
        <Button onPress={() => next()}>
          <WhiteText>Registrarme</WhiteText>
        </Button>
      </View>
      <View>
        <WhiteText //onPress={() => props.navigation.navigate("FAQ")} Hay que armar el componente>
        >
          ¿Necesitas ayuda?
        </WhiteText>
      </View>
    </StyledScrollView>
  );
};

export default CreateUserScreen;
