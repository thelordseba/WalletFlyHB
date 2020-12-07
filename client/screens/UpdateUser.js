import React, { useState } from "react";
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

const UpdateUserScreen = (props) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    documentType: "",
    documentNumber: "",
    phone: "",
  });
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const next = () => {
    if (
      state.firstName === "" ||
      state.lastName === "" ||
      state.birthdate === "" ||
      state.documentType === "" ||
      state.documentNumber === "" ||
      state.phone === ""
    ) {
      alert("Debes completar todos los campos antes de continuar.");
    } else {
      console.log(state);
      props.navigation.navigate("UpdateUserScreen2");
    }
  };

  return (
    <StyledScrollView>
      <StyledView>
        <StyledTextInput
          placeholder="Nombre(s)"
          onChangeText={(value) => handleTextChange("firstName", value)}
        />
      </StyledView>
      <StyledView>
        <StyledTextInput
          placeholder="Apellido(s)"
          onChangeText={(value) => handleTextChange("lastName", value)}
        />
      </StyledView>
      <StyledView>
        <StyledTextInput
          placeholder="Fecha de Nacimiento"
          onChangeText={(value) => handleTextChange("birthdate", value)}
        />
      </StyledView>
      <StyledView>
        <StyledTextInput
          placeholder="Tipo de Documento"
          onChangeText={(value) => handleTextChange("documentType", value)}
        />
      </StyledView>
      <StyledView>
        <StyledTextInput
          placeholder="Número de Documento"
          onChangeText={(value) => handleTextChange("documentNumber", value)}
        />
      </StyledView>
      <StyledView>
        <StyledTextInput
          placeholder="Teléfono"
          onChangeText={(value) => handleTextChange("phone", value)}
        />
      </StyledView>
      <View>
        <Button onPress={() => next()}>
          <WhiteText>Siguiente</WhiteText>
        </Button>
      </View>
    </StyledScrollView>
  );
};

export default UpdateUserScreen;
