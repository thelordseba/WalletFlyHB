import React, { useState } from "react";
import { Button, StyleSheet, Text, View, Dimensions } from "react-native";
import { Avatar } from "@material-ui/core";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

export default function Home(props) {
  const [value, setValue] = useState(0);
  const email = useSelector((state) => state.email);
  const user = useSelector((state) => state.user);
  const userLogin = useSelector((state) => state.userLogin);
  const Datos = (args) => {
    switch (args) {
      case 1:
        return [200, 300, 10, 4, 3, 70, 10];
      case 2:
        return [1000, 750, 650, 2500];
      case 3:
        return [4000, 6500, 3400, 1200, 7000, 6400];
      case 4:
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      default:
        return [200, 300, 10, 4, 3, 70, 10];
    }
  };
  const Label = (args) => {
    switch (args) {
      case 1:
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      case 2:
        return ["1/4", "2/4", "3/4", "4/4"];
      case 3:
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      case 4:
        return [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
      default:
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.textBienvenida}>
        Bienvenido {user ? user.firstName : userLogin.firstName}
      </Text>
      <View style={s.containerPerfil}>
        <Avatar style={{ minWidth: "80px", minHeight: "80px" }} />
        <View style={s.containerNameEmail}>
          <Text style={s.textNombre}>
            {user ? user.firstName : userLogin.firstName}{" "}
            {user ? user.lastName : userLogin.lastName}
          </Text>
          <Text style={s.textEmail}>{email ? email : userLogin.email}</Text>
        </View>
      </View>
      <View>
        <Text style={s.balance}>Balance</Text>
        <LineChart
          data={{
            labels: Label(value),
            datasets: [{ data: Datos(value) }],
          }}
          width={Dimensions.get("screen").width}
          height={300}
          yAxisLabel="$"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 5,
          }}
        />
        <View style={s.textButton}>
          <Text onPress={() => setValue(1)}>7 dias</Text>
          <Text onPress={() => setValue(2)}>1 mes</Text>
          <Text onPress={() => setValue(3)}>6 meses</Text>
          <Text onPress={() => setValue(4)}>1 año</Text>
        </View>
      </View>
      <View style={s.containerButton}>
        <Button
          title="Recargar"
          onPress={() => props.navigation.navigate("Recargar")}
        />
        <Button
          title="Enviar"
          onPress={() => props.navigation.navigate("Enviar")}
        />
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "100vh",
    // backgroundColor: "#22074d"
  },
  textBienvenida: {
    textAlign: "center",
    fontSize: 20,
    // color: "#49e1f4",
    marginTop: 10,
    marginBottom: 10,
  },
  containerPerfil: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  containerNameEmail: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  textNombre: {
    // color: "#49e1f4",
    fontSize: 18,
  },
  textEmail: {
    // color: "#49e1f4",
    fontSize: 14,
  },
  containerButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  balance: {
    // color: "#49e1f4",
    fontSize: 20,
    marginTop: 15,
  },
  textButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 5,
    paddingLeft: 5,
  },
});
