import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProductsProvider } from './src/context/ProductsContext';
import { StoreProvider } from './src/context/StoreContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductsProvider>
        <StoreProvider>
          <AppNavigator />
          <StatusBar style="dark" />
        </StoreProvider>
      </ProductsProvider>
    </SafeAreaProvider>
  );
}
