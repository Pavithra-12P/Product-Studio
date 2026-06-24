import { create } from "zustand";
import type { Project, User, Notification, GenerationStage } from "@/types";
import { sampleProjects, sampleUser, sampleNotifications } from "@/lib/sample-data";

interface AppState {
  user: User | null;
  projects: Project[];
  activeProject: Project | null;
  notifications: Notification[];
  sidebarOpen: boolean;
  searchQuery: string;
  generationStages: GenerationStage[];
  isGenerating: boolean;

  setUser: (user: User | null) => void;
  setProjects: (projects: Project[]) => void;
  setActiveProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  archiveProject: (id: string) => void;
  setNotifications: (notifications: Notification[]) => void;
  markNotificationRead: (id: string) => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
  setGenerationStages: (stages: GenerationStage[]) => void;
  setIsGenerating: (generating: boolean) => void;
  updateStage: (id: string, updates: Partial<GenerationStage>) => void;
  initializeStore: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  projects: [],
  activeProject: null,
  notifications: [],
  sidebarOpen: true,
  searchQuery: "",
  generationStages: [],
  isGenerating: false,

  setUser: (user) => set({ user }),
  setProjects: (projects) => set({ projects }),
  setActiveProject: (project) => set({ activeProject: project }),

  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),

  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      ),
      activeProject:
        state.activeProject?.id === id
          ? { ...state.activeProject, ...updates, updatedAt: new Date().toISOString() }
          : state.activeProject,
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      activeProject: state.activeProject?.id === id ? null : state.activeProject,
    })),

  duplicateProject: (id) => {
    const state = get();
    const project = state.projects.find((p) => p.id === id);
    if (project) {
      const duplicate: Project = {
        ...project,
        id: Math.random().toString(36).substring(2, 15),
        name: `${project.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      };
      set((s) => ({ projects: [duplicate, ...s.projects] }));
    }
  },

  archiveProject: (id) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, status: "archived" as const } : p
      ),
    })),

  setNotifications: (notifications) => set({ notifications }),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setGenerationStages: (stages) => set({ generationStages: stages }),

  setIsGenerating: (generating) => set({ isGenerating: generating }),

  updateStage: (id, updates) =>
    set((state) => ({
      generationStages: state.generationStages.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),

  initializeStore: () =>
    set({
      user: sampleUser,
      projects: sampleProjects,
      notifications: sampleNotifications,
    }),
}));
