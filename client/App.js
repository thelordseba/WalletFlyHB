import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import getStore from './src/reducer/Reducer'
import MyStack from './src/components/Stack';
import { PersistGate } from 'redux-persist/es/integration/react'


const { store, persistor } = getStore()
export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
