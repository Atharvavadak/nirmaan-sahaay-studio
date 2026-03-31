import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface Project {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  deadline: string;
  createdAt: string;
}

interface ProjectContextType {
  projects: Project[];
  selectedProjectId: string | null;
  selectedProject: Project | null;
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
  selectProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const STORAGE_KEY = "ns-projects";
const SELECTED_KEY = "ns-selected-project";

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() => {
    return localStorage.getItem(SELECTED_KEY);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (selectedProjectId) localStorage.setItem(SELECTED_KEY, selectedProjectId);
  }, [selectedProjectId]);

  const addProject = useCallback((data: Omit<Project, "id" | "createdAt">) => {
    const newProject: Project = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) => [...prev, newProject]);
  }, []);

  const selectProject = useCallback((id: string) => setSelectedProjectId(id), []);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? null;

  return (
    <ProjectContext.Provider value={{ projects, selectedProjectId, selectedProject, addProject, selectProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
};
