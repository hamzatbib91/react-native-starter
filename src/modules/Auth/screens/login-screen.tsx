import { AuthStackScreenProps } from '@/shared/types/navigation.type';
import React from 'react';
import { LoginForm } from '../components/login-form';

export function LoginScreen({ navigation }: AuthStackScreenProps<'Login'>) {
  return (<LoginForm />);
}

export default LoginScreen;
