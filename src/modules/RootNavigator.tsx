import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '@/modules/Auth/navigation';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

/**
 * RootNavigator
 *
 * The root navigator that renders the entire app.
 *
 * @returns RootNavigator component
 */
export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
      </Stack.Navigator>
      <StatusBar barStyle="dark-content" />
    </NavigationContainer>
  );
}

export default RootNavigator;
