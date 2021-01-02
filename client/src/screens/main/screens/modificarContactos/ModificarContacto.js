import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Appbar, Avatar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { APP_API } from "../../../../../env";
import api from "../../../../reducer/ActionCreator";
import { useDispatch } from "react-redux";


export default function ModificarContacto({ navigation, route }) {
  const { CONTACTOS } = api;
  const dispatch = useDispatch();
  const contactId = route.params.id;
  const userId = route.params.idUser;
  const Name = route.params.firstName + " " + route.params.lastName;
  const alias = route.params.alias;
  const email = route.params.email;
  const [value, setValue] = useState("");
  const [active, setActive] = useState(false);

  const handleEdit = (value) => {
    axios
      .put(`http://${APP_API}/contacts/${userId}?contactId=${contactId}`, {
        alias: value,
      })
      .then(({ data }) => {
        dispatch({
          type: CONTACTOS,
          payload: data,
        });
        navigation.navigate("Contactos");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    console.log(userId);
    console.log(contactId);
    axios
      .delete(`http://${APP_API}/contacts/${userId}?contactId=${contactId}`)

      .then(({ data }) => {
        dispatch({
          type: CONTACTOS,
          payload: data,
        });
        navigation.navigate("Contactos");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Contactos" />
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Avatar.Image
          size={100}
          source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGT5W0D9qW_SkbX2W1OR7vC_ttDmX0mNnBPg&usqp=CAU"
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontWeight: "700", marginRight: 5 }}>Alias: </Text>
            {active ? (
              <TextInput autoFocus onChangeText={(value) => setValue(value)} />
            ) : (
              <Text>{alias ? alias : Name}</Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => setActive(!active)}
            style={s.buttonEdit}
          >
            <Text>
              <MaterialCommunityIcons name="pencil" size={15} />
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Nombre: {Name}</Text>
          <Text>Email: {email}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleEdit(value)} style={s.button}>
        <Text>Aceptar Cambios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.button} onPress={() => handleDelete()}>
        <Text>Borrar Contacto</Text>
      </TouchableOpacity>
    </>
  );

}

const s = StyleSheet.create({
  buttonEdit: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginLeft: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 80,
  },
});
