import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Appbar, Button } from 'react-native-paper';
import api from '../../../reducer/ActionCreator';
import styleInputs from '../../registro/screens/styles/inputs/s'

export default function Contactos(props) {

  const [text, setText] = useState({ email: "", alias: "" });
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const contactos = useSelector(state => state.contactos)
  const { CONTACTOS } = api;

  const addContact = () => {
    axios
      .get(`http://192.168.0.2:3001/users/getUserByEmail/?email=${text.email}`)
      .then(({ data }) => {
        axios
          .post(
            `http://192.168.0.2:3001/contacts/${user.id}?contactId=${data.id}`
          )
          .then(({ data }) => {
            dispatch({
              type: CONTACTOS,
              payload: data
            })
            setText({email: "", alias: ""})
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
      .delete(`http://192.168.0.2:3001/contacts/${user.id}?contactId=${contacto}`)
      .then(({ data }) => {
        dispatch({
          type: CONTACTOS,
          payload: data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (contacto) => {
    axios
      .put(`http://192.168.0.2:3001/contacts/${user.id}?contactId=${contacto}`, {
        alias: text.alias,
      })
      .then(({ data }) => {
        dispatch({
          type: CONTACTOS,
          payload: data
        })
        setText({email: "", alias: ""})
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  useEffect(() => {
    axios
      .get(`http://192.168.0.2:3001/contacts/${user.id}`)
      .then(({data}) => {
        dispatch({
          type: CONTACTOS,
          payload: data
        })
      })
      .catch((err) => console.error(err));
  },[]);

  const handleTextChange = (name, value) => {
    setText({ ...text, [name]: value });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => props.navigation.toggleDrawer()} />
        <Appbar.Content title="Contactos" />
      </Appbar.Header>
      <View>
        <Text>Contactos WalletFly</Text>
        <View>
          {
            contactos.length && contactos.map(el =>
              <View key={el.id}>
                <Avatar.Image size={70} source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGT5W0D9qW_SkbX2W1OR7vC_ttDmX0mNnBPg&usqp=CAU" />
                <View>
                  {
                    !el.alias ?
                      <Text>{el.user.firstName} {el.user.lastName}</Text>
                      :
                      <Text>{el.alias}</Text>
                  }
                  <Text>{el.user.email}</Text>
                  <TextInput
                    style={styleInputs.inputsLogin}
                    placeholder="Alias"
                    value={text.alias}
                    onChangeText={(value) => handleTextChange("alias", value)}
                  />
                </View>
                <Button mode="contained" onPress={() => handleEdit(el.contactId)}>
                  Editar
                </Button>
                <Button mode="contained" onPress={() => handleDelete(el.contactId)}>
                  Eliminar
                </Button>
              </View>
            )
          }
        </View>
        <View>
          <Text>Agregar contacto por Email</Text>
          <TextInput
            value={text.email}
            style={styleInputs.inputsLogin}
            placeholder="Ingrese el email"
            onChangeText={(value) => handleTextChange("email", value)}
          />
          <Button mode="contained" onPress={() => addContact()}>Agregar</Button>
        </View>
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

