import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import api from "../../../../reducer/ActionCreator";
import Axios from "axios";
import { Appbar } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";

export default function Enviar(props) {
  const [text, setText] = useState({
    email: "",
    amount: 0,
    title: "",
    description: "",
  });

  const { active } = useSelector((state) => state.huella);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const saldo = useSelector((state) => state.saldo);
  const { todo } = useSelector((state) => state.transacciones);
  const { SALDO } = api;
  const userTransaction = user.firstName + " " + user.lastName
  const handleTextChange = (name, value) => {
    setText({ ...text, [name]: value });
  };


  /* useEffect(() => {
    var accountId;
    axios
      .get(
        `https://walletfly.glitch.me/users/getUserByEmail?email=${user.email}`
      )
      .then((data) => {
        accountId = data;
      })
      .catch((error) => console.log(error));
  }, []); */

  const sendMoney = async () => {
    let contact;
    let account;
    await Axios.get(`https://walletfly.glitch.me/users/${user.id}`)
      .then(({ data }) => {
        account = data.accounts[0].id;
      })
      .catch((error) => console.log(error));
    let saldoIngresado = parseInt(text.amount);
    if (text.amount > 0) {
      if (saldoIngresado <= todo.balance) {
        if (active) {
          const res = await LocalAuthentication.hasHardwareAsync();
          if (!res) {
            return Alert.alert(
              "Su dispositivo no soporta los metodos de login"
            );
          }
          const autorization = await LocalAuthentication.supportedAuthenticationTypesAsync(
            {}
          );
          if (!autorization) return Alert.alert("No autorizado");
          const huella = await LocalAuthentication.isEnrolledAsync();
          if (!huella) return Alert.alert("No tiene autorizacion");
          const login = await LocalAuthentication.authenticateAsync({
            promptMessage: "Ingrese su huella por favor",
          });
          if (login.success) {
            Axios.get(
              `https://walletfly.glitch.me/users/getUserByEmail?email=${text.email}`
            )
              .then(({ data }) => {
                contact = data;
              })
              .then((data) => {
                let contactUser = contact.firstName + " " + contact.lastName
                return Axios.post(
                  `https://walletfly.glitch.me/transaction/${account}`,
                  {
                    transactionUser: contactUser,
                    title: text.title,
                    description: text.description,
                    type: "egreso",
                    total: parseInt(text.amount, 10),
                  }
                );
              })
              .then(({ data }) => {
                dispatch({
                  type: SALDO,
                  payload: data.balance,
                });
                return Axios.post(
                  `https://walletfly.glitch.me/transaction/${contact.accounts[0].id}`,
                  {
                    transactionUser: transactionUser,
                    title: text.title,
                    description: text.description,
                    type: "ingreso",
                    total: parseInt(text.amount, 10),
                  }
                );
              })
              .then(({ data }) => {
                props.navigation.navigate("Home");
                Alert.alert("Envio de dinero realizado con exito");
              })
              .catch((err) => {
                Alert.alert("Ocurrio un Error!");
            
              });
          }
        } else {
          Axios.get(
            `https://walletfly.glitch.me/users/getUserByEmail?email=${text.email}`
          )
            .then(({ data }) => {
              contact = data;
            })
            .then((data) => {
              let contactUser = contact.firstName + " " + contact.lastName
              return Axios.post(
                `https://walletfly.glitch.me/transaction/${account}`,
                {
                  transactionUser: contactUser,
                  title: text.title,
                  description: text.description,
                  type: "egreso",
                  total: parseInt(text.amount, 10),
                }
              );
            })
            .then(({ data }) => {
              dispatch({
                type: SALDO,
                payload: data.balance,
              });
              
              return Axios.post(
                `https://walletfly.glitch.me/transaction/${contact.accounts[0].id}`,
                {
                  transactionUser: userTransaction,
                  title: text.title,
                  description: text.description,
                  type: "ingreso",
                  total: parseInt(text.amount, 10),
                }
              );
            })
            .then(({ data }) => {
              props.navigation.navigate("Home");
              Alert.alert("Envio de dinero realizado con exito");
            })
            .catch((err) => {
              Alert.alert("Ocurrio un Error!");
            });
        }
      } else {
        return alert("Saldo insuficiente");
      }
    } else {
      if (text.amount < 0) {
        return alert("No puedes ingresar numeros negativos");
      }
      if (text.amount == 0) {
        return alert("Ingresa un valor por favor");
      }
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor="#f23b6c"
        barStyle={"light-content"}
        style={{ alignSelf: "center" }}
      />
      <Appbar.Header style={{ backgroundColor: "#ffffff", height: 45 }}>
        <Appbar.Action
          icon="arrow-left"
          color="#F23B6C"
          onPress={() => props.navigation.goBack()}
        />
        <Appbar.Content
          title="Enviar Dinero"
          color="#F23B6C"
          titleStyle={{
            textAlign: "center",
            fontFamily: "Bree-Serif",
            paddingRight: 54,
          }}
        />
      </Appbar.Header>
      <View style={s.container}>
        <TouchableOpacity style={s.header}></TouchableOpacity>
        <Text style={s.inputsText}>Email del destinatario</Text>
        <View style={s.containerInput}>
          {!props.route.params ? (
            <TextInput
              style={s.inputs}
              placeholder="Ingrese el email"
              placeholderTextColor="#cb3065"
              onChangeText={(value) => handleTextChange("email", value)}
            />
          ) : (
            <TextInput
              style={s.inputs}
              defaultValue={props.route.params.email}
              onChangeText={(value) => handleTextChange("email", value)}
            />
          )}
        </View>
        <Text style={s.inputsText}>Titulo</Text>
        <View style={s.containerInput}>
          <TextInput
            style={s.inputs}
            placeholder="Ingrese un titulo"
            placeholderTextColor="#cb3065"
            onChangeText={(value) => handleTextChange("title", value)}
          />
        </View>
        <Text style={s.inputsText}>Descripcion</Text>
        <View style={s.containerInput}>
          <TextInput
            style={s.inputs}
            placeholder="Ingrese una descripcion"
            placeholderTextColor="#cb3065"
            onChangeText={(value) => handleTextChange("description", value)}
          />
        </View>
        <Text style={s.inputsText}>Monto del envio</Text>
        <View style={s.containerInput}>
          <TextInput
            placeholderTextColor="#cb3065"
            style={s.inputs}
            placeholder="ingrese el monto"
            onChangeText={(value) => handleTextChange("amount", value)}
          />
        </View>
        <View style={s.containerButton}>
          <TouchableOpacity style={s.button} onPress={() => sendMoney()}>
            <Text style={s.textButton}>Enviar dinero</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  header: {
    width: "40%",
    alignSelf: "center",
    position: "absolute",
    borderBottomWidth: 2,
    borderBottomColor: "#f23b6c",
  },
  inputsText: {
    fontSize: 16,
    color: "#F23B6C",
    marginLeft: "5%",
    fontFamily: "Bree-Serif",
    paddingLeft: 15,
    marginTop: 10,
  },
  inputs: {
    height: 40,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: "OpenSans-Regular",
    borderColor: "rgb(181,141,232)",
    width: "85%",
  },
  containerButton: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Bree-Serif",
    marginTop: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#f23b6c",
    width: "50%",
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 15,
  },
  textButton: {
    color: "#f23b6c",
    fontSize: 16,
    fontFamily: "Bree-Serif",
    textAlign: "center",
  },
});
