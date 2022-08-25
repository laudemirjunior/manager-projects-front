import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services";
import { UseUser } from "./user";

interface ProviderProps {
  children: ReactNode;
}

interface DataProject {
  id: string;
  name: string;
}

interface DataProjectContext {
  projects: DataProject[];
  createProject: (name: string) => Promise<void>;
  deleteProject: (id: string) => void;
  editProject: (name: string, id: string) => Promise<void>;
  getProject: () => Promise<void>;
}

const ProjectContext = createContext<DataProjectContext>(
  {} as DataProjectContext
);
const ProjectProvider = ({ children }: ProviderProps) => {
  const { headers } = UseUser();
  const [projects, setProjects] = useState<DataProject[]>([]);
  const { token, setToken } = UseUser();
  const navigate = useNavigate();

  const getProject = () =>
    api
      .get("/project", headers)
      .then((res) => setProjects(res.data))
      .catch(() => setToken(""));

  const createProject = (name: string) =>
    api
      .post("/project", { name: name }, headers)
      .then((res) => setProjects([...projects, res.data]))
      .catch((err) => alert(err));

  const editProject = (name: string, id: string) =>
    api
      .patch(`/project/${id}`, { name: name }, headers)
      .then((res) => {})
      .catch((err) => alert(err));

  const deleteProject = (id: string) =>
    api
      .delete(`/project/${id}`, headers)
      .then(() => {
        setProjects(projects.filter((item) => item.id !== id));
        navigate("/dashboard");
      })
      .catch((err) => alert(err));

  return (
    <ProjectContext.Provider
      value={{
        projects,
        createProject,
        deleteProject,
        editProject,
        getProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

function UseProject() {
  const context = useContext(ProjectContext);

  return context;
}

export { ProjectProvider, ProjectContext, UseProject };
