import Axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useSelector } from "react-redux";

export default function Enviar() {
  const [text, setText] = useState({
    email: "",
    amount: 0,
    title: "",
    description: "",
  });
  const [contact, setContact] = useState();
  const [me, setMe] = useState();

  const user = useSelector((state) => state.user);

  const handleTextChange = (name, value) => {
    setText({ ...text, [name]: value });
  };

  const sendMoney = () => {
    var next = false;
    Axios.get(`http://localhost:3001/users/getUserByEmail?email=${text.email}`) //trae el destinatario
      .then(({ data }) => {
        setContact(data);
        next = true;
      })
      .catch((error) => {
        alert("el email no corresponde a un usuario");
      });
    if (next === true) {
      next = false;
      Axios.get(
        `http://localhost:3001/users/getUserByEmail?email=${user.email}`
      )
        .then(({ data }) => {
          setMe(data);
        })
        .catch((error) => {
          console.log(error);
        });
      if (me.accounts[0].balance <= text.amount) {
        alert("no posees el saldo suficiente");
      } else {
        next = true;
      }
    }
    if (next === true) {
      Axios.post(`http://localhost:3001/transaction/${me.accounts[0].id}`, {
        title: text.title,
        description: text.description,
        type: "egreso",
        total: text.amount,
      })
        .then(({ data }) => {
          Axios.post(
            `http://localhost:3001/transaction/${contact.accounts[0].id}`,
            {
              title: text.title,
              description: text.description,
              type: "ingreso",
              total: text.amount,
            }
          )
            .then(({ data }) => {
              alert("Envio de dinero realizado con exito");
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
  };

  return (
    <View>
      <Text>Email del destinatario</Text>
      <TextInput
        placeholder="Ingrese el email"
        onChangeText={(value) => handleTextChange("email", value)}
      ></TextInput>
      <Text>Titulo</Text>
      <TextInput
        placeholder="Ingrese un titulo"
        onChangeText={(value) => handleTextChange("title", value)}
      ></TextInput>
      <Text>Descripcion</Text>
      <TextInput
        placeholder="Ingrese una descripcion"
        onChangeText={(value) => handleTextChange("description", value)}
      ></TextInput>
      <Text>Monto del envio</Text>
      <TextInput
        placeholder="ingrese el monto"
        onChangeText={(value) => handleTextChange("amount", value)}
      ></TextInput>
      <Button onPress={() => sendMoney()}>Enviar</Button>
    </View>
  );
}
