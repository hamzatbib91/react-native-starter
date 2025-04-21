import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from '../schemas/login.schema';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Label } from '@/shared/components/ui/label';

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    
  };

  return (
    <View className="w-full space-y-6">
      <View className="space-y-2">
        <Text className="text-3xl font-bold text-foreground text-center">Welcome back</Text>
        <Text className="text-muted-foreground text-center">Enter your credentials to sign in</Text>
      </View>

      <View className="space-y-4">
        <View className="space-y-2">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <Text className="text-sm text-red-500">{errors.email.message}</Text>
                )}
              </>
            )}
          />
        </View>

        <View className="space-y-2">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <View className="flex flex-row justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Text className="text-sm text-primary">
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </Pressable>
                </View>
                <Input
                  id="password"
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <Text className="text-sm text-red-500">{errors.password.message}</Text>
                )}
              </>
            )}
          />
        </View>

        <View className="flex flex-row items-center justify-between">
          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { onChange, value } }) => (
              <View className="flex flex-row items-center space-x-2">
                <Checkbox 
                  id="rememberMe" 
                  checked={value} 
                  onCheckedChange={onChange} 
                />
                <Label htmlFor="rememberMe" className="text-sm font-normal">
                  Remember me
                </Label>
              </View>
            )}
          />
          <Pressable>
            <Text className="text-sm font-medium text-primary">Forgot password?</Text>
          </Pressable>
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="w-full mt-2"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            "Sign in"
          )}
        </Button>

        <View className="flex flex-row items-center justify-center mt-4">
          <Text className="text-sm text-muted-foreground">
            Don't have an account?
          </Text>
          <Pressable>
            <Text className="text-sm font-medium text-primary">Sign up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
