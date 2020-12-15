import React from "react";
import { Router } from "./react-router";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import UpdateUser from "./src/screens/UpdateUser";
import UpdateUser2 from "./src/screens/UpdateUser2";
import Register from "./src/screens/Register";
import UserProfile from "./src/screens/main/screens/userProfile/UserProfile";
import Main from "./src/screens/main/Main";
import AuthEmail from "./src/screens/AuthEmail";
import MainView from "./src/screens/MainView";
import { store } from './src/reducer/Reducer';
import { Provider, useSelector } from 'react-redux';

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainView" component={MainView} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="AuthEmail" component={AuthEmail} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen name="UpdateUser2" component={UpdateUser2} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
}
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}
const App = () => {
  const user = useSelector(state => state.userDirection)
  return (
      <Router>
        <NavigationContainer>{user ? <Main /> : <MyStack />}</NavigationContainer>
      </Router>
  )
}
export default AppWrapper