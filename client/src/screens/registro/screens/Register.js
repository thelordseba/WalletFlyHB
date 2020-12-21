import React, { useState } from "react";
import axios from "axios";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Button, Dialog, Paragraph } from 'react-native-paper'
import stylesInputs  from './styles/inputs/s'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CreateUserScreen(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordRepeat: ""
  });
  const [visible, setVisible] = useState(false)
  const [ alertMessage, setAlertMessage ] = useState("")
  const hideDialog = () => {
    setVisible(!visible)
  }
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };
  const next = () => {  
    if (state.email === "" || state.password === "" || state.passwordRepeat === "") {
      setAlertMessage("Debes completar todos los campos antes de continuar.")
      setVisible(!visible)
    } else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(state.email)){
      setAlertMessage("Ha introducido una dirección de email no valida.") 
      setVisible(!visible)  
    } else if(state.password !== state.passwordRepeat){
      setAlertMessage("Comprueba tu contraseña.")
      setVisible(!visible)
    } else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(state.password)){
      setAlertMessage("Debe ingresar una contraseña de 8 caracteres alfanumericos y como mínimo una mayúscula.")
      setVisible(!visible)
    } else {    
      axios.post(`http://192.168.0.2:3001/userEmail`, state)
        .then(({ data }) => {
          props.navigation.navigate("AuthEmail", {id: data.user.id, state});
        })
        .catch((error) => {
          setAlertMessage(`Error! ${error}`)
          setVisible(!visible)
        });
    }
  };

  return (
    <>
      <View>
        <Text style={s.text}>Email</Text>
        <View style={s.containerInput}>
          <MaterialCommunityIcons name="account-outline" size={20} />
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Ingrese su Email"
            onChangeText={(value) => handleTextChange("email", value)}
          />
        </View>
        <Text style={s.text}>Contraseña</Text>
        <View style={s.containerInput}>
          <MaterialCommunityIcons name="lock-outline" size={20} />
          <TextInput
            style={stylesInputs.inputsLogin}
            secureTextEntry={true}
            placeholder="Ingrese su contraseña"
            onChangeText={(value) => handleTextChange("password", value)}
          />
        </View>
        <Text style={s.text}>Repita su contraseña</Text>
        <View style={s.containerInput}>
          <MaterialCommunityIcons name="lock-outline" size={20} />
          <TextInput
            style={stylesInputs.inputsLogin}
            secureTextEntry={true}
            placeholder="Repita su contraseña"
            onChangeText={(value) => handleTextChange("passwordRepeat", value)}
          />
        </View>
        <Button style={{marginTop: 20}} mode="contained" onPress={() => next()}>Registarme</Button>
      </View>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>{alertMessage}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(!visible)}>Cerrar</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  text: {
    fontSize: 13,
    color: '#999',
    marginLeft: 10,
    marginTop: 10
  },

})
