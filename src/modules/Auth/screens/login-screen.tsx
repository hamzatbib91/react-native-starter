import { AuthStackScreenProps } from '@/shared/types/navigation.type';
import React from 'react';
import { View, Image, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import { LoginForm } from '../components/login-form';

export function LoginScreen({ navigation }: AuthStackScreenProps<'Login'>) {
  const handleLoginSuccess = () => {
    // Navigate to the main app screen after successful login
    // For example: navigation.navigate('Home');
    console.log('Login successful');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="flex-1"
        >
          <View className="flex-1 items-center justify-center p-6">
            <View className="w-full max-w-md">
              {/* App Logo */}
              <View className="items-center mb-8">
                <Image
                  source={require('@/assets/images/logo.png')}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
              </View>
              
              {/* Login Form */}
              <LoginForm onSuccess={handleLoginSuccess} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;
