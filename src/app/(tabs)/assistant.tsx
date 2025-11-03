// src/screens/AssistantScreen.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const AssistantScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      sender: "SmartDay",
      text: "Good morning! How can I help you be more productive today?",
      timestamp: new Date(),
    },
    {
      id: 2,
      type: "user",
      sender: "You",
      text: "What's on my schedule for tomorrow?",
      timestamp: new Date(),
    },
    {
      id: 3,
      type: "ai",
      sender: "SmartDay",
      text: "Tomorrow, you have 'Project Sync-Up' at 10 AM. Would you like me to add a reminder?",
      actions: ["Add to Calendar", "Create Task"],
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        sender: "You",
        text: message,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: "ai",
          sender: "SmartDay",
          text: "I've added that to your schedule. Is there anything else I can help with?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleActionPress = (action: string) => {
    console.log(`Action pressed: ${action}`);
    // Handle action logic here
  };

  // Bottom navigation items
  const navItems = [
    { name: "Home", icon: "home" as const, route: "Home" },
    { name: "Tasks", icon: "checkmark-done-circle" as const, route: "Tasks" },
    { name: "Calendar", icon: "calendar" as const, route: "Calendar" },
    { name: "Assistant", icon: "chatbubble" as const, route: "Assistant" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Main Container with Gradient Background */}
      <LinearGradient colors={["#F5F4FF", "#EDF6FF"]} className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          {/* Top App Bar */}
          <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
            <TouchableOpacity className="w-12 h-12 items-center justify-center">
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>

            <Text className="text-lg font-bold text-gray-800 text-center flex-1">
              SmartDay
            </Text>

            <TouchableOpacity className="w-12 h-12 items-center justify-center">
              <Ionicons name="ellipsis-vertical" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* AI Visual Element */}
          <View className="h-36 w-full items-center justify-center">
            {/* Gradient Background Circles */}
            <View className="absolute w-32 h-32 rounded-full bg-blue-300/20 blur-2xl" />
            <View className="absolute w-24 h-24 rounded-full bg-purple-400/30 blur-xl" />

            {/* Central Icon */}
            <View className="absolute w-16 h-16 rounded-full bg-white/50 items-center justify-center">
              <MaterialIcons name="auto-awesome" size={32} color="#2b8cee" />
            </View>
          </View>

          {/* Chat Area */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-4 pt-2"
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            <View className="space-y-4 pb-4">
              {messages.map((msg) => (
                <View
                  key={msg.id}
                  className={`flex items-end gap-3 ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.type === "ai" && (
                    <View className="flex-row items-end gap-3">
                      {/* AI Avatar */}
                      <View className="w-10 h-10 rounded-full bg-purple-400/50 items-center justify-center">
                        <MaterialIcons
                          name="auto-awesome"
                          size={20}
                          color="white"
                        />
                      </View>

                      <View className="flex-1 flex-col gap-1 items-start max-w-[80%]">
                        <Text className="text-xs text-gray-500">
                          {msg.sender}
                        </Text>
                        <View className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                          <Text className="text-base text-gray-800">
                            {msg.text}
                          </Text>

                          {/* Action Buttons */}
                          {msg.actions && (
                            <View className="flex-row flex-wrap gap-2 mt-3">
                              {msg.actions.map((action, index) => (
                                <TouchableOpacity
                                  key={index}
                                  className="bg-blue-100 rounded-full px-4 py-2"
                                  onPress={() => handleActionPress(action)}
                                >
                                  <Text className="text-sm font-medium text-blue-600">
                                    {action}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  )}

                  {msg.type === "user" && (
                    <View className="flex-row items-end gap-3 justify-end">
                      <View className="flex-1 flex-col gap-1 items-end max-w-[80%]">
                        <Text className="text-xs text-gray-500">
                          {msg.sender}
                        </Text>
                        <View className="bg-blue-500 rounded-2xl rounded-br-none px-4 py-3">
                          <Text className="text-base text-white">
                            {msg.text}
                          </Text>
                        </View>
                      </View>

                      {/* User Avatar */}
                      <View className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Chat Input & Bottom Navigation Area */}
          <View className="absolute bottom-0 left-0 right-0 pt-16">
            {/* Gradient Overlay */}
            <LinearGradient
              colors={["rgba(237, 246, 255, 0.8)", "transparent"]}
              className="absolute bottom-0 left-0 right-0 h-32"
            />

            {/* Chat Input */}
            <View className="px-4 mb-8">
              <View className="flex-row items-center bg-gray-50 rounded-xl p-2 shadow-inner">
                <TextInput
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 px-2 py-2"
                  placeholder="Ask SmartDay anything..."
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  maxLength={500}
                />
                <TouchableOpacity
                  className="w-10 h-10 bg-blue-500 rounded-lg items-center justify-center ml-2"
                  onPress={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Ionicons
                    name="send"
                    size={20}
                    color="white"
                    style={{ opacity: message.trim() ? 1 : 0.5 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AssistantScreen;
