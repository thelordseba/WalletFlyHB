import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import api from "../../../reducer/ActionCreator";
import { Dialog, Paragraph } from "react-native-paper";
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
        .get(
          `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${state.address} ${state.addressNumber}&localidad=${state.city}`
        )
        .then(({ data }) => {
          console.log(data.direcciones[0]);
          if (!data.direcciones[0]) {
            setAlertMessage("Tu direccion no es valida");
            setVisible(!visible);
            return;
          } else {
            let addressNueva = data.direcciones[0].calle.nombre;
            let addressNumberNueva = data.direcciones[0].altura.valor;
            let cityNueva = data.direcciones[0].localidad_censal.nombre;
            console.log({
              "LA ADDRESS ES, ": addressNueva,
              "EL NUMBER ES, ": addressNumberNueva,
              "LA CITY ES, ": cityNueva,
            });
            state.address = addressNueva;
            state.addressNumber = addressNumberNueva;
            state.city = cityNueva;
            console.log("EL STATE ESTA ASI: ", state);

            axios
              .put(
                `https://walletfly.glitch.me/users/${state.id}/userAccount`,
                state
              )
              .then(({ data }) => {
                dispatch({
                  type: USER,
                  payload: data,
                });
              });
          }
        })
        .then((data) => {
          console.log("OK");
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
      <View style={stylesInputs.container}>
        <Text style={stylesInputs.inputsText}>Dirección</Text>
        <View style={stylesInputs.containerInputSolo}>
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Dirección"
            onChangeText={(value) => handleTextChange("address", value)}
          />
        </View>
        {!state.address && <Text style={stylesInputs.error}>{error}</Text>}
        <Text style={stylesInputs.inputsText}>Número</Text>
        <View style={stylesInputs.containerInputSolo}>
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Número"
            onChangeText={(value) => handleTextChange("addressNumber", value)}
          />
        </View>
        {!state.addressNumber && (
          <Text style={stylesInputs.error}>{error}</Text>
        )}
        <Text style={stylesInputs.inputsText}>Código Postal</Text>
        <View style={stylesInputs.containerInputSolo}>
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Código Postal"
            onChangeText={(value) => handleTextChange("postalCode", value)}
          />
        </View>
        {!state.postalCode && <Text style={stylesInputs.error}>{error}</Text>}
        <Text style={stylesInputs.inputsText}>Ciudad</Text>
        <View style={stylesInputs.containerInputSolo}>
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Ciudad"
            onChangeText={(value) => handleTextChange("city", value)}
          />
        </View>
        {!state.city && <Text style={stylesInputs.error}>{error}</Text>}
        <Text style={stylesInputs.inputsText}>Provincia</Text>
        <View style={stylesInputs.containerInputSolo}>
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="Provincia"
            onChangeText={(value) => handleTextChange("province", value)}
          />
        </View>
        {!state.province && <Text style={stylesInputs.error}>{error}</Text>}
        <Text style={stylesInputs.inputsText}>País</Text>
        <View style={stylesInputs.containerInputSolo}>
          <TextInput
            style={stylesInputs.inputsLogin}
            placeholder="País"
            onChangeText={(value) => handleTextChange("country", value)}
          />
        </View>
        {!state.firstName && <Text style={stylesInputs.error}>{error}</Text>}
        <View style={stylesInputs.containerButton}>
          <TouchableOpacity
            style={stylesInputs.buttonSecondary}
            onPress={() => createUser()}
          >
            <Text style={stylesInputs.textButtonSecondary}>Crear usuario</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text style={stylesInputs.dialogText}>{alertMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <TouchableOpacity
            style={stylesInputs.button}
            onPress={() => setVisible(!visible)}
          >
            <Text style={stylesInputs.textButton}>Cerrar</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
