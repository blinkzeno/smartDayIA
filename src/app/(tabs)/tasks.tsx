// app/(tabs)/tasks.tsx
import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// Import store and types
import {
  useTodayTasks,
  useTasksByStatus,
  useCompletionRate,
} from "@/store/selector";
import { useAppStore } from "@/store/useAppStore";
import {
  TaskStatus,
  TaskPriority,
  TaskCategory,
  type Task,
  BestTimeToDo,
} from "@/store/types";

// Types for component props
type FilterType = "All" | "Today" | "Completed" | "Priority";

// Custom hooks
const useTaskActions = () => {
  const { addTask, updateTask, deleteTask, tasks } = useAppStore();

  const toggleTaskCompletion = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const isDone = task.status === TaskStatus.DONE;
      updateTask(taskId, {
        status: isDone ? TaskStatus.TODO : TaskStatus.DONE,
        completedAt: isDone ? undefined : new Date(),
      });
    },
    [tasks, updateTask]
  );

  const handleAddTask = useCallback(
    (title: string, priority: TaskPriority = TaskPriority.MEDIUM) => {
      if (title.trim()) {
        addTask({
          title: title.trim(),
          description: "",
          category: TaskCategory.PERSONAL,
          priority: priority,
          status: TaskStatus.TODO,
          estimatedDuration: 30,
          bestTimeToDo: BestTimeToDo.ANYTIME,
        });
        return true;
      }
      return false;
    },
    [addTask]
  );

  const handleUpdateTaskPriority = useCallback(
    (taskId: string, priority: TaskPriority) => {
      updateTask(taskId, { priority });
    },
    [updateTask]
  );

  const handleDeleteTask = useCallback(
    (taskId: string, taskTitle: string) => {
      Alert.alert(
        "Supprimer la tâche",
        `Êtes-vous sûr de vouloir supprimer "${taskTitle}" ?`,
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Supprimer",
            style: "destructive",
            onPress: () => deleteTask(taskId, true),
          },
        ]
      );
    },
    [deleteTask]
  );

  return {
    toggleTaskCompletion,
    handleAddTask,
    handleUpdateTaskPriority,
    handleDeleteTask,
    tasks,
  };
};

// Utility functions
const getPriorityColor = (priority: TaskPriority): string => {
  const priorityColors = {
    [TaskPriority.URGENT]: "bg-red-500",
    [TaskPriority.HIGH]: "bg-orange-500",
    [TaskPriority.MEDIUM]: "bg-yellow-500",
    [TaskPriority.LOW]: "bg-blue-500",
  };
  return priorityColors[priority] || "bg-transparent";
};

const getPriorityTextColor = (priority: TaskPriority): string => {
  const priorityColors = {
    [TaskPriority.URGENT]: "text-red-600 dark:text-red-400",
    [TaskPriority.HIGH]: "text-orange-600 dark:text-orange-400",
    [TaskPriority.MEDIUM]: "text-yellow-600 dark:text-yellow-400",
    [TaskPriority.LOW]: "text-blue-600 dark:text-blue-400",
  };
  return priorityColors[priority] || "text-gray-600 dark:text-gray-400";
};

const getPriorityBorderColor = (priority: TaskPriority): string => {
  const priorityColors = {
    [TaskPriority.URGENT]: "border-red-200 dark:border-red-800",
    [TaskPriority.HIGH]: "border-orange-200 dark:border-orange-800",
    [TaskPriority.MEDIUM]: "border-yellow-200 dark:border-yellow-800",
    [TaskPriority.LOW]: "border-blue-200 dark:border-blue-800",
  };
  return priorityColors[priority] || "border-gray-200 dark:border-gray-800";
};

const getPriorityLabel = (priority: TaskPriority): string => {
  const priorityLabels = {
    [TaskPriority.URGENT]: "Urgent",
    [TaskPriority.HIGH]: "Haute",
    [TaskPriority.MEDIUM]: "Moyenne",
    [TaskPriority.LOW]: "Basse",
  };
  return priorityLabels[priority] || "Non définie";
};

const getStatusIcon = (status: TaskStatus): string => {
  const statusIcons = {
    [TaskStatus.DONE]: "check-circle",
    [TaskStatus.IN_PROGRESS]: "radio-button-on",
    [TaskStatus.TODO]: "radio-button-off",
  };
  return statusIcons[status] || "radio-button-off";
};

