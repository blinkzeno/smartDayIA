// src/screens/SignUpScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Animated,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const SignUpScreen = () => {
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Animation values for background circles
  const pulseAnim1 = useRef(new Animated.Value(1)).current;
  const pulseAnim2 = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const pulseAnimation = (value: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1.2,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
    };

    pulseAnimation(pulseAnim1, 0).start();
    pulseAnimation(pulseAnim2, 1000).start();
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignUp = () => {
    // Handle sign up logic
    console.log('Sign up attempt:', formData);
    // Add validation and API call here
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Gradient Background */}
      <LinearGradient
        colors={['#E6E6FA', '#D6EAF8']}
        className="absolute top-0 left-0 right-0 bottom-0"
      />
      
      {/* Animated Background Circles */}
      <View className="absolute inset-0 z-0 overflow-hidden">
        <Animated.View 
          style={{
            transform: [{ scale: pulseAnim1 }],
            opacity: 0.5,
          }}
          className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl"
        />
        <Animated.View 
          style={{
            transform: [{ scale: pulseAnim2 }],
            opacity: 0.5,
          }}
          className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl"
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 z-10"
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 items-center justify-center p-4 min-h-screen">
            <View className="w-full max-w-md">
              
              {/* Main Card */}
              <View className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
                
                {/* Header */}
                <View className="text-center">
                  <Text className="text-gray-900 text-3xl font-bold leading-tight">
                    Create Your SmartDay Account 🚀
                  </Text>
                  <Text className="text-gray-600 text-base font-normal leading-normal mt-2">
                    Your AI assistant will help you stay organized every day.
                  </Text>
                </View>

                {/* Form */}
                <View className="mt-8 space-y-4">
                  
                  {/* Full Name Field */}
                  <View>
                    <Text className="text-gray-900 text-sm font-medium mb-1">
                      Full Name
                    </Text>
                    <TextInput
                      className="w-full rounded-lg border border-gray-300 bg-white/80 p-3 text-gray-900 placeholder-gray-400 text-base"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChangeText={(value) => handleInputChange('fullName', value)}
                      autoCapitalize="words"
                    />
                  </View>

                  {/* Email Field */}
                  <View>
                    <Text className="text-gray-900 text-sm font-medium mb-1">
                      Email Address
                    </Text>
                    <TextInput
                      className="w-full rounded-lg border border-gray-300 bg-white/80 p-3 text-gray-900 placeholder-gray-400 text-base"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChangeText={(value) => handleInputChange('email', value)}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>

                  {/* Password Field */}
                  <View>
                    <Text className="text-gray-900 text-sm font-medium mb-1">
                      Password
                    </Text>
                    <View className="relative">
                      <TextInput
                        className="w-full rounded-lg border border-gray-300 bg-white/80 p-3 pr-10 text-gray-900 placeholder-gray-400 text-base"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChangeText={(value) => handleInputChange('password', value)}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity
                        className="absolute right-3 top-3"
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons 
                          name={showPassword ? "eye-off" : "eye"} 
                          size={20} 
                          color="#9CA3AF" 
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Confirm Password Field */}
                  <View>
                    <Text className="text-gray-900 text-sm font-medium mb-1">
                      Confirm Password
                    </Text>
                    <View className="relative">
                      <TextInput
                        className="w-full rounded-lg border border-gray-300 bg-white/80 p-3 pr-10 text-gray-900 placeholder-gray-400 text-base"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChangeText={(value) => handleInputChange('confirmPassword', value)}
                        secureTextEntry={!showConfirmPassword}
                      />
                      <TouchableOpacity
                        className="absolute right-3 top-3"
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <Ionicons 
                          name={showConfirmPassword ? "eye-off" : "eye"} 
                          size={20} 
                          color="#9CA3AF" 
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Terms & Conditions Checkbox */}
                  <View className="flex-row items-center pt-2">
                    <Checkbox
                      value={formData.agreeToTerms}
                      onValueChange={(value) => handleInputChange('agreeToTerms', value)}
                      color={formData.agreeToTerms ? '#2b8cee' : undefined}
                      className="h-4 w-4 rounded border-gray-300 bg-white/80"
                    />
                    <Text className="ml-2 text-sm text-gray-700 flex-1 flex-wrap">
                      I agree to the{' '}
                      <Text className="text-blue-500 font-medium">
                        Terms & Conditions
                      </Text>
                    </Text>
                  </View>

                  {/* Sign Up Button */}
                  <TouchableOpacity
                    className="w-full items-center justify-center rounded-lg h-12 mt-4"
                    onPress={handleSignUp}
                    disabled={!formData.agreeToTerms}
                  >
                    <LinearGradient
                      colors={['#4A90E2', '#007AFF']}
                      className="w-full h-full rounded-lg items-center justify-center shadow-md"
                      style={{ opacity: formData.agreeToTerms ? 1 : 0.5 }}
                    >
                      <Text className="text-white text-base font-semibold">
                        Sign Up
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                {/* Footer Link */}
                <View className="mt-6 text-center">
                  <Text className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      href="/signIn"
                    >
                      <Text className="font-semibold text-blue-500">
                        Sign In
                      </Text>
                    </Link>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;