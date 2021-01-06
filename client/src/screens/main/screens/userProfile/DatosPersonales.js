import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Appbar } from "react-native-paper";

export default function DatosPersonales({ navigation }) {
  const user = useSelector((state) => state.user);
  console.log(user);
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
          <Text style={s.text}>{user.phone}</Text>
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
      </View>
    </>
  );
}
const s = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: "#ffffff",
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
