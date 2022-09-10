
import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import { StatusBar } from 'react-native'

import { ThemeProvider } from 'styled-components/native'
import theme from './src/global/styles/theme';

import { NavigationContainer } from '@react-navigation/native'

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';
import { AppRoutes } from './src/Routes/App.routes';
import { SignIn } from './src/screens/SignIn';
import { AuthContextProvider } from './src/hooks/AuthContext';

export default function App() {

  const [fontsloaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold })

  if (!fontsloaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="transparent"
          translucent
        />

        <AuthContextProvider>
          {/* <AppRoutes /> */}
          <SignIn />
        </AuthContextProvider>

      </NavigationContainer>
    </ThemeProvider>

  );
}