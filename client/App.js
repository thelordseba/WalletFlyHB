import React from "react";
import { Router } from "./react-router";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import UpdateUser from "./src/screens/UpdateUser";
import UpdateUser2 from "./src/screens/UpdateUser2";
import CreateUser from "./src/screens/CreateUser";
import UserProfile from "./src/screens/userProfile/UserProfile";
import Footer from './src/screens/footer/Footer';

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateUser" component={CreateUser} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen name="UpdateUser2" component={UpdateUser2} />
      
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
}
// Si el usuaario no tiene un Token mostrara la pantalla 
const user = true;

const App = () => (
  <>
    {
      user ? (
        // Usuario Logeado
        <Router>
          <NavigationContainer>
            <Footer />
          </NavigationContainer>
        </Router>
      ) : (
        // Usuario deslogeado
          <Router>
            <NavigationContainer>
              <MyStack />
            </NavigationContainer>
          </Router>
        )
    }
  </>
);
export default App;
