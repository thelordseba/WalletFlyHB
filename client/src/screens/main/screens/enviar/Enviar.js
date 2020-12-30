import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import api from '../../../../reducer/ActionCreator';
import Axios from "axios";
import { Appbar } from 'react-native-paper';
import styleInputs from '../../../registro/screens/styles/inputs/s';
import { APP_API } from "../../../../../env";
import AsyncStorage from "@react-native-community/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

export default function Enviar(props) {
  const [text, setText] = useState({
    email: "",
    amount: 0,
    title: "",
    description: "",
  });

  const user = useSelector(state => state.user);
  const dispatch = useDispatch()
  const { SALDO } = api
  const handleTextChange = (name, value) => {
    setText({ ...text, [name]: value });
  };
  const sendMoney = async () => {
    // const res = await LocalAuthentication.hasHardwareAsync();
    // if (!res) {
    //   return Alert.alert("Su dispositivo no soporta los metodos de login");
    // }
    // const autorization = await LocalAuthentication.supportedAuthenticationTypesAsync({});
    // if (!autorization) return Alert.alert("No autorizado");
    // const huella = await LocalAuthentication.isEnrolledAsync();
    // if (!huella) return Alert.alert("No tiene autorizacion");
    // const login = await LocalAuthentication.authenticateAsync("Ingrese su huella digital")
    // if (login.success) {
    //   Axios.get(`http://${APP_API}/users/getUserByEmail?email=${text.email}`) //trae el destinatario
    //     .then(({ data }) => {
    //       var contact = data;
    //       Axios.get(
    //         `http://${APP_API}/users/getUserByEmail/?email=${user.email}`
    //       )
    //         .then(({ data }) => {
    //           if (data.accounts[0].balance < text.amount) {
    //             alert("no posees el saldo suficiente");
    //           } else {
    //             Axios.post(
    //               `http://${APP_API}/transaction/${data.accounts[0].id}`,
    //               {
    //                 title: text.title,
    //                 description: text.description,
    //                 type: "egreso",
    //                 total: parseInt(text.amount, 10),
    //               }
    //             )
    //               .then(({ data }) => {
    //                 dispatch({
    //                   type: SALDO,
    //                   payload: data.balance
    //                 })
    //                 Axios.post(
    //                   `http://${APP_API}/transaction/${contact.accounts[0].id}`,
    //                   {
    //                     title: text.title,
    //                     description: text.description,
    //                     type: "ingreso",
    //                     total: parseInt(text.amount, 10),
    //                   }
    //                 )
    //                   .then(({ data }) => {
    //                     alert("Envio de dinero realizado con exito");
    //                     props.navigation.navigate('Home')
    //                   })
    //                   .catch((error) => {
    //                     console.log("error en el destinatario");
    //                     console.log(error);
    //                   });
    //               })
    //               .catch((error) => {
    //                 console.log("error en el envio");
    //                 console.log(error);
    //               });
    //           }
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       alert("el email no corresponde a un usuario");
    //     });
    // }
    
    Axios.get(`http://${APP_API}/users/getUserByEmail?email=${text.email}`) //trae el destinatario
      .then(({ data }) => {
        var contact = data;
        Axios.get(
          `http://${APP_API}/users/getUserByEmail/?email=${user.email}`
        )
          .then(({ data }) => {
            if (data.accounts[0].balance < text.amount) {
              alert("no posees el saldo suficiente");
            } else {
              Axios.post(
                `http://${APP_API}/transaction/${data.accounts[0].id}`,
                {
                  title: text.title,
                  description: text.description,
                  type: "egreso",
                  total: parseInt(text.amount, 10),
                }
              )
                .then(({data}) => {
                  dispatch({
                    type: SALDO,
                    payload: data.balance
                  })
                  Axios.post(
                    `http://${APP_API}/transaction/${contact.accounts[0].id}`,
                    {
                      title: text.title,
                      description: text.description,
                      type: "ingreso",
                      total: parseInt(text.amount, 10),
                    }
                  )
                    .then(({ data }) => {
                      alert("Envio de dinero realizado con exito");
                      props.navigation.navigate('Home')
                    })
                    .catch((error) => {
                      console.log("error en el destinatario");
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log("error en el envio");
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        alert("el email no corresponde a un usuario");
      });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Enviar Dinero" />
      </Appbar.Header>
      <View>
        <Text>Email del destinatario</Text>
        <TextInput
          style={styleInputs.inputs}
          placeholder="Ingrese el email"
          onChangeText={(value) => handleTextChange("email", value)}
        />
        <Text>Titulo</Text>
        <TextInput
          style={styleInputs.inputs}
          placeholder="Ingrese un titulo"
          onChangeText={(value) => handleTextChange("title", value)}
        />
        <Text>Descripcion</Text>
        <TextInput
          style={styleInputs.inputs}
          placeholder="Ingrese una descripcion"
          onChangeText={(value) => handleTextChange("description", value)}
        />
        <Text>Monto del envio</Text>
        <TextInput
          style={styleInputs.inputs}
          placeholder="ingrese el monto"
          onChangeText={(value) => handleTextChange("amount", value)}
        />
        <Button title="Enviar" onPress={() => sendMoney()} />
      </View>
    </>
  );
}
