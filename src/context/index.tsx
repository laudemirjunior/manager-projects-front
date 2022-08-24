import { ReactNode } from "react";
import { ProjectProvider } from "./project";
import { TaskProvider } from "./task";
import { UserProvider } from "./user";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserProvider>
      <ProjectProvider>
        <TaskProvider>{children}</TaskProvider>
      </ProjectProvider>
    </UserProvider>
  );
};
