import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import axios from "axios";
import image from "../../assets/pagofacil.jpg";
import { useDispatch, useSelector } from "react-redux";
import api from "../reducer/ActionCreator";
import { Button, Dialog, Paragraph } from "react-native-paper";
import stylesInputs from "./registro/screens/styles/inputs/s";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { APP_API } from "../../env";

export default function ChargeMoney(props) {
  const [state, setState] = useState({
    codigo: "",
    monto: 0,
  });
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const hideDialog = () => {
    setVisible(!visible);
  };
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };
  const recarga = useSelector((state) => state.recarga);
  const { SALDO, RECARGA } = api;
  const dispatch = useDispatch();

  const cerrarPaypal = () => {
    dispatch({
      type: RECARGA,
      payload: {},
    });
    props.navigation.navigate("Home");
  };
  const chargeMoney = () => {
    if (recarga.code) {
      const data = {
        title: "PagoFacil",
        type: "ingreso",
        description: "Recarga de dinero a tavés de Pago Facil.",
        total: parseInt(state.monto, 10),
      };
      axios
        .post(
          `http://${APP_API}/transaction/byUserEmail/${recarga.email}`,
          data
        )
        .then(({ data }) => {
          dispatch({
            type: SALDO,
            payload: data.balance,
          });
          dispatch({
            type: RECARGA,
            payload: {},
          });
          props.navigation.navigate("Home");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setAlertMessage("El código ingresado no es correcto");
      setVisible(!visible);
    }
  };

  return (
    <View style={s.container}>
      <TouchableOpacity
        onPress={() => cerrarPaypal()}
        style={{ marginTop: 90, marginLeft: "auto" }}
      >
        <Text>
          <MaterialCommunityIcons name="close" color={"#0054a6"} size={26} />
        </Text>
      </TouchableOpacity>
      <View>
        <Image style={{ width: "100%", height: 150 }} source={image} />
        <View style={s.code}>
          <Text style={s.codeText}>{recarga.code}</Text>
        </View>
        <TextInput
          style={s.inputs}
          keyboardType="numeric"
          placeholder="Ingrese el monto de la recarga"
          onChangeText={(value) => handleTextChange("monto", value)}
        />

        <View style={s.containerButton}>
          <TouchableOpacity style={s.button} onPress={() => chargeMoney()}>
            <Text style={s.textButton}>Recargar Dinero</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>{alertMessage}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(!visible)}>Cerrar</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const s = StyleSheet.create({
  button: {
    backgroundColor: "rgb(255, 221, 0)",
    alignItems: "center",
    borderColor: "rgb(255, 221, 0)",
    width: "50%",
    height: "2.5rem",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  containerButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "0.5rem",
  },
  textButton: {
    color: "#ffffff",
    fontSize: "1rem",
    fontFamily: "Bree-Serif",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  inputs: {
    height: 40,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 5,
    alignSelf: "center",
    fontFamily: "OpenSans-Regular",
    placeholderTextColor: "#ec008c",
    borderColor: "#ec008c",
    width: "85%",
  },
  codeText: {
    fontSize: "1.5rem",
    textAlign: "center",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "3%",
    marginBottom: "3%",
    fontFamily: "Bree-Serif",
    color: "#0054a6",
  },
  code: {
    width: "95%",
    paddingBottom: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
