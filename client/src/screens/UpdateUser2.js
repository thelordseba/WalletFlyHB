import React, { useState } from "react";
import axios from "axios";
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

  const validateLoc = () => {
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
      let loc =
        state.address +
        "%20" +
        state.addressNumber +
        "," +
        state.city.replace(" ", "%20");
      let locURL = loc.replace(" ", "%20");
      fetch(
        `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${locURL}`
      )
        .then((res) => res.json())
        .then((respuesta) => {
          if (respuesta.errorMessage) {
            alert(
              respuesta.errorMessage,
              "Volver a ingresar los datos correctamente"
            );
            setState({
              address: "",
              addressNumber: "",
              postalCode: "",
              city: "",
              province: "",
              country: "",
            });
          } else {
            respuesta.direccionesNormalizadas.forEach((dir) => {    
            });
            createUser();
          }
        });
    }
  };

  const userID = props.route.params;

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
      axios.put(`http://localhost:3001/users/${userID}`, state)
      .then(() => {
        const accountNumber = Math.round(Math.random() * 100000 * userID);
        axios.post(`http://localhost:3001/accounts/${userID}`, {number: accountNumber, type: "Ahorro pesos"})
        .then(()=>{
          props.navigation.navigate("Login");
        })                
      });
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

      <WhiteText /*onPress={() => props.navigation.navigate("FAQ")} Hay que armar el componente> */ >
          ¿Necesitas ayuda?
        </WhiteText>

    </StyledScrollView>
  );
};

export default UpdateUserScreen;
