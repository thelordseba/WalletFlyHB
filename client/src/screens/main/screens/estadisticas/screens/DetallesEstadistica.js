import React from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";
import { useSelector } from "react-redux";

export default function DetallesEstadistica({ navigation, route }) {
  const { todo } = useSelector((state) => state.transacciones);
  const transactionSelected =
    todo && todo.transactions.filter((el) => el.id === route.params.id);

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
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title={"Detalle de la Transacción"}
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
            <Text style={s.title}>Transacción creada el dia:</Text>
            <Text style={s.text}>
              {transactionSelected[0].createdAt[2]} /{" "}
              {transactionSelected[0].createdAt[1]} /{" "}
              {transactionSelected[0].createdAt[0]}
            </Text>
          </View>
          <View style={s.container}>
            <Text style={s.title}>Tipo de transacción:</Text>
            <Text style={s.text}>{transactionSelected[0].type}</Text>
          </View>
          <View style={s.container}>
            <Text style={s.title}>{transactionSelected[0].type === "ingreso" ? "Origen" : "Destino"}</Text>
            <Text style={s.text}>{transactionSelected[0].transactionUser}</Text>
          </View>
          <View style={s.container}>
            <Text style={s.title}>Titulo:</Text>
            <Text style={s.text}>{transactionSelected[0].title}</Text>
          </View>
          <View style={s.container}>
            <Text style={s.title}>Descripción:</Text>
            <Text style={s.text}>{transactionSelected[0].description}</Text>
          </View>
          <View style={s.container}>
            <Text style={s.title}>Monto de la transaccion:</Text>
            <Text style={s.text}>$ {transactionSelected[0].total} ARS</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  containerAll: {
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
  container: {
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    width: "95%",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: { color: "#f23b6c", fontFamily: "Bree-Serif", fontWeight: "500" },
  text: { color: "#cb3065", fontFamily: "Bree-Serif" },
});
