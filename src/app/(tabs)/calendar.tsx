// src/screens/CalendarScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(29); // Oct 29 is selected in the reference
  const [currentView, setCurrentView] = useState("Month");

  // Calendar data
  const month = "October 2024";
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const calendarDays = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31],
  ];

  // Events data
  const events = [
    {
      id: 1,
      title: "Morning Workout",
      time: "10:00 AM - 11:00 AM",
      icon: "fitness-center",
      color: "#D8B4FE", // purple-300 equivalent
    },
    {
      id: 2,
      title: "Design Sync Meeting",
      time: "11:30 AM - 12:30 PM",
      icon: "group",
      color: "#7DD3FC", // sky-300 equivalent
    },
    {
      id: 3,
      title: "Lunch with Sarah",
      time: "1:00 PM - 2:00 PM",
      icon: "restaurant",
      color: "#86EFAC", // green-300 equivalent
    },
  ];

  // Bottom navigation items
  const navItems = [
    { name: "Home", icon: "home" },
    { name: "Tasks", icon: "checkmark-done-circle" },
    { name: "Calendar", icon: "calendar" },
    { name: "Assistant", icon: "chatbubble" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar barStyle="dark-content" />

      {/* Main Content */}
      <ScrollView className="flex-1 pb-28">
        {/* Top App Bar */}
        <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
          <TouchableOpacity className="w-12 h-12 items-center justify-center">
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>

          <Text className="text-lg font-bold text-gray-800 dark:text-white text-center flex-1">
            {month}
          </Text>

          <TouchableOpacity className="w-12 h-12 items-center justify-center">
            <Ionicons name="chevron-forward" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View className="px-4 mt-2">
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
            {/* Week Days Header */}
            <View className="flex-row mb-1">
              {weekDays.map((day, index) => (
                <View key={index} className="flex-1 items-center">
                  <Text className="text-xs font-bold text-gray-500 dark:text-gray-400">
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar Days */}
            {calendarDays.map((week, weekIndex) => (
              <View key={weekIndex} className="flex-row mb-1">
                {week.map((day, dayIndex) => (
                  <TouchableOpacity
                    key={dayIndex}
                    className="flex-1 items-center py-2 "
                    onPress={() => setSelectedDate(day)}
                  >
                    <View
                      className={`w-10 h-10  items-center justify-center `}
                      style={{
                        backgroundColor:
                          day === selectedDate ? "#4F46E5" : "transparent",
                        borderRadius: day === selectedDate ? 100 : 0,
                      }}
                    >
                      <Text
                        className={`text-sm font-medium  ${
                          day === selectedDate
                            ? "text-white"
                            : "text-gray-800 dark:text-white"
                        }`}
                      >
                        {day}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Segmented Control */}
        <View className="px-4 py-4 mt-2">
          <View className="flex-row bg-gray-200 dark:bg-black/20 rounded-xl p-1">
            {["Day", "Week", "Month"].map((view) => (
              <TouchableOpacity
                key={view}
                style={[
                  styles.filterButton,
                  currentView === view && styles.activeFilter,
                ]}
                className={`flex-1 py-3 rounded-lg `}
                onPress={() => setCurrentView(view)}
              >
                <Text
                  className={`text-sm font-medium text-center ${
                    currentView === view
                      ? "text-gray-800 dark:text-black"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {view}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Events Section */}
        <View className="px-4">
          <Text className="text-xl font-bold text-gray-800 dark:text-white px-0 pb-3 pt-2">
            Tuesday, Oct 29
          </Text>

          {/* Events List */}
          <View className="space-y-3">
            {events.map((event) => (
              <View
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 flex-row items-center shadow-sm min-h-[72px]"
              >
                {/* Color Indicator */}
                <View
                  className="w-1.5 h-12 rounded-full mr-4"
                  style={{ backgroundColor: event.color }}
                />

                {/* Event Details */}
                <View className="flex-1">
                  <Text className="text-base font-medium text-gray-800 dark:text-white mb-1">
                    {event.title}
                  </Text>
                  <View className="flex-row items-center">
                    <MaterialIcons
                      name={event.icon as any}
                      size={16}
                      color="#6B7280"
                    />
                    <Text className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      {event.time}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar with FAB */}
      <View className="absolute bottom-[-6%] left-0 right-[2%] h-28 flex items-end justify-center">
        {/* Floating Action Button */}
        <TouchableOpacity className="absolute -top-7 w-16 h-16 bg-purple-600 rounded-full items-center justify-center shadow-lg shadow-purple-500/40">
          <MaterialIcons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeFilter: {
    backgroundColor: "white",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: "#000",
    elevation: 3,
  },
});

export default CalendarScreen;