const getStatusColor = (status: TaskStatus): string => {
  const statusColors = {
    [TaskStatus.DONE]: "text-green-500 dark:text-green-400",
    [TaskStatus.IN_PROGRESS]: "text-blue-500 dark:text-blue-400",
    [TaskStatus.TODO]: "text-gray-400 dark:text-gray-500",
  };
  return statusColors[status] || "text-gray-400 dark:text-gray-500";
};

// Sub-components
const Header = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-row items-center px-4 pb-2 pt-4 justify-between bg-gray-50 dark:bg-gray-900">
      <TouchableOpacity className="w-12 h-12 items-center justify-center">
        <MaterialIcons
          name="menu"
          size={28}
          color={isDark ? "#f1f5f9" : "#1e293b"}
        />
      </TouchableOpacity>

      <View className="flex-1 items-center">
        <Text className="text-xl font-bold text-slate-800 dark:text-slate-200">
          Your Tasks
        </Text>
      </View>

      <TouchableOpacity className="w-12 h-12 items-center justify-center">
        <MaterialIcons
          name="notifications"
          size={28}
          color={isDark ? "#f1f5f9" : "#1e293b"}
        />
      </TouchableOpacity>
    </View>
  );
};

interface AddTaskInputProps {
  value: string;
  onChange: (text: string) => void;
  onSubmit: (priority: TaskPriority) => void;
  selectedPriority: TaskPriority;
  onPriorityChange: (priority: TaskPriority) => void;
}

