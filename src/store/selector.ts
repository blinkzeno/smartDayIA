import { useAppStore } from './useAppStore';
import { Task, TaskStatus, TaskPriority } from './types';

// Sélecteurs de base
export const useTasks = () => useAppStore(state => state.tasks);
export const useEvents = () => useAppStore(state => state.events);
export const useUserPreferences = () => useAppStore(state => state.userPreferences);

// Sélecteurs par date
export const useTodayTasks = () => {
  const tasks = useTasks();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return tasks.filter(task => {
    if (task.status === TaskStatus.DONE || task.status === TaskStatus.CANCELLED) {
      return false;
    }
    
    if (!task.deadline) return true;
    
    const taskDate = new Date(task.deadline);
    taskDate.setHours(0, 0, 0, 0);
    
    return taskDate.getTime() === today.getTime();
  });
};

export const useOverdueTasks = () => {
  const tasks = useTasks();
  const now = new Date();
  
  return tasks.filter(task => {
    if (task.status === TaskStatus.DONE || task.status === TaskStatus.CANCELLED) {
      return false;
    }
    
    return task.deadline && new Date(task.deadline) < now;
  });
};

export const useUpcomingTasks = () => {
  const tasks = useTasks();
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  return tasks.filter(task => {
    if (task.status === TaskStatus.DONE || task.status === TaskStatus.CANCELLED) {
      return false;
    }
    
    return task.deadline && 
           new Date(task.deadline) > now && 
           new Date(task.deadline) <= nextWeek;
  });
};

// Sélecteurs par statut et priorité
export const useTasksByStatus = (status: TaskStatus) => {
  const tasks = useTasks();
  return tasks.filter(task => task.status === status);
};

export const useTasksByPriority = (priority: TaskPriority) => {
  const tasks = useTasks();
  return tasks.filter(task => task.priority === priority);
};

// Sélecteurs pour l'IA
export const useMovableTasks = () => {
  const tasks = useTasks();
  const now = new Date();
  
  return tasks.filter(task => {
    if (task.status !== TaskStatus.TODO) return false;
    if (task.priority === TaskPriority.URGENT) return false;
    
    // Tâches sans deadline ou avec deadline flexible
    return !task.deadline || 
           new Date(task.deadline).getTime() - now.getTime() > 24 * 60 * 60 * 1000;
  });
};

export const useSimilarTasks = (category: string, duration: number) => {
  const tasks = useTasks();
  
  return tasks.filter(task => 
    task.category === category &&
    Math.abs(task.estimatedDuration - duration) < 30 && // ±30 minutes
    task.status === TaskStatus.DONE
  );
};

// Métriques et statistiques
export const useCompletionRate = () => {
  const tasks = useTasks();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === TaskStatus.DONE).length;
  
  return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
};

export const useWorkloadMetrics = () => {
  const tasks = useTasks();
  const pendingTasks = tasks.filter(task => 
    task.status === TaskStatus.TODO || task.status === TaskStatus.IN_PROGRESS
  );
  
  const totalEstimatedTime = pendingTasks.reduce(
    (total, task) => total + task.estimatedDuration, 0
  );
  
  const highPriorityCount = pendingTasks.filter(
    task => task.priority === TaskPriority.HIGH || task.priority === TaskPriority.URGENT
  ).length;
  
  return {
    pendingCount: pendingTasks.length,
    totalEstimatedTime,
    highPriorityCount,
    averagePriority: pendingTasks.length > 0 ? 
      pendingTasks.reduce((sum, task) => sum + getPriorityValue(task.priority), 0) / pendingTasks.length : 0
  };
};

const getPriorityValue = (priority: TaskPriority): number => {
  const values = {
    [TaskPriority.LOW]: 1,
    [TaskPriority.MEDIUM]: 2,
    [TaskPriority.HIGH]: 3,
    [TaskPriority.URGENT]: 4
  };
  return values[priority];
};