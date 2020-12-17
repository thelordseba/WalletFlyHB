import React, { useState } from "react";
import { View, TextInput, Image } from "react-native";
import styled from "styled-components/native";
import axios from 'axios';
import image from "../../assets/pagofacil.jpg";
import { useDispatch } from 'react-redux';
import api from '../reducer/ActionCreator';

const ChargeMoney = (props) => { 
  const [state, setState] = useState({
    codigo: "",
    monto: 0,
  });

  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  }; 
  const { SALDO } = api
  const dispatch = useDispatch()
  const {code, email} = props.route.params;
  console.log(code)
  const chargeMoney =  () => {
      if(code === parseInt(state.codigo)){
          const data = {
              title: 'PagoFacil',
              type: 'ingreso',
              description: 'Recarga de dinero a tavés de Pago Facil.',
              total: parseInt(state.monto , 10)
          };
          axios.post(`http://localhost:3001/transaction/byUserEmail/${email}`, data)
          .then(({data})=>{
              dispatch({
                type: SALDO,
                payload: data.balance
              })
              props.navigation.navigate('Home');               
          })
          .catch(error=>{
              console.log(error);
          });    
      }else{
          alert("El código ingresado no es correcto");
      }                         
  };
  
  return (
    <StyledScrollView>   
        <ImagenView>
            <View>                 
                <Image 
                style={{width: 300, height: 90}} 
                source={{uri: image }}
                />               
            </View>     
        </ImagenView>        
        
      <StyledView>
        <TextInput
          placeholder="Ingrese código de usuario"
          onChangeText={(value) => handleTextChange("codigo", value)}
        />
      </StyledView>
      <StyledView>
        <TextInput    
        //   keyboardType='numeric'    
          placeholder="Ingrese el monto de la recarga"
          onChangeText={(value) => handleTextChange("monto", value)}
        />
     
      </StyledView>         
        <Button primary onPress={() => chargeMoney()}>
          <WhiteText primary>Recargar dinero</WhiteText>
        </Button>      
    </StyledScrollView>
  );
};

const StyledScrollView = styled.ScrollView`
  flex: 1;
  background-color: #fafafa;
  padding: 2rem;
`;

const StyledView = styled.View`
  flex: 1.5rem;
  padding: 0rem;
  margin-bottom: 2rem;
  border-bottom-width: 0.1rem;
  border-bottom-color: #cccccc;
`;

const ImagenView = styled.View`
  flex: 1.5rem;
  padding: 0rem;
  margin-bottom: 7rem;
  border-bottom-width: 0.1rem;
  border-bottom-color: #cccccc;
`;

const Button = styled.TouchableOpacity`
  margin-top: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.primary ? "#FFDD00" : "#000000")};
  border-color: ${(props) => (props.primary ? "#000000" : "#FFDD00")};
`;

const WhiteText = styled.Text`
  font-size: 1rem;
  color: ${(props) => (props.primary ? "#000000" : "#FFDD00")};
  padding: 0.5rem;
  text-align: center;
`;

export default ChargeMoney;
