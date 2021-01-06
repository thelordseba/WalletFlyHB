import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

export default function Gastos({ navigation }) {
  let { gasto } = useSelector((state) => state.transacciones);
  gasto = gasto && gasto.reverse()
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView>
        {gasto &&
          gasto.map((el) => (
            <TouchableOpacity
              key={el.id}
              onPress={() =>
                navigation.navigate("DetallesEstadistica", { id: el.id })
              }
            >
              <View style={s.container}>
                <View style={s.containerIconDireccion}>
                  <View style={s.containerIconSaleDinero}>
                    <MaterialCommunityIcons
                      name="currency-usd-off"
                      size={20}
                      color={"#ffffff"}
                    />
                  </View>
                  <Text style={s.textDireccion}>{el.title}</Text>
                </View>
                <Text style={s.saleDinero}>${el.total} ARS</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#b58de8",
  },
  containerIconDireccion: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  containerIconSaleDinero: {
    backgroundColor: "#e575ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 25,
    height: 25,
    color: "#fff",
  },
  textDireccion: {
    color: "#cb3065",
    fontFamily: "Bree-Serif",
    fontSize: 15,
    marginLeft: 5,
  },
  saleDinero: {
    color: "#e575ea",
    fontFamily: "Bree-Serif",
  },
});
