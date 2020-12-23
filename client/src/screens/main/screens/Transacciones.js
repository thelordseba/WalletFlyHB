import React from "react";
import { SafeAreaView, Text, View, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { array } from '../../../utils/ArrayMovimientos'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appbar } from 'react-native-paper'

export default function Transacciones(props){

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => props.navigation.toggleDrawer()} />
        <Appbar.Content title="Transacciones" />
        <Appbar.Action icon="chart-pie" onPress={() => props.navigation.navigate('StackEstadisticas')} />
      </Appbar.Header>
    <SafeAreaView style={{flex: 1}}>
      <View style={s.containerUsd}>
        <Text style={s.textUsd}>$ 5.000.00 USD</Text>
        <Text style={s.textBalance}>Balance de cuenta</Text>
      </View>
      <View style={s.containerButton}>
        <Button title="Recargar" onPress={() => props.navigation.navigate("EnEfectivo")}/>
        <Button title="Transferir" onPress={() => props.navigation.navigate("Transferir")}/>
      </View>
      <ScrollView>
        <View style={s.containerMovimientos}>
          <Text style={s.textMovimientos}>Movimientos</Text>
          {
            array && array.map(pagos => (
              <View style={s.container} key={pagos.id}>
                <View style={s.containerIconDireccion}>
                  <View style={pagos.tipo === "ingresa" ? s.containerIconIngresaDinero : s.containerIconSaleDinero}>
                    {pagos.tipo === "ingresa" ? <MaterialCommunityIcons name="currency-usd" size={20}/> : <MaterialCommunityIcons name="currency-usd-off" size={20}/>}
                  </View>
                  <Text style={s.textDireccion}>{pagos.direccion}</Text>
                </View>
                <Text style={pagos.tipo === "ingresa" ? s.ingresaDinero : s.saleDinero}>${pagos.dinero} USD
                </Text>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  )
}

const s = StyleSheet.create({
  containerUsd: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    backgroundColor: "#7b1fa2"
  },
  textUsd: {
    color: "#fff",
    fontSize: 26,
  },
  textBalance:{
    color: "#ccc",
    fontSize: 15
  },
  containerButton:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    position: "absolute",
    zIndex: 1,
    height: 215,
    width: "100%"
  },
  textMovimientos:{
    color: "#ccc",
    fontSize: 16
  },
  containerMovimientos:{
    backgroundColor: "#282C34",
    height: "100%",
    paddingTop: 25,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 20,

  },
  container: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa"
  },
  containerIconDireccion:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  containerIconIngresaDinero: {
    backgroundColor: "#45aa45",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 25,
    height: 25,
    color: "#fff"
  },
  containerIconSaleDinero:{
    backgroundColor: "#ff4545",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 25,
    height: 25,
    color: "#fff"
  },
  textDireccion:{
    color: "#fff",
    fontSize: 15,
    marginLeft: 5,
  },
  ingresaDinero:{
    color: "#45ff45"
  },
  saleDinero:{
    color: "#ff4545"
  }
})
