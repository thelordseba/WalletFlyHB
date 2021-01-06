import React, { useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import api from "../../../../reducer/ActionCreator";
import { Appbar } from "react-native-paper";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function DatosPersonales({ navigation }) {
  const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(user.phone);
  const { USER } = api;
  const dispatch = useDispatch();

  const handleEdit = () => {
    axios
      .put(`https://walletfly.glitch.me/users/${user.id}`, { phone: text })
      .then(({ data }) => {
        setEdit(!edit);
        dispatch({
          type: USER,
          payload: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Appbar.Header
        style={{ backgroundColor: "#f23b6c", borderBottomColor: "#f23b6c" }}
      >
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Datos Personales" />
      </Appbar.Header>
      <View style={s.containerAll}>
        <View style={s.container}>
          <Text style={s.title}>Email:</Text>
          <Text style={s.text}>{user.email}</Text>
        </View>
        <View style={s.container}>
          <Text style={s.title}>Fecha de nacimiento:</Text>
          <Text style={s.text}>{user.birthdate}</Text>
        </View>
        <View style={s.container}>
          <Text style={s.title}>Telefono:</Text>

          {edit ? (
            <TextInput
              autoFocus
              onChangeText={(value) => setText(value)}
              defaultValue={user.phone}
            />
          ) : (
            <Text style={s.text}>{user.phone}</Text>
          )}
        </View>
        <View style={s.container}>
          <Text style={s.title}>Nº de documento:</Text>
          <Text style={s.text}>{user.documentNumber}</Text>
        </View>
        <View style={s.container}>
          <Text style={s.title}>Domicilio:</Text>
          <Text style={s.text}>
            {user.address} Nº {user.addressNumber}
          </Text>
        </View>
        <View style={s.container}>
          <Text style={s.title}>Código Postal:</Text>
          <Text style={s.text}>{user.postalCode}</Text>
        </View>
        <View style={s.container}>
          <Text style={s.title}>Localidad:</Text>
          <Text style={s.text}>{user.city}</Text>
        </View>
        <View style={s.container}>
          <Text style={s.title}>Provincia:</Text>
          <Text style={s.text}>{user.province}</Text>
        </View>
        <View style={s.container}>
          <Text style={s.title}>País:</Text>
          <Text style={s.text}>{user.country}</Text>
        </View>
        <View>
          {edit ? (
            <TouchableOpacity onPress={() => handleEdit()} style={s.button}>
              <Text style={s.textButton}>Guardar Cambios</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setEdit(!edit)} style={s.button}>
              <Text style={s.textButton}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}
const s = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  inputs: {
    height: 40,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: "OpenSans-Regular",
    borderColor: "#b58de8",
    width: "85%",
  },
  button: {
    borderWidth: 2,
    borderColor: "#f23b6c",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    padding: 5,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  textButton: {
    color: "#f23b6c",
    fontSize: 16,
    fontFamily: "Bree-Serif",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  title: { color: "#f23b6c", fontFamily: "Bree-Serif", fontWeight: "500" },
  text: { color: "#cb3065", fontFamily: "Bree-Serif" },
});
