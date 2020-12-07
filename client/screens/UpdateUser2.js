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
  background-color: #582d66;
`;

const WhiteText = styled.Text`
  font-size: 1rem;
  color: #fafafa;
  padding: 0.5rem;
  text-align: center;
`;

const UpdateUserScreen = (props) => {
  const [state, setState] = useState({
    address: "",
    addressNumber: "",
    postalCode: "",
    city: "",
    province: "",
    country: "",
  });
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const createUser = () => {
    if (
      state.address === "" ||
      state.addressNumber === "" ||
      state.postalCode === "" ||
      state.city === "" ||
      state.province === "" ||
      state.country === ""
    ) {
      alert("Debes completar todos los campos antes de continuar.");
    } else {
      console.log(state);
      props.navigation.navigate("Login");
    }
  };

  return (
    <StyledScrollView>
      <StyledView>
        <TextInput
          placeholder="Dirección"
          onChangeText={(value) => handleTextChange("address", value)}
        />
      </StyledView>
      <StyledView>
        <TextInput
          placeholder="Número"
          onChangeText={(value) => handleTextChange("addressNumber", value)}
        />
      </StyledView>
      <StyledView>
        <TextInput
          placeholder="Código Postal"
          onChangeText={(value) => handleTextChange("postalCode", value)}
        />
      </StyledView>
      <StyledView>
        <TextInput
          placeholder="Ciudad"
          onChangeText={(value) => handleTextChange("city", value)}
        />
      </StyledView>
      <StyledView>
        <TextInput
          placeholder="Provincia"
          onChangeText={(value) => handleTextChange("province", value)}
        />
      </StyledView>
      <StyledView>
        <TextInput
          placeholder="País"
          onChangeText={(value) => handleTextChange("country", value)}
        />
      </StyledView>
      <View>
        <Button onPress={() => createUser()}>
          <WhiteText>Crear Usuario</WhiteText>
        </Button>
      </View>
    </StyledScrollView>
  );
};

export default UpdateUserScreen;
