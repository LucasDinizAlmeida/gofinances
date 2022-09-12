
import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import { StatusBar } from 'react-native'

import { ThemeProvider } from 'styled-components/native'
import theme from './src/global/styles/theme';

import { NavigationContainer } from '@react-navigation/native'

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';

import { AuthContextProvider } from './src/hooks/AuthContext';
import { Routes } from './src/Routes';
import { AppRoutes } from './src/Routes/App.routes';

export default function App() {

  const [fontsloaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold })

  if (!fontsloaded) {
    return <AppLoading />
  }

  return (

    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />

      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </ThemeProvider>

  );
}