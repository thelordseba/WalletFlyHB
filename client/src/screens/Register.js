import React, { useState } from "react";
import axios from "axios";
import { View, TextInput } from "react-native";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import api from '../reducer/ActionCreator';

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
    passwordRepeat: ""
  });
  const { EMAIL } = api;
  const dispatch = useDispatch();
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const next = () => {  
    if (state.email === "" || state.password === "" || state.passwordRepeat === "") {
      alert("Debes completar todos los campos antes de continuar.");
    } else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(state.email)){
      alert("Ha introducido una dirección de email no valida.");      
    } else if(state.password !== state.passwordRepeat){
      alert("Comprueba tu contraseña.");
    } else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(state.password)){
      alert("Debe ingresar una contraseña de 8 caracteres alfanumericos y como mínimo una mayúscula.");
    } else {     
      axios.post(`http://localhost:3001/users/`, state)
        .then(({ data }) => {
          props.navigation.navigate("AuthEmail", data.user.id); //Le paso por props solo el userId que acabo de crear
          dispatch({
            type: EMAIL,
            payload: state.email
          })
        })
        .catch((error) => {
          alert(`Error! ${error}`)
        // alert("Este mail ya esta en uso" + error);
        });
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
          secureTextEntry={true}
          placeholder="Contraseña"
          onChangeText={(value) => handleTextChange("password", value)}
        />
      </StyledView>
      <StyledView>
        <TextInput
          secureTextEntry={true}
          placeholder="Repite tu contraseña"
          onChangeText={(value) => handleTextChange("passwordRepeat", value)} 
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
