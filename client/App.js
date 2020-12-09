import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Router, Route, Link } from "./react-router";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from './src/screens/Login';
import UpdateUser from './src/screens/UpdateUser';
import UpdateUser2 from './src/screens/UpdateUser2';
import CreateUser from './src/screens/CreateUser';
import UserProfile from "./src/screens/userProfile/UserProfile";
import Footer from './src/screens/footer/Footer';
import DatosPersonales from "./src/screens/userProfile/DatosPersonales";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfile" component={UserProfile}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateUser" component={CreateUser} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen name="UpdateUser2" component={UpdateUser2} />
      <Stack.Screen name="DatosPersonales" component={DatosPersonales}/>
      {/* <Stack.Screen name="footer" component={Footer}/> */}
    </Stack.Navigator>
  );
}

const Home = () => <Text>Home</Text>;

const About = () => <Text>About</Text>;

const App = () => (
  <Router>
    <NavigationContainer>
      <MyStack />
      <Footer/>
    </NavigationContainer>
  </Router>
);

export default App;