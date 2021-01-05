import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "react-native-paper";
import axios from "axios";
import api from "../../../reducer/ActionCreator";
import { Appbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { diasDeSemana, diasMes, seisMeses, unAño } from "../../../utils/Days";
import {
  SieteDias,
  filtroMes,
  filtroSeisMeses,
  filtroUnAño,
} from "../../../utils/Valores";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import emptyAvatar from "../../../../assets/descarga.png";
import firebaseConfig from "../../../firebase/firebase-config.js";
import firebase from "firebase/app";
import "firebase/storage";

if (!firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig)
    } catch (err) {
        console.error('Firebase initialization error raised', err.stack)
    }
}

export default function Home({ navigation }) {
  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.user);
  const userImage = useSelector((state) => state.userImage);
  const saldo = useSelector((state) => state.saldo);
  const { todo } = useSelector((state) => state.transacciones);
  const { dialogVisible, showCode, enterCode, code } = useSelector(
    (state) => state.huella
  );
  const [codeHuellaValue, setCodeHuellaValue] = useState("");
  const dispatch = useDispatch();
  const { TRANSACCIONES, HUELLA, USER_IMAGE } = api;
  const date = new Date();
  const day = date.getDay();
  let dayMonth = date.getDate();
  let currentYear = date.getFullYear();
  let month = date.getMonth();

  const CreatedAt = () => {
    todo &&
      todo.transactions.map((el) => {
        if (el.createdAt.indexOf("T") !== -1) {
          let indexT = el.createdAt.indexOf("T");
          let newCreatedAt = el.createdAt.slice(0, indexT);
          el.createdAt = newCreatedAt.split("-");
        }
      });
  };
  CreatedAt()
  const Datos = (args) => {
    switch (args) {
      case 2:
        return filtroMes(todo, dayMonth, month, currentYear)
      case 3:
        return filtroSeisMeses(todo, dayMonth, month, currentYear)
      case 4:
        return filtroUnAño(todo, dayMonth, month, currentYear)
      default:
        return SieteDias(todo, dayMonth, month, currentYear)
      // return [1,2,3,4,5,6,7];
    }
  }
  const Label = (args) => {
    switch (args) {
      case 2:
        return diasMes(dayMonth, month);
      case 3:
        return seisMeses(month);
      case 4:
        return unAño(month);
      default:
        return diasDeSemana(day);
    }
  };
  const onHandleHuella = () => {
    if (codeHuellaValue == code) {
      dispatch({
        type: HUELLA,
        payload: {
          active: false,
          dialogVisible: false,
          showCode: false,
          code: false,
          enterCode: false,
        },
      });
      Alert.alert("Huella digital Desactivada");
    } else {
      dispatch({
        type: HUELLA,
        payload: {
          active: true,
          dialogVisible: false,
          showCode: false,
          code: code,
          enterCode: false,
        },
      });
      Alert.alert("El codigo ingresado es Incorrecto");
    }
  };
  useEffect(() => {
    axios
      .get(`https://walletfly.glitch.me/transaction/${user.id}`)
      .then(({ data }) => {
        dispatch({
          type: TRANSACCIONES,
          payload: {
            todo: data,
            ingreso: data.transactions.length
              ? data.transactions.filter(
                  (ingreso) => ingreso.type === "ingreso"
                )
              : false,
            gasto: data.transactions.length
              ? data.transactions.filter((gasto) => gasto.type === "egreso")
              : false,
          },
        });
      })
      .catch((err) => console.log(`Sucedio un error ${err}`));
  }, [saldo]);
  return (
    <>
      <Appbar.Header
        style={{ backgroundColor: "#f23b6c", borderBottomColor: "#f23b6c" }}
      >
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={"Home"} />
      </Appbar.Header>
      <View style={s.container}>
        <View style={s.containerPerfil}>
          <Avatar.Image
            size={50}
            source={{
              uri: userImage
                ? userImage
                : require("../../../images/Avatar.png"),
            }}
          />
          <View style={s.containerNameEmail}>
            <Text style={s.textNombre}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={s.textEmail}>{user.email}</Text>
          </View>
        </View>
        <View>
          <View>
            <LinearGradient
              colors={["#F23B6C", "#F23B6C", "#cb3065"]}
              style={s.buttonRelieve}
            >
              <Text style={s.balance}>
                Saldo actual: ${todo && todo.balance} ARS
              </Text>
            </LinearGradient>
          </View>
          <View style={s.containerButton}>
            <TouchableOpacity
              style={s.button}
              onPress={() => navigation.navigate("EnEfectivo")}
            >
              <Text style={s.buttonText}>Recargar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.button}
              onPress={() => navigation.navigate("Enviar")}
            >
              <Text style={s.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
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
              backgroundColor: "#f23b6c",
              backgroundGradientFrom: "#f23b6c",
              backgroundGradientTo: "#cB3065",
              decimalPlaces: 2,
              color: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForVerticalLabels: {
                fontFamily: "Bree-Serif",
              },
              propsForHorizontalLabels: {
                fontFamily: "Bree-Serif",
              },

              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#b58de8 ",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 5,
            }}
          />
          <View style={s.textButton}>
            <Text style={s.text} onPress={() => setValue(0)}>
              7 dias
            </Text>
            <Text style={s.text} onPress={() => setValue(2)}>
              1 mes
            </Text>
            <Text style={s.text} onPress={() => setValue(3)}>
              6 meses
            </Text>
            <Text style={s.text} onPress={() => setValue(4)}>
              1 año
            </Text>
          </View>
        </View>
      </View>
      {dialogVisible && showCode ? (
        <View style={s.containerAgregar}>
          <View style={s.containerAgregar2}>
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: HUELLA,
                  payload: {
                    active: true,
                    dialogVisible: false,
                    showCode: false,
                    code: code,
                    enterCode: false,
                  },
                });
              }}
              style={s.buttonClose}
            >
              <Text>
                <MaterialCommunityIcons name="close" size={26} />
              </Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 40, marginBottom: 10 }}>
              Por su seguridad, se le pedirá este codigo, si quiere desactivar
              su huella digital. No la pierda!
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}
            >
              {code && code}
            </Text>
          </View>
        </View>
      ) : null}
      {dialogVisible && enterCode ? (
        <View style={s.containerAgregar}>
          <View style={s.containerAgregar2}>
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: HUELLA,
                  payload: {
                    active: true,
                    dialogVisible: false,
                    showCode: false,
                    code: code,
                    enterCode: false,
                  },
                });
              }}
              style={s.buttonClose}
            >
              <Text>
                <MaterialCommunityIcons name="close" size={26} />
              </Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 40, marginBottom: 10 }}>
              Ingrese el codigo de seguridad para desactivar su huella digital
            </Text>
            <TextInput
              placeholder="Ingrese el codigo"
              onChangeText={(e) => setCodeHuellaValue(e)}
            />
            <TouchableOpacity onPress={() => onHandleHuella()}>
              <Text>Ingresar Codigo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  );
}
const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  textBienvenida: {
    textAlign: "center",
    fontSize: 20,
    // color: "#49e1f4",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  containerPerfil: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  containerNameEmail: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  textNombre: {
    color: "#F23B6C",
    fontFamily: "Bree-Serif",
    fontSize: 18,
  },
  textEmail: {
    color: "#cb3065",
    fontFamily: "Bree-Serif",
    fontSize: 14,
  },
  containerButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "0.5rem",
  },

  buttonRelieve: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: 5,
  },
  balance: {
    textAlign: "center",
    margin: 10,
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: "1.3rem",
    fontFamily: "Bree-Serif",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#f23b6c",
    width: "30%",
    height: "2rem",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  buttonText: {
    fontFamily: "Bree-Serif",
    color: "#f23b6c",
    justifyContent: "center",
  },
  textButton: {
    display: "flex",
    flexDirection: "row",
    color: "#cB3065",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 20,
  },
  text: {
    justifyContent: "center",
    fontFamily: "Bree-Serif",
    color: "#cB3065",
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
    borderWidth: 1,
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 60,
  },
  buttonAceptarCambios: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 80,
    marginTop: 20,
  },
});
