import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Appbar } from "react-native-paper";
import api from "../../../reducer/ActionCreator";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

export default function Contactos({ navigation }) {
  const [text, setText] = useState({ email: "", alias: "" });
  const user = useSelector((state) => state.user);
  const userImage = useSelector((state) => state.userImage);
  const dispatch = useDispatch();
  const contactos = useSelector((state) => state.contactos);
  const { CONTACTOS } = api;
  const [visible, setVisible] = useState(false);
  const emptyAvatar = require("../../../../assets/Avatar.png");

  const addContact = () => {
    axios
      .get(
        `https://walletfly.glitch.me/users/getUserByEmail/?email=${text.email}`
      )
      .then(({ data }) => {
        axios
          .post(
            `https://walletfly.glitch.me/contacts/${user.id}?contactId=${data.id}`
          )
          .then(({ data }) => {
            dispatch({
              type: CONTACTOS,
              payload: data,
            });
            setVisible(!visible);
            setText({ email: "", alias: "" });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* const handleDelete = (contacto) => {
    axios
      .delete(`http://${APP_API}/contacts/${user.id}?contactId=${contacto}`)

      .then(({ data }) => {
        dispatch({
          type: CONTACTOS,
          payload: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }; */
  console.log(user.id);
  useEffect(() => {
    axios
      .get(`https://walletfly.glitch.me/contacts/${user.id}`)
      .then(({ data }) => {
        if (data.length) {
          dispatch({
            type: CONTACTOS,
            payload: data,
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleTextChange = (name, value) => {
    setText({ ...text, [name]: value });
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
          icon="menu"
          color="#F23B6C"
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content
          title="Contactos"
          color="#F23B6C"
          titleStyle={{
            textAlign: "center",
            fontFamily: "Bree-Serif",
            paddingRight: 54,
          }}
        />
      </Appbar.Header>
      <View style={s.containerAll}>
        <TouchableOpacity style={s.header}></TouchableOpacity>
        <ScrollView>
        <View style={s.container}>
          {contactos &&
            contactos.map((el) => (
              <TouchableOpacity
                key={el.id}
                onPress={() =>
                  navigation.navigate("ModificarContacto", {
                    id: el.contactId,
                    idUser: user.id,
                    firstName: el.user.firstName,
                    lastName: el.user.lastName,
                    alias: el.alias,
                    email: el.user.email,
                  })
                }
              >
                <View style={s.containerView}>
                  <View style={s.containerNameAvatar}>
                    <Avatar.Image
                      size={50}
                      source={{
                        // uri: userImage ? userImage : emptyAvatar,
                        uri: emptyAvatar,
                      }}
                    />
                    <View style={s.containerNameEmail}>
                      {!el.alias ? (
                        <Text style={s.name}>
                          {el.user.firstName} {el.user.lastName}
                        </Text>
                      ) : (
                        <Text style={s.name}>{el.alias}</Text>
                      )}
                      <Text style={s.textEmail}>{el.user.email}</Text>
</View>

                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    ></View>
                  </View>
                </TouchableOpacity>
              ))}
            {contactos.length === 0 ? (
              <>
                <Text
                  style={{
                    fontSize: 25,
                    textAlign: "center",
                    color: "#F23B6C",
                    padding: 10,
                    fontFamily: "Bree-Serif",
                  }}
                >
                  Aún no tienes ningun amigo
                </Text>
                <Image
                  style={{
                    width: 200,
                    height: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  source={{
                    uri: require("../../../images/Icon.png"),
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: "center",
                    padding: 5,
                    fontFamily: "OpenSans-Regular",
                    color: "#cb3065",
                  }}
                >
                  ¿Que tal si comenzás agregando a las personas que conozcas?
                </Text>
              </>
            ) : null}
          </View>
        </ScrollView>

        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "#F23B6C",
            marginBottom: "20px",
            marginRight: "50px",
            fontFamily: "Bree-Serif",
          }}
        >
          Agregar amigos
        </Text>
        <TouchableOpacity onPress={() => setVisible(!visible)} style={s.button}>
          <MaterialCommunityIcons name="plus" size={20} color={"#F23B6C"} />
        </TouchableOpacity>
      </View>

      {visible ? (
        <View style={s.containerAgregar}>
          <View style={s.containerAgregar2}>
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              style={s.buttonClose}
            >
              <Text>
                <MaterialCommunityIcons
                  name="close"
                  size={26}
                  color="#F23B6C"
                />
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 40,
                marginBottom: 10,
                color: "#F23B6C",
                fontSize: 18,
                fontFamily: "Bree-Serif",
              }}
            >
              Agregar Contacto
            </Text>
            <TextInput
              style={{
                fontFamily: "OpenSans-Regular",
              }}
              value={text.email}
              placeholderTextColor="#cb3065"
              placeholder="Ingrese el email"
              onChangeText={(value) => handleTextChange("email", value)}
            />
            <TouchableOpacity
              onPress={() => addContact()}
              style={s.buttonAceptarCambios}
            >
              <Text style={{ color: "#F23B6C", fontFamily: "Bree-Serif" }}>
                Agregar Contacto
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  );
}
const s = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    marginTop: 24,
  },

  header: {
    width: "40%",
    alignSelf: "center",
    position: "absolute",
    borderBottomWidth: 2,
    borderBottomColor: "#f23b6c",
  },
  containerNameAvatar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  containerNameEmail: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 5,
  },
  name: {
    color: "#F23B6C",
    fontFamily: "Bree-Serif",
    fontSize: 18,
  },
  textEmail: {
    color: "#cb3065",
    fontFamily: "Bree-Serif",
    fontSize: 14,
  },
  email: {
    fontSize: 12,
    fontWeight: "400",
    color: "#ddd",
  },
  containerView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonRound: {
    borderWidth: 2,
    borderColor: "#f23b6c",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  button: {
    borderWidth: 2,
    borderColor: "#f23b6c",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    position: "absolute",
    bottom: 10,
    right: 100,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 80,
  },
  containerAgregar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
  },
  containerAgregar2: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  buttonClose: {
    position: "absolute",
    right: 10,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    width: 40,
    height: 40,
    borderColor: "#f23b6c",
    backgroundColor: "#fff",
    borderRadius: 60,
  },
  buttonAceptarCambios: {
    borderWidth: 2,
    borderColor: "#f23b6c",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 20,
  },
});
