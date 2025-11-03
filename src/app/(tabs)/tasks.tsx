// app/(tabs)/tasks.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

type Task = {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  priority: "high" | "medium" | "none";
};

export default function TasksScreen() {
  const [newTask, setNewTask] = useState("");
  const [activeFilter, setActiveFilter] = useState("Today");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design marketing mockups",
      category: "Work",
      completed: false,
      priority: "high",
    },
    {
      id: "2",
      title: "Plan weekly goals",
      category: "Personal",
      completed: false,
      priority: "medium",
    },
    {
      id: "3",
      title: "Finalize Q3 budget report",
      category: "Finance",
      completed: true,
      priority: "none",
    },
    {
      id: "4",
      title: "Call the vet for appointment",
      category: "Personal",
      completed: false,
      priority: "high",
    },
  ]);

  const filters = ["All", "Today", "Completed", "Priority"];

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskItem: Task = {
        id: Date.now().toString(),
        title: newTask,
        category: "General",
        completed: false,
        priority: "none",
      };
      setTasks([newTaskItem, ...tasks]);
      setNewTask("");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-transparent";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center px-4 pb-2 pt-4 justify-between bg-gray-50">
        <TouchableOpacity className="w-12 h-12 items-center justify-center">
          <MaterialIcons name="menu" size={28} color="#1e293b" />
        </TouchableOpacity>

        <Text className="text-xl font-bold text-slate-800 text-center flex-1">
          Your Tasks
        </Text>

        <TouchableOpacity className="w-12 h-12 items-center justify-center">
          <MaterialIcons name="notifications" size={28} color="#1e293b" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Add Task Input */}
        <View className="px-4 py-3">
          <View className="flex-row items-center bg-white rounded-2xl shadow-sm h-14 px-4">
            <TextInput
              className="flex-1 text-slate-800 text-base h-full"
              placeholder="What do you want to accomplish today?"
              placeholderTextColor="#94a3b8"
              value={newTask}
              onChangeText={setNewTask}
              onSubmitEditing={addTask}
            />
            <TouchableOpacity onPress={addTask}>
              <MaterialIcons name="add-circle" size={28} color="#cbd5e1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Tabs */}
        <View className="px-4 py-3">
          <View className="flex-row bg-slate-200/60 rounded-2xl p-1.5">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                className={`flex-1 items-center justify-center h-10 rounded-lg mx-1 ${
                  activeFilter === filter
                    ? "bg-white shadow-md"
                    : "bg-transparent"
                }`}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  className={`text-sm font-semibold ${
                    activeFilter === filter
                      ? "text-purple-600"
                      : "text-slate-500"
                  }`}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Task List */}
        <View className="px-4 py-3 space-y-3">
          {tasks.map((task) => (
            <View
              key={task.id}
              className="flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden"
            >
              {/* Priority Indicator */}
              <View
                className={`w-1.5 h-12 ${getPriorityColor(task.priority)}`}
              />

              <View className="flex-row items-center flex-1 py-2 pl-2.5 pr-4 justify-between">
                <View className="flex-row items-center flex-1">
                  {/* Checkbox */}
                  <TouchableOpacity
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-4 ${
                      task.completed
                        ? "bg-purple-600 border-purple-600"
                        : "border-slate-300"
                    }`}
                    onPress={() => toggleTaskCompletion(task.id)}
                  >
                    {task.completed && (
                      <MaterialIcons name="check" size={16} color="white" />
                    )}
                  </TouchableOpacity>

                  {/* Task Details */}
                  <View className="flex-1">
                    <Text
                      className={`text-base font-medium ${
                        task.completed
                          ? "text-slate-400 line-through"
                          : "text-slate-800"
                      }`}
                      numberOfLines={1}
                    >
                      {task.title}
                    </Text>
                    <Text
                      className={`text-sm ${
                        task.completed ? "text-slate-400" : "text-slate-500"
                      }`}
                      numberOfLines={2}
                    >
                      {task.category}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar with FAB */}
      <View className="absolute bottom-[-6%] left-0 right-[2%] h-28 flex items-end justify-center">
        {/* Floating Action Button */}
        <TouchableOpacity className="absolute -top-7 w-16 h-16 bg-purple-600 rounded-full items-center justify-center shadow-lg shadow-purple-500/40">
          <MaterialIcons name="auto-awesome" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
