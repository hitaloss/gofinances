import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";

import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import theme from "./global/styles/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Providers from "./src/contexts";
import Routes from "./src/routes";

SplashScreen.preventAutoHideAsync();

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    const loadResources = async () => {
      try {
        await Font.loadAsync(Entypo.font);
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    };
    loadResources();
  }, []);

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };
    if (appIsReady && fontsLoaded) {
      hideSplashScreen();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <Providers>
        <Routes />
      </Providers>
    </ThemeProvider>
  );
}

export default function WrappedApp() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
}
