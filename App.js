import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import Toast from 'react-native-toast-message';
import { useContext } from 'react';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

// Theme
import theme from './src/global/styles/styles.d.js';

// Routes
import { Routes } from './src/routes/Routes/index.js';

// Provider
import { UserProvider } from './src/context/userContext';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  return (
    <UserProvider>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <StatusBar style='dark' />
          <Routes />
          <Toast />
        </ThemeProvider>
      </NavigationContainer>
    </UserProvider>
    
  );
}
