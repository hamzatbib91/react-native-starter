import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '@/modules/Auth/navigation';
import { RootStackParamList } from '@/shared/types/navigation.type';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  // For demonstration purposes - this would be connected to your auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulating authentication check
  useEffect(() => {
    // You would check AsyncStorage or a state management solution here
    // For now, we'll just set a timeout to simulate login after 2 seconds
    const timer = setTimeout(() => {
      setIsAuthenticated(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
