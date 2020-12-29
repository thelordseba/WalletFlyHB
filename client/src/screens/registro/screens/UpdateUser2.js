import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import api from "../../../reducer/ActionCreator";
import { Button, Dialog, Paragraph } from "react-native-paper";
import stylesInputs from "./styles/inputs/s";

export default function UpdateUserScreen({ route, navigation }) {
  
  const [state, setState] = useState({
    id: route.params.id,
    birthdate: route.params.birthdate,
    documentNumber: route.params.documentNumber,
    email: route.params.email,
    firstName: route.params.firstName,
    lastName: route.params.lastName,
    phone: route.params.phone,
    address: "",
    addressNumber: "",
    postalCode: "",
    city: "",
    province: "",
    country: "",
    active: true,
  });
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const hideDialog = () => {
    setVisible(!visible);
  };
  const { USER } = api;
  const dispatch = useDispatch();
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
      setAlertMessage("Debes completar todos los campos antes de continuar.");
      setVisible(!visible);
    } else {
      axios
        .get(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${state.address} ${state.addressNumber}&localidad=${state.city}`)
        .then(({data}) => {
          console.log(data.direcciones[0])
          if(!data.direcciones[0]){
            setAlertMessage("Tu direccion no es valida");
            setVisible(!visible);
            return
          } else {
            let addressNueva = data.direcciones[0].calle.nombre;
            let addressNumberNueva = data.direcciones[0].altura.valor;
            let cityNueva = data.direcciones[0].localidad_censal.nombre; 
            console.log({"LA ADDRESS ES, ": addressNueva, "EL NUMBER ES, ": addressNumberNueva, "LA CITY ES, ": cityNueva});
            state.address = addressNueva;
            state.addressNumber = addressNumberNueva;
            state.city = cityNueva;
            console.log("EL STATE ESTA ASI: ", state);
          axios
            .put(`http://localhost:3001/users/${state.id}/userAccount`, state)
            .then(({ data }) => {
              dispatch({
                type: USER,
                payload: data,
              });
            })
          }
        })
        .then((data) => {
          console.log("OK")
        })
        .catch((err) => {
          setAlertMessage(`Error! ${err}`);
          setVisible(!visible);
        });
      }
  };
  const [error, setError] = useState("");
  useEffect(() => {
    if (
      !state.address ||
      !state.addressNumber ||
      !state.postalCode ||
      !state.city ||
      !state.province ||
      !state.country
    ) {
      setError("Este campo es obligatorio");
    } else {
      setError(null);
    }
  }, [state, setError]);

  return (
    <>
      <View>
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Dirección"
          onChangeText={(value) => handleTextChange("address", value)}
        />
        {!state.address && <Text style={s.error}>{error}</Text>}
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Número"
          onChangeText={(value) => handleTextChange("addressNumber", value)}
        />
        {!state.addressNumber && <Text style={s.error}>{error}</Text>}
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Código Postal"
          onChangeText={(value) => handleTextChange("postalCode", value)}
        />
        {!state.postalCode && <Text style={s.error}>{error}</Text>}
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Ciudad"
          onChangeText={(value) => handleTextChange("city", value)}
        />
        {!state.city && <Text style={s.error}>{error}</Text>}
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Provincia"
          onChangeText={(value) => handleTextChange("province", value)}
        />
        {!state.province && <Text style={s.error}>{error}</Text>}
        <TextInput
          style={stylesInputs.inputs}
          placeholder="País"
          onChangeText={(value) => handleTextChange("country", value)}
        />
        {!state.firstName && <Text style={s.error}>{error}</Text>}
        <Button mode="country" onPress={() => createUser()}>
          Crear Usuario
        </Button>
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
  error: {
    color: "#cB3065",
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 10,
  },
});
