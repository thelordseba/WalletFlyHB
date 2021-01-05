import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import getStore from "./src/reducer/Reducer";
import MyStack from "./src/components/Stack";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { PersistGate } from "redux-persist/es/integration/react";

const fetchFonts = () => {
  return Font.loadAsync({
    "Bree-Serif": require("./assets/fonts/BreeSerif-Regular.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
  });
};

const { store, persistor } = getStore();
export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
