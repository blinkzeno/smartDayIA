// Enums et types de base
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  CANCELLED = 'cancelled'
}

export enum TaskCategory {
  WORK = 'work',
  PERSONAL = 'personal',
  HEALTH = 'health',
  LEARNING = 'learning',
  FINANCE = 'finance',
  SOCIAL = 'social'
}

export enum BestTimeToDo {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  ANYTIME = 'anytime'
}

export enum EventType {
  MEETING = 'meeting',
  APPOINTMENT = 'appointment',
  TIME_BLOCK = 'time_block',
  REMINDER = 'reminder'
}

export enum RecurrencePattern {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

// Interfaces principales
export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  
  // Dates
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
  completedAt?: Date;
  
  // Métadonnées
  priority: TaskPriority;
  status: TaskStatus;
  
  // Propriétés IA
  estimatedDuration: number; // en minutes
  bestTimeToDo: BestTimeToDo;
  aiSuggestedOrder?: number;
  
  // Relations
  dependencies?: string[]; // IDs des tâches dépendantes
  tags?: string[];
  
  // Métriques
  actualDuration?: number; // temps réel passé
  satisfaction?: number; // 1-5 étoiles
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  type: EventType;
  
  // Récurrence
  recurrence: RecurrencePattern;
  recurrenceEnd?: Date;
  
  // Liens avec les tâches
  linkedTaskId?: string;
  
  // Métadonnées
  location?: string;
  attendees?: string[];
}

export interface UserPreferences {
  // Informations utilisateur
  name: string;
  email?: string;
  
  // Objectifs
  dailyFocusGoal: number; // minutes
  weeklyGoals?: {
    work: number;
    personal: number;
    health: number;
  };
  
  // Préférences de planning
  preferredWorkingHours: {
    start: string; // "09:00"
    end: string;   // "17:00"
  };
  breakFrequency: number; // minutes entre les pauses
  
  // Apparence
  theme: 'light' | 'dark' | 'auto';
  notificationPreferences: {
    email: boolean;
    push: boolean;
    reminders: boolean;
  };
  
  // Préférences IA
  aiAssistance: boolean;
  autoReschedule: boolean;
}

// State du store
export interface AppState {
  // Données
  tasks: Task[];
  events: CalendarEvent[];
  userPreferences: UserPreferences;
  
  // État UI
  selectedDate: Date;
  isLoading: boolean;
  lastSync: Date | null;
}