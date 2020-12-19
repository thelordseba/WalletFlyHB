
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Appbar } from 'react-native-paper';

export default function Contactos(props) {
  const [text, setText] = useState({ email: "", alias: "" });
  const [contacts, setContacts] = useState([]);
  const user = useSelector((state) => state.user);

  const addContact = () => {
    axios
      .get(`http://localhost:3001/users/getUserByEmail/?email=${text.email}`)
      .then(({ data }) => {
        axios
          .post(
            `http://localhost:3001/contacts/${user.id}?contactId=${data.id}`
          )
          .then((data) => {
            console.log("contacto agregado");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (contacto) => {
    axios
      .delete(`http://localhost:3001/contacts/${user.id}?contactId=${contacto}`)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (contacto) => {
    axios
      .put(`http://localhost:3001/contacts/${user.id}?contactId=${contacto}`, {
        alias: text.alias,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/contacts/${user.id}`)
      .then((data) => {
        setContacts(data.data);
        console.log(data);
        console.log(contacts);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleTextChange = (name, value) => {
    setText({ ...text, [name]: value });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => props.navigation.toggleDrawer()} />
        <Appbar.Content title="Contactos" />
      </Appbar.Header>
    <View style={s.container}>
      <Text style={s.textContato}>Contactos WalletFly</Text>
      <ScrollView>
        {contacts.length &&
          contacts.map((el) => (
            <View style={s.containerView} key={el.id}>
              <Avatar.Image size={70} source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGT5W0D9qW_SkbX2W1OR7vC_ttDmX0mNnBPg&usqp=CAU" /> 
              <View style={s.containerViewNameTransferencia}>
                {!el.alias ? (
                  <Text style={s.name}>
                    {el.user.firstName + " " + el.user.lastName}
                  </Text>
                ) : (
                  <Text style={s.name}>{el.alias}</Text>
                )}
                <Text style={s.name}>{el.user.email}</Text>
                <TextInput
                  placeholder="alias"
                  onChangeText={(value) => handleTextChange("alias", value)}
                ></TextInput>
              </View>
              <Button
                onPress={() => handleEdit(el.contactId)}
                title="Editar"
              ></Button>
              <Button
                onPress={() => handleDelete(el.contactId)}
                title="Eliminar"
              />
            </View>
          ))}
        <View>
          <Text>Agregar contacto por Email</Text>
          <TextInput
            placeholder="Ingrese el email"
            onChangeText={(value) => handleTextChange("email", value)}
          ></TextInput>
          <Button onPress={() => addContact()} title="+" />

        </View>
      </ScrollView>
    </View>
    </>
  );
}
const s = StyleSheet.create({
  container: {
    backgroundColor: "#232323",
    width: "100%",
    flex: 1,
  },
  textContato: {
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#fff",
  },
  containerView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "95%",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  containerViewNameTransferencia: {
    marginLeft: 5,
  },
  name: {
    fontSize: 16,
    color: "#fff",
  },
  tranferencia: {
    fontSize: 11,
    color: "#aaa",
  },
});
