import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import api from "../../../reducer/ActionCreator";

export default function DrawerContent(props) {
  const user = useSelector((state) => state.user);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const huella = useSelector((state) => state.huella);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  const dispatch = useDispatch();
  const { USER, HUELLA } = api;
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <MaterialCommunityIcons
          style={{ textAlign: "right", marginRight: 5 }}
          name="close-circle"
          size={30}
          color={"#F23B6C"}
          onPress={() => props.navigation.toggleDrawer()}
        />
        <View style={s.drawerContent}>
          <View style={s.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                size={50}
                source={{
                  uri: require("../../../images/Avatar.png"),
                }}
              />
              <View style={s.containerNameEmail}>
                <Text style={s.textNombre}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text style={s.textEmail}>{user.email}</Text>
              </View>
            </View>
          </View>
        </View>
        <Drawer.Section style={s.drawerSection}>
          <DrawerItem
            name="Home"
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                size={size}
                color={"#F23B6C"}
              />
            )}
            label={() => <Text style={s.label}>Home</Text>}
            onPress={() => props.navigation.navigate("Home")}
          />
          <DrawerItem
            name="Profile"
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={"#F23B6C"}
              />
            )}
            label={() => <Text style={s.label}>Perfil</Text>}
            onPress={() => props.navigation.navigate("Profile")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="contacts"
                size={size}
                color={"#F23B6C"}
              />
            )}
            label={() => <Text style={s.label}>Contactos</Text>}
            color={"#F23B6C"}
            style={{ color: "#cb3065", fontFamily: "Bree-Serif" }}
            onPress={() => props.navigation.navigate("Contactos")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="chart-bar"
                size={size}
                color={"#F23B6C"}
              />
            )}
            label={() => <Text style={s.label}>Estadísticas</Text>}
            onPress={() => props.navigation.navigate("StackEstadisticas")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="help-circle"
                size={size}
                color={"#F23B6C"}
              />
            )}
            label={() => <Text style={s.label}>Ayuda</Text>}
            onPress={() => props.navigation.navigate("QuestionAndAnswers")}
          />
        </Drawer.Section>
        <Drawer.Section style={s.drawerSection}>
          <Text style={s.title}>Configuración</Text>
          <TouchableRipple onPress={() => toggleTheme()}>
            <View style={s.preference}>
              <Text style={s.switch}>Tema Oscuro</Text>
              <View pointerEvents="none">
                <Switch value={isDarkTheme} color={"#F23B6C"} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              let codigoHuella = huella.code
                ? huella.code
                : Math.round(Math.random() * 8999 + 1000);
              if (!huella.active) {
                dispatch({
                  type: HUELLA,
                  payload: {
                    active: true,
                    dialogVisible: true,
                    showCode: true,
                    enterCode: false,
                    code: codigoHuella,
                  },
                });
              }
              if (huella.active) {
                dispatch({
                  type: HUELLA,
                  payload: {
                    active: true,
                    dialogVisible: true,
                    showCode: false,
                    enterCode: true,
                    code: codigoHuella,
                  },
                });
              }
              props.navigation.toggleDrawer();
              props.navigation.navigate("Home");
            }}
          >
            <View style={s.preference}>
              <Text style={s.switch}>Huella Digital</Text>
              <View pointerEvents="none">
                <Switch value={huella.active} color={"#F23B6C"} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={s.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              size={size}
              color={"#F23B6C"}
            />
          )}
          label={() => <Text style={s.label}>Cerrar sesión</Text>}
          onPress={() => {
            props.navigation.toggleDrawer();
            dispatch({
              type: USER,
              payload: false,
            });
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const s = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
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
  label: {
    color: "#cb3065",
    fontFamily: "Bree-Serif",
  },
  title: {
    color: "#F23B6C",
    fontFamily: "Bree-Serif",
    padding: 10,
    fontSize: 16,
  },
  switch: {
    color: "#cb3065",
    fontFamily: "Bree-Serif",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  drawerSection: {
    marginTop: 5,
    borderBottomColor: "#F23B6C",
    borderBottomWidth: 1,
    color: "#F23B6C",
    paddingTop: 1,
  },
  bottomDrawerSection: {
    marginBottom: 10,
    borderBottomColor: "#F23B6C",
    borderBottomWidth: 1,
    borderTopColor: "#F23B6C",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
