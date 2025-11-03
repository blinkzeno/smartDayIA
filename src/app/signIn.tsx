// src/screens/SignInScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


const SignInScreen = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    // Handle sign in logic
    console.log('Sign in attempt:', { email, password });
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login attempt`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Gradient Background */}
      <LinearGradient
        colors={['#87CEEB', '#E6E6FA', 'white']}
        className="absolute top-0 left-0 right-0 bottom-0"
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 items-center justify-center p-4 min-h-screen">
            <View className="w-full max-w-md space-y-6">
              
              {/* Logo/Icon */}
              <View className="flex justify-center items-center">
                <View className="relative">
                  <LinearGradient
                    colors={['#60A5FA', '#A78BFA']}
                    className="w-16 h-16 rounded-full items-center justify-center shadow-lg shadow-blue-400/50"
                  >
                    <MaterialIcons name="auto-awesome" size={32} color="white" />
                  </LinearGradient>
                </View>
              </View>

              {/* Central Card */}
              <View className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-slate-300/40">
                
                {/* Header */}
                <View className="text-center">
                  <Text className="text-gray-900 text-3xl font-bold leading-tight">
                    Welcome Back 👋
                  </Text>
                  <Text className="text-gray-900 text-base font-normal leading-normal pt-1">
                    Let's plan your most productive day.
                  </Text>
                </View>

                {/* Form */}
                <View className="mt-8 space-y-6">
                  
                  {/* Email/Username Field */}
                  <View className="flex flex-col">
                    <Text className="text-gray-900 text-base font-medium leading-normal pb-2">
                      Email / Username
                    </Text>
                    <TextInput
                      className="w-full rounded-lg text-gray-900 border border-gray-300 bg-white h-14 placeholder-gray-500 px-4 text-base font-normal leading-normal"
                      placeholder="Enter your email or username"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>

                  {/* Password Field */}
                  <View className="flex flex-col">
                    <Text className="text-gray-900 text-base font-medium leading-normal pb-2">
                      Password
                    </Text>
                    <View className="flex-row items-stretch rounded-lg">
                      <TextInput
                        className="flex-1 rounded-lg text-gray-900 border border-gray-300 bg-white h-14 placeholder-gray-500 px-4 text-base font-normal leading-normal rounded-r-none border-r-0"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity
                        className="border border-gray-300 bg-white items-center justify-center px-4 rounded-r-lg border-l-0"
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons 
                          name={showPassword ? "eye-off" : "eye"} 
                          size={24} 
                          color="#617589" 
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Forgot Password */}
                  <View className="text-right">
                    <TouchableOpacity>
                      <Text className="text-gray-500 text-sm font-medium leading-normal underline">
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Sign In Button */}
                  <TouchableOpacity
                    className="w-full items-center justify-center rounded-lg h-14 px-6"
                    onPress={handleSignIn}
                  >
                    <LinearGradient
                      colors={['#3B82F6', '#8B5CF6']}
                      className="w-full h-full rounded-lg items-center justify-center"
                    >
                      <Text className="text-white text-base font-semibold">
                        Sign In
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Divider */}
                  <View className="flex-row items-center gap-4">
                    <View className="flex-1 border-t border-gray-300" />
                    <Text className="text-sm font-medium text-gray-500">
                      or continue with
                    </Text>
                    <View className="flex-1 border-t border-gray-300" />
                  </View>

                  {/* Social Logins */}
                  <View className="flex-row gap-4">
                    {/* Google Button */}
                    <TouchableOpacity
                      className="flex-1 h-12 flex-row items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white"
                      onPress={() => handleSocialLogin('google')}
                    >
                      <Ionicons name="logo-google" size={20} color="#4285F4" />
                      <Text className="text-gray-900 text-base font-semibold">
                        Google
                      </Text>
                    </TouchableOpacity>

                    {/* Apple Button */}
                    <TouchableOpacity
                      className="flex-1 h-12 flex-row items-center justify-center gap-3 rounded-lg bg-black"
                      onPress={() => handleSocialLogin('apple')}
                    >
                      <Ionicons name="logo-apple" size={20} color="white" />
                      <Text className="text-white text-base font-semibold">
                        Apple
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Footer Link */}
              <View className="text-center pt-2">
                <Text className="text-base text-gray-800">
                  Don't have an account?{' '}
                  <TouchableOpacity 
                   
                  >
                    <Text className="font-semibold text-blue-500 underline">
                      Create one
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;