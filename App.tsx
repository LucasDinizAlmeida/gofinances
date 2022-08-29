
import React from 'react';
import { Register } from './src/screens/register';
import { ThemeProvider } from 'styled-components/native'
import theme from './src/global/styles/theme';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';
import { CategorySelect } from './src/screens/CategorySelect';

export default function App() {

  const [fontsloaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold })

  if (!fontsloaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>

  );
}