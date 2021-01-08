import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Appbar } from "react-native-paper";
import CreditCardDisplay from "react-native-credit-card-display";
import { useSelector } from "react-redux";

export default function Tarjeta({ navigation }) {
  const user = useSelector((state) => state.user);
  let parteUno = Math.round(Math.random() * (9999 - 1000 + 1) + 1000);
  let parteDos = Math.round(Math.random() * (9999 - 1000 + 1) + 1000);
  let parteTres = Math.round(Math.random() * (9999 - 1000 + 1) + 1000);
  let parteCuatro = Math.round(Math.random() * (9999 - 1000 + 1) + 1000);
  parteUno = parteUno.toString();
  parteDos = parteDos.toString();
  parteTres = parteTres.toString();
  parteCuatro = parteCuatro.toString();
  let stringNumber = `${parteUno} ${parteDos} ${parteTres} ${parteCuatro}`;
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
          title="Tarjeta"
          color="#F23B6C"
          titleStyle={{
            textAlign: "center",
            fontFamily: "Bree-Serif",
            paddingRight: 54,
          }}
        />
      </Appbar.Header>
        <TouchableOpacity style={s.header}></TouchableOpacity>
      <View style={s.container}>
        <CreditCardDisplay
          onFocused
          cardStyles={{}}
          flipped={true}
          appStack
          width={Dimensions.get("window").width - 10}
          cvc={963}
          fontSize={15}
          since="   2020"
          height={225}
          name={`${user.firstName} ${user.lastName}`}
          number={stringNumber.replace(/(.{4})/g, "$1 ").trim()}
          expiration="   04/21"
          scale={1.1}
        />
      </View>
    </>
  );
}

const s = StyleSheet.create({
  header: {
    width: "40%",
    alignSelf: "center",
    position: "absolute",
    borderBottomWidth: 2,
    borderBottomColor: "#f23b6c",
  },
  container: {
    width: "100%",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#ffffff",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
});
