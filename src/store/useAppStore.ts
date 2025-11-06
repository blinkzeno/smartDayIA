import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Task, CalendarEvent, UserPreferences, TaskStatus } from './types';

interface AppStore extends AppState {
  // Actions Tâches
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string, softDelete?: boolean) => void;
  completeTask: (id: string, actualDuration?: number) => void;
  
  // Actions Événements
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  
  // Actions Préférences
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  
  // Actions IA
  reorderTasks: (taskIds: string[]) => void;
  suggestTimeSlots: (taskId: string) => CalendarEvent[];
  
  // Utilitaires
  clearCompleted: () => void;
  exportData: () => string;
  importData: (data: string) => boolean;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // État initial
      tasks: [],
      events: [],
      userPreferences: {
        name: 'Utilisateur',
        dailyFocusGoal: 240, // 4 heures
        preferredWorkingHours: { start: '09:00', end: '17:00' },
        breakFrequency: 90,
        theme: 'auto',
        notificationPreferences: {
          email: false,
          push: true,
          reminders: true
        },
        aiAssistance: true,
        autoReschedule: true
      },
      selectedDate: new Date(),
      isLoading: false,
      lastSync: null,

      // Actions Tâches
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          tasks: [...state.tasks, newTask],
          lastSync: new Date()
        }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date() }
              : task
          ),
          lastSync: new Date()
        }));
      },

      deleteTask: (id, softDelete = true) => {
        if (softDelete) {
          get().updateTask(id, { status: TaskStatus.CANCELLED });
        } else {
          set((state) => ({
            tasks: state.tasks.filter(task => task.id !== id),
            lastSync: new Date()
          }));
        }
      },

      completeTask: (id, actualDuration) => {
        const updates: Partial<Task> = {
          status: TaskStatus.DONE,
          completedAt: new Date()
        };

        if (actualDuration) {
          updates.actualDuration = actualDuration;
        }

        get().updateTask(id, updates);
      },

      // Actions Événements
      addEvent: (eventData) => {
        const newEvent: CalendarEvent = {
          ...eventData,
          id: generateId()
        };

        set((state) => ({
          events: [...state.events, newEvent],
          lastSync: new Date()
        }));
      },

      updateEvent: (id, updates) => {
        set((state) => ({
          events: state.events.map(event =>
            event.id === id ? { ...event, ...updates } : event
          ),
          lastSync: new Date()
        }));
      },

      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter(event => event.id !== id),
          lastSync: new Date()
        }));
      },

      // Actions Préférences
      updatePreferences: (updates) => {
        set((state) => ({
          userPreferences: { ...state.userPreferences, ...updates },
          lastSync: new Date()
        }));
      },

      // Actions IA
      reorderTasks: (taskIds) => {
        const { tasks } = get();
        
        const reorderedTasks = taskIds.map((id, index) => {
          const task = tasks.find(t => t.id === id);
          return task ? { ...task, aiSuggestedOrder: index } : null;
        }).filter(Boolean) as Task[];

        set({ tasks: reorderedTasks });
      },

      suggestTimeSlots: (taskId) => {
        const { tasks, events, userPreferences } = get();
        const task = tasks.find(t => t.id === taskId);
        if (!task) return [];

        // Logique de suggestion de créneaux (simplifiée)
        const suggestions: CalendarEvent[] = [];
        // Implémentation détaillée à faire dans le module IA
        
        return suggestions;
      },

      // Utilitaires
      clearCompleted: () => {
        set((state) => ({
          tasks: state.tasks.filter(task => task.status !== TaskStatus.DONE),
          lastSync: new Date()
        }));
      },

      exportData: () => {
        const state = get();
        return JSON.stringify({
          tasks: state.tasks,
          events: state.events,
          userPreferences: state.userPreferences,
          exportDate: new Date()
        });
      },

      importData: (data) => {
        try {
          const imported = JSON.parse(data);
          set({
            tasks: imported.tasks || [],
            events: imported.events || [],
            userPreferences: imported.userPreferences || get().userPreferences,
            lastSync: new Date()
          });
          return true;
        } catch (error) {
          console.error('Erreur import:', error);
          return false;
        }
      }
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      migrate: (persistedState: any, version) => {
        if (version === 0) {
          // Migration depuis la version 0
          return {
            ...persistedState,
            userPreferences: {
              ...persistedState.userPreferences,
              aiAssistance: true,
              autoReschedule: false
            }
          };
        }
        return persistedState;
      }
    }
  )
);

// Helper pour générer des IDs uniques
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};