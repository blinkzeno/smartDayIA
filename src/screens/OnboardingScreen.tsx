// src/screens/OnboardingScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';


const OnboardingScreen = () => {
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);

  // Focus options data
  const focusOptions = [
    { id: 'productivity', label: 'Productivity' },
    { id: 'balance', label: 'Balance' },
    { id: 'wellness', label: 'Wellness' },
    { id: 'focus-goals', label: 'Focus & Goals' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6"
      >
        {/* Header Section */}
        <View className="mt-10 mb-8">
          <Text className="text-3xl font-bold text-center text-gray-900 mb-4">
            Welcome to SmartDay
          </Text>
          <Text className="text-base text-gray-600 text-center leading-6">
            Your AI companion to plan smarter, stay focused, and live better.
          </Text>
        </View>

        {/* Divider */}
        <View className="border-b border-gray-200 mb-8" />

        {/* Feature Section */}
        <View className="mb-10">
          <Text className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Organize your day effortlessly
          </Text>
          <View className="flex-row justify-center">
            <Text className="text-gray-600 text-base">•</Text>
            <Text className="text-gray-600 text-base ml-2">
              Plan your schedule with ease.
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View className="border-b border-gray-200 mb-8" />

        {/* Focus Selection Section */}
        <View className="mb-12">
          <Text className="text-xl font-semibold text-gray-900 mb-2 text-center">
            Get productive
          </Text>
          <Text className="text-base text-gray-600 text-center mb-6">
            What's your main focus for this week?
          </Text>

          {/* Focus Options Grid */}
          <View className="flex-row flex-wrap justify-between">
            {focusOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                className={`w-[48%] py-4 px-3 rounded-2xl mb-4 ${
                  selectedFocus === option.id
                    ? 'bg-blue-500'
                    : 'bg-gray-100'
                }`}
                onPress={() => setSelectedFocus(option.id)}
              >
                <Text
                  className={`text-base font-medium text-center ${
                    selectedFocus === option.id
                      ? 'text-white'
                      : 'text-gray-800'
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Get Started Button */}
        <Link href="/(tabs)/" className={`w-full py-4 rounded-2xl mb-4 ${
          selectedFocus ? 'bg-blue-500' : 'bg-blue-300'
          }`}
        >
          <Text className="text-white text-lg font-semibold text-center">
            Get Started
          </Text>
        </Link>

        {/* Sign In Link */}
        <View className="flex-row justify-center mb-10">
          <Text className="text-gray-600 text-base">
            Already have an account?{' '}
          </Text>
          <Link href="/signIn" >
            <Text className="text-blue-500 text-base font-medium">
              Sign in
            </Text>
          </Link>
           <Link href="/signup" >
            <Text className="text-blue-500 text-base font-medium">
              Sign up
            </Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;