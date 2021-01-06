import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";
import { useSelector } from "react-redux";

export default function DetallesEstadistica({ navigation, route }) {
  const { todo } = useSelector((state) => state.transacciones);
  const transactionSelected =
    todo && todo.transactions.filter((el) => el.id === route.params.id);
  console.log(transactionSelected);

  return (
    <>
      <Appbar.Header
        style={{ backgroundColor: "#f23b6c", borderBottomColor: "#f23b6c" }}
      >
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title={"Detalle de la Transacción"} />
      </Appbar.Header>
      <View style={s.containerAll}>
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
