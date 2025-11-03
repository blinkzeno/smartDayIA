// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  // Données mockées
  const tasks = [
    { id: 1, title: 'Finalize App Mockups', time: '10:00 AM - 11:30 AM', priority: 'high', completed: false },
    { id: 2, title: 'Team Stand-up Meeting', time: '1:00 PM - 1:30 PM', priority: 'low', completed: false },
    { id: 3, title: 'Code Review Session', time: '3:00 PM - 4:00 PM', priority: 'medium', completed: false },
  ];

  const schedule = [
    { id: 1, time: '10:00 AM', title: 'Design Sync', color: 'bg-purple-200' },
    { id: 2, time: '1:00 PM', title: 'Team Stand-up', color: 'bg-sky-200' },
    { id: 3, time: '3:00 PM', title: 'Code Review', color: 'bg-amber-200' },
  ];

  const initiatives = [
    "Start your most important task first 💪",
    "Take a 10-minute focus break 🌿",
    "Review weekly goals 🎯"
  ];

  const completedTasks = 3;
  const totalTasks = 5;

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'low':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <LinearGradient
      colors={['#E6E6FA', '#E0F2FE', '#f8f9fa']}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <StatusBar style="dark" />
        
        {/* Header */}
        <View className="flex-row items-center px-4 pt-8 justify-between">
          <View className="w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center">
            <MaterialIcons name="wb-cloudy" size={24} color="#212529" />
          </View>
          
          <View className="flex-1 px-4">
            <Text className="text-xl font-bold text-gray-900">Good Morning, Zeno 👋</Text>
            <Text className="text-base text-gray-600">Here's your plan for today.</Text>
          </View>
          
          <TouchableOpacity className="w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center">
            <MaterialIcons name="notifications" size={24} color="#212529" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Summary Card */}
          <View className="px-4 py-4">
            <View className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text className="text-sm text-gray-600">Monday, 24th Oct</Text>
                  <Text className="text-lg font-bold text-gray-900">Sunny, 22°C</Text>
                </View>
                <MaterialIcons name="wb-sunny" size={32} color="#F59E0B" />
              </View>

              <View className="border-t border-gray-200 my-3" />

              <Text className="text-base text-gray-600 italic mb-4">
                "The secret of getting ahead is getting started."
              </Text>

              {/* Smart Initiatives Chips */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="flex-row -mx-4 px-4"
              >
                {initiatives.map((initiative, index) => (
                  <View 
                    key={index}
                    className="bg-purple-100 rounded-full px-4 py-2 mr-3 flex-shrink-0"
                  >
                    <Text className="text-purple-600 text-sm font-medium">
                      {initiative}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Task Overview */}
          <View className="px-4 pb-3 pt-2">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[22px] font-bold text-gray-900">Task Overview</Text>
              <Text className="text-purple-600 text-sm font-bold">3/5 Completed</Text>
            </View>
            
            {/* Progress Bar */}
            <View className="w-full bg-gray-200 rounded-full h-2.5">
              <View 
                className="bg-purple-500 h-2.5 rounded-full" 
                style={{ width: '60%' }}
              />
            </View>
          </View>

          {/* Task Card Carousel */}
          <View className="py-2">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="flex-row px-4"
            >
              {tasks.map((task) => (
                <View 
                  key={task.id}
                  className="w-64 bg-white rounded-2xl p-4 shadow-lg mr-4"
                >
                  <View className="flex-row justify-between items-start">
                    <View className={`px-3 py-1 rounded-full ${getPriorityStyle(task.priority)}`}>
                      <Text className="text-sm font-medium capitalize">
                        {task.priority}
                      </Text>
                    </View>
                    <MaterialIcons name="more-vert" size={20} color="#6c757d" />
                  </View>
                  
                  <Text className="font-bold text-gray-900 mt-3 text-base">
                    {task.title}
                  </Text>
                  
                  <View className="flex-row items-center gap-2 mt-2">
                    <MaterialIcons name="schedule" size={16} color="#6c757d" />
                    <Text className="text-sm text-gray-600">{task.time}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Today's Schedule */}
          <View className="px-4 pb-32 pt-4">
            <Text className="text-[22px] font-bold text-gray-900 mb-4">Today's Schedule</Text>
            
            <View className="bg-white rounded-2xl p-4 shadow-lg space-y-4 gap-3">
              {schedule.map((event) => (
                <View key={event.id} className="flex-row items-center">
                  <Text className="w-16 text-sm text-gray-600 text-right mr-4">
                    {event.time}
                  </Text>
                  <View className={`flex-1 p-3 rounded-lg ${event.color}`}>
                    <Text className="font-semibold text-sm text-gray-900">
                      {event.title}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar with FAB */}
        <View className="absolute bottom-[-6%] left-0 right-[2%] h-28 flex items-end justify-center">
          {/* Floating Action Button */}
          <TouchableOpacity className="absolute -top-7 w-16 h-16 bg-purple-500 rounded-full items-center justify-center shadow-lg shadow-purple-500/40">
            <MaterialIcons name="add" size={32} color="white" />
          </TouchableOpacity>

         
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}