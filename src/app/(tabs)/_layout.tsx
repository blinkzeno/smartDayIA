// app/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: scheme === "dark" ? "#0B0B0F" : "#FFFFFF",
            borderTopColor: scheme === "dark" ? "#1E1E24" : "#EAEAEA",
            height: 60,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: "#a71bfa",
          tabBarInactiveTintColor: "#a80bfa",
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "index") {
              return (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={26}
                  color={color}
                />
              );
            } else if (route.name === "tasks") {
              return (
                <Ionicons
                  name={
                    focused ? "checkmark-circle" : "checkmark-circle-outline"
                  }
                  size={26}
                  color={color}
                />
              );
            } else if (route.name === "calendar") {
              return (
                <Ionicons
                  name={focused ? "calendar" : "calendar-outline"}
                  size={26}
                  color={color}
                />
              );
            } else if (route.name === "assistant") {
              return (
                <MaterialCommunityIcons
                  name={focused ? "robot" : "robot-outline"}
                  size={28}
                  color={color}
                />
              );
            }
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="tasks" options={{ title: "Tasks" }} />
        <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
        <Tabs.Screen name="assistant" options={{ title: "Assistant" }} />
      </Tabs>
    </>
  );
}