const AddTaskInput: React.FC<AddTaskInputProps> = ({
  value,
  onChange,
  onSubmit,
  selectedPriority,
  onPriorityChange,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const PrioritySelector = () => (
    <View className="flex-row mb-3 space-x-2">
      {Object.values(TaskPriority).map((priority) => (
        <TouchableOpacity
          key={priority}
          onPress={() => onPriorityChange(priority)}
          className={`px-3 py-2 rounded-lg border-2 ${
            selectedPriority === priority
              ? getPriorityBorderColor(priority) +
                " " +
                getPriorityColor(priority)
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              selectedPriority === priority
                ? "text-white"
                : getPriorityTextColor(priority)
            }`}
          >
            {getPriorityLabel(priority)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View className="px-4 py-3">
      <PrioritySelector />
      <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-slate-800/50 h-14 px-4">
        <TextInput
          className="flex-1 text-slate-800 dark:text-slate-200 text-base h-full"
          placeholder="What do you want to accomplish today?"
          placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
          value={value}
          onChangeText={onChange}
          onSubmitEditing={() => onSubmit(selectedPriority)}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={() => onSubmit(selectedPriority)}>
          <MaterialIcons
            name="add-circle"
            size={28}
            color={value.trim() ? "#8b5cf6" : isDark ? "#475569" : "#cbd5e1"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const filters: FilterType[] = ["All", "Today", "Completed", "Priority"];

  return (
    <View className="px-4 py-3">
      <View className="flex-row bg-slate-200/60 dark:bg-gray-700/60 rounded-2xl p-1.5">
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={{
              backgroundColor:
                activeFilter === filter
                  ? isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "white"
                  : "transparent",
              shadowOpacity: activeFilter === filter ? 0.2 : 0,
            }}
            className="flex-1 items-center justify-center h-10 rounded-lg mx-1"
            onPress={() => onFilterChange(filter)}
          >
            <Text
              className={`text-sm font-semibold ${
                activeFilter === filter
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  onPriorityChange: (id: string, priority: TaskPriority) => void;
}

const TaskItem: React.FC<TaskItemProps> = React.memo(
  ({ task, onToggle, onDelete, onPriorityChange }) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const handlePriorityPress = () => {
      Alert.alert(
        "Changer la priorité",
        `Choisissez la nouvelle priorité pour "${task.title}"`,
        [
          {
            text: "Basse",
            onPress: () => onPriorityChange(task.id, TaskPriority.LOW),
            style: "default",
          },
          {
            text: "Moyenne",
            onPress: () => onPriorityChange(task.id, TaskPriority.MEDIUM),
            style: "default",
          },
          {
            text: "Haute",
            onPress: () => onPriorityChange(task.id, TaskPriority.HIGH),
            style: "default",
          },
          {
            text: "Urgente",
            onPress: () => onPriorityChange(task.id, TaskPriority.URGENT),
            style: "destructive",
          },
          {
            text: "Annuler",
            style: "cancel",
          },
        ]
      );
    };

    return (
      <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-slate-800/50 overflow-hidden">
        {/* Priority Indicator - Now clickable */}
        <TouchableOpacity
          onPress={handlePriorityPress}
          className={`w-5 h-16 ${getPriorityColor(
            task.priority
          )} items-center justify-center`}
        >
          <MaterialIcons name="flag" size={16} color="white" />
        </TouchableOpacity>

        <View className="flex-row items-center flex-1 py-2 pl-2.5 pr-4 justify-between">
          <View className="flex-row items-center flex-1">
            {/* Status Icon */}
            <TouchableOpacity
              className="mr-4"
              onPress={() => onToggle(task.id)}
            >
              <MaterialIcons
                name={getStatusIcon(task.status) as any}
                size={20}
                className={getStatusColor(task.status)}
              />
            </TouchableOpacity>

            {/* Task Details */}
            <View className="flex-1">
              <Text
                className={`text-base font-medium ${
                  task.status === TaskStatus.DONE
                    ? "text-slate-400 dark:text-slate-500 line-through"
                    : "text-slate-800 dark:text-slate-200"
                }`}
                numberOfLines={2}
              >
                {task.title}
              </Text>

              <View className="flex-row items-center mt-1 space-x-3">
                <Text
                  className={`text-sm ${
                    task.status === TaskStatus.DONE
                      ? "text-slate-400 dark:text-slate-500"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {task.category}
                </Text>

                {/* Priority Badge */}
                <TouchableOpacity
                  onPress={handlePriorityPress}
                  className={`px-2 py-1 absolute right-5 bottom-2 rounded-full border ${getPriorityBorderColor(
                    task.priority
                  )} ${getPriorityColor(task.priority)}`}
                >
                  <Text className="text-xs font-medium text-white">
                    {getPriorityLabel(task.priority)}
                  </Text>
                </TouchableOpacity>

                {task.estimatedDuration > 0 && (
                  <Text
                    className={`text-sm ${
                      task.status === TaskStatus.DONE
                        ? "text-slate-400 dark:text-slate-500"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {task.estimatedDuration} min
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Delete Button */}
          <TouchableOpacity
            onPress={() => onDelete(task.id, task.title)}
            className="p-2"
          >
            <MaterialIcons
              name="delete-outline"
              size={20}
              color={isDark ? "#64748b" : "#94a3b8"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

interface TaskListProps {
  tasks: Task[];
  activeFilter: FilterType;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string, title: string) => void;
  onPriorityChange: (id: string, priority: TaskPriority) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  activeFilter,
  onToggleTask,
  onDeleteTask,
  onPriorityChange,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  if (tasks.length === 0) {
    return (
      <View className="items-center justify-center py-10">
        <MaterialIcons
          name="check-circle-outline"
          size={48}
          color={isDark ? "#475569" : "#cbd5e1"}
        />
        <Text className="text-slate-500 dark:text-slate-400 text-lg mt-2">
          {activeFilter === "Completed"
            ? "Aucune tâche terminée"
            : "Aucune tâche trouvée"}
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4 py-3 space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onPriorityChange={onPriorityChange}
        />
      ))}
    </View>
  );
};

interface StatisticsProps {
  todayTasksCount: number;
  completedTasksCount: number;
  completionRate: number;
  tasksByPriority: {
    urgent: number;
    high: number;
    medium: number;
    low: number;
  };
}

const Statistics: React.FC<StatisticsProps> = ({
  todayTasksCount,
  completedTasksCount,
  completionRate,
  tasksByPriority,
}) => (
  <View className="px-4 py-6">
    <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm dark:shadow-slate-800/50">
      <Text className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
        Statistiques
      </Text>

      {/* Completion Stats */}
      <View className="flex-row justify-between mb-4">
        <View className="items-center">
          <Text className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {todayTasksCount}
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 text-sm">
            Aujourd'hui
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-green-600 dark:text-green-400">
            {completedTasksCount}
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 text-sm">
            Terminées
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(completionRate)}%
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 text-sm">
            Complétion
          </Text>
        </View>
      </View>

      {/* Priority Stats */}
      <View className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <Text className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Par Priorité
        </Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <View className="w-8 h-8 bg-red-500 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {tasksByPriority.urgent}
              </Text>
            </View>
            <Text className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              Urgent
            </Text>
          </View>
          <View className="items-center">
            <View className="w-8 h-8 bg-orange-500 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {tasksByPriority.high}
              </Text>
            </View>
            <Text className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              Haute
            </Text>
          </View>
          <View className="items-center">
            <View className="w-8 h-8 bg-yellow-500 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {tasksByPriority.medium}
              </Text>
            </View>
            <Text className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              Moyenne
            </Text>
          </View>
          <View className="items-center">
            <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {tasksByPriority.low}
              </Text>
            </View>
            <Text className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              Basse
            </Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

const FloatingActionButton = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="absolute bottom-[-6%] left-0 right-[2%] h-28 flex items-end justify-center">
      <TouchableOpacity
        className="absolute -top-7 w-16 h-16 bg-purple-600 dark:bg-purple-500 rounded-full items-center justify-center shadow-lg shadow-purple-500/40 dark:shadow-purple-400/40"
        onPress={() => {
          Alert.alert("IA", "Fonction d'optimisation IA à implémenter");
        }}
      >
        <MaterialIcons name="auto-awesome" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// Main component
export default function TasksScreen() {
  const [newTask, setNewTask] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority>(
    TaskPriority.MEDIUM
  );
  const [activeFilter, setActiveFilter] = useState<FilterType>("Today");
  const colorScheme = useColorScheme();

  // Store selectors
  const todayTasks = useTodayTasks();
  const completedTasks = useTasksByStatus(TaskStatus.DONE);
  const completionRate = useCompletionRate();

  // Task actions
  const {
    toggleTaskCompletion,
    handleAddTask,
    handleUpdateTaskPriority,
    handleDeleteTask,
    tasks,
  } = useTaskActions();

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case "Today":
        return todayTasks;
      case "Completed":
        return completedTasks;
      case "Priority":
        return todayTasks.filter(
          (task) =>
            task.priority === TaskPriority.HIGH ||
            task.priority === TaskPriority.URGENT
        );
      case "All":
      default:
        return tasks.filter((task) => task.status !== TaskStatus.CANCELLED);
    }
  }, [activeFilter, todayTasks, completedTasks, tasks]);

  // Tasks by priority for statistics
  const tasksByPriority = useMemo(() => {
    const allTasks = tasks.filter(
      (task) => task.status !== TaskStatus.CANCELLED
    );
    return {
      urgent: allTasks.filter((task) => task.priority === TaskPriority.URGENT)
        .length,
      high: allTasks.filter((task) => task.priority === TaskPriority.HIGH)
        .length,
      medium: allTasks.filter((task) => task.priority === TaskPriority.MEDIUM)
        .length,
      low: allTasks.filter((task) => task.priority === TaskPriority.LOW).length,
    };
  }, [tasks]);

  const handleAddTaskPress = useCallback(
    (priority: TaskPriority) => {
      if (handleAddTask(newTask, priority)) {
        setNewTask("");
        setSelectedPriority(TaskPriority.MEDIUM); // Reset to default priority
      }
    },
    [newTask, handleAddTask]
  );

  const handlePriorityChange = useCallback(
    (taskId: string, priority: TaskPriority) => {
      handleUpdateTaskPriority(taskId, priority);
    },
    [handleUpdateTaskPriority]
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <Header />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <AddTaskInput
          value={newTask}
          onChange={setNewTask}
          onSubmit={handleAddTaskPress}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
        />

        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <TaskList
          tasks={filteredTasks}
          activeFilter={activeFilter}
          onToggleTask={toggleTaskCompletion}
          onDeleteTask={handleDeleteTask}
          onPriorityChange={handlePriorityChange}
        />

        <Statistics
          todayTasksCount={todayTasks.length}
          completedTasksCount={completedTasks.length}
          completionRate={completionRate}
          tasksByPriority={tasksByPriority}
        />
      </ScrollView>

      <FloatingActionButton />
    </SafeAreaView>
  );
}
