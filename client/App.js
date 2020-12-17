import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import generateStore from './src/reducer/Reducer'
import MyStack from './src/components/Stack';

const store = generateStore();
export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  )
}
