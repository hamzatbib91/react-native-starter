import React from 'react';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import RootNavigator from '@/modules/RootNavigator';
import toastConfig from '@/shared/config/toast.config';
import { View, Text } from 'react-native';
import { Button } from '@/shared/components/ui/button';

// Enable screens for better navigation performance
enableScreens();

// Create a client
const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <RootNavigator />
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;