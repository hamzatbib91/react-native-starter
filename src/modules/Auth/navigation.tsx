import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../modules/Auth/screens/login-screen';
import { AuthStackParamList } from './types/navigation.type';

/**
 * Stack
 *
 * The Stack is a NativeStack.Navigator that renders the authentication screens.
 *
 * @return {React.ReactElement} The Stack component.
 */
const Stack = createNativeStackNavigator<AuthStackParamList>();

/**
 * AuthStack
 *
 * The AuthStack is a NativeStack.Navigator that renders the authentication screens.
 *
 * @return {React.ReactElement} The AuthStack component.
 */
export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // Hide the header on all screens in the stack
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

/**
 * Default export
 *
 * @default
 */
export default AuthStack;
