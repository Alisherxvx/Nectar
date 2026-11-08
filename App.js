import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from './src/context/StoreContext';
import Navigation from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <StatusBar style="dark" />
        <Navigation />
      </StoreProvider>
    </SafeAreaProvider>
  );
}
