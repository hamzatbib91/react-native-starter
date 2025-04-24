import React, { useState } from 'react';
import { View, Text, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from '../schemas/login.schema';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Card } from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/use-auth';
import { showToast } from '@/shared/lib/toast';
import { APP_NAME } from '@/shared/constants';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as any,
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
      await login(data.email, data.password)
      .then((data) => {
        showToast.success(t('login.signIn'), t('login.success'));
      })
      .catch((error) => {
        if(error.status === 422 && error.error?.errors){
          // error.error.errors is expected to be { field: [msg1, msg2, ...], ... }
          Object.entries(error.error.errors).forEach(([field, messages]) => {
            setError(field as keyof LoginFormValues, { type: 'manual', message: Array.isArray(messages) ? messages[0] : String(messages) });
          });
          return;
        }
        showToast.error(t('login.signIn'), error?.message || t('login.error.generic'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
    >
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ padding: 20, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center">
          {/* Logo and Header */}
          <View className="items-center mb-8">
            <Image
              source={require('@/assets/images/logo.png')}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
            <Text className="text-2xl font-bold text-foreground text-center mt-4">
              {APP_NAME}
            </Text>
            <Text className="text-sm text-muted-foreground text-center mt-1">
              {t('login.title')}
            </Text>
          </View>

          {/* Login Card */}
          <Card className="p-6">
            {/* Email Field */}
            <View className="space-y-2 mb-4">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Input
                      id="email"
                      placeholder={t('login.emailPlaceholder')}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <Text className="text-xs text-destructive mt-1">
                        {errors.email.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Password Field */}
            <View className="space-y-2 mb-4">
              <View className="flex flex-row justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text className="text-xs text-primary">
                    {showPassword ? t('login.hide') : t('login.show')}
                  </Text>
                </TouchableOpacity>
              </View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Input
                      id="password"
                      placeholder={t('login.passwordPlaceholder')}
                      secureTextEntry={!showPassword}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className={errors.password ? "border-destructive" : ""}
                    />
                    {errors.password && (
                      <Text className="text-xs text-destructive mt-1">
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Remember Me and Forgot Password */}
            <View className="flex-row items-center justify-between mb-6">
              <Controller
                control={control}
                name="rememberMe"
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row items-center">
                    <Checkbox 
                      id="rememberMe" 
                      checked={value} 
                      onCheckedChange={onChange} 
                    />
                    <Label htmlFor="rememberMe" className="ml-2 text-sm">
                      {t('login.rememberMe')}
                    </Label>
                  </View>
                )}
              />
              <TouchableOpacity>
                <Text className="text-sm text-primary">
                  {t('login.forgotPassword')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full h-12"
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                t('login.signIn')
              )}
            </Button>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-[1px] bg-border" />
              <Text className="mx-4 text-xs text-muted-foreground">{t('login.or')}</Text>
              <View className="flex-1 h-[1px] bg-border" />
            </View>

            {/* Create Account Link */}
            <View className="flex-row justify-center">
              <Text className="text-sm text-muted-foreground">
                {t('login.noAccount')}
              </Text>
              <TouchableOpacity className="ml-1">
                <Text className="text-sm font-medium text-primary">
                  {t('login.createAccount')}
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}