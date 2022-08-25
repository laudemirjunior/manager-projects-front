import { createContext, ReactNode, useContext, useState } from "react";
import api from "../services";
import { UseUser } from "./user";

interface ProviderProps {
  children: ReactNode;
}

interface PropsTask {
  name: string;
  conclude: boolean;
  delivery: Date;
  responsible: string;
}

interface PropsDataTask {
  id: string;
  name: string;
  conclude: boolean;
  delivery: Date;
  status: string;
  responsible: string;
}

interface DataTaskContext {
  getTasks: (id: string) => Promise<void>;
  tasks: PropsDataTask[];
  projectName: string;
  createTask: (id: string, data: PropsTask) => Promise<void>;
  editTask: (
    id: string,
    data: { conclude: boolean },
    idProject: string
  ) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<DataTaskContext>({} as DataTaskContext);
const TaskProvider = ({ children }: ProviderProps) => {
  const { headers } = UseUser();
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState("");

  const getTasks = async (id: string) =>
    await api
      .get(`/task/${id}`, headers)
      .then((res) => {
        setTasks(res.data.tasks);
        setProjectName(res.data.name);
      })
      .catch((err) => alert(err));

  const createTask = (id: string, data: PropsTask) =>
    api
      .post(`/task/${id}`, data, headers)
      .then((res) => {})
      .catch((err) => alert(err));

  const deleteTask = (id: string) =>
    api
      .delete(`/task/${id}`, headers)
      .then((res) =>
        setTasks(tasks.filter((item: PropsDataTask) => item.id !== id))
      )
      .catch((err) => alert(err));

  const editTask = (
    id: string,
    data: { conclude: boolean },
    idProject: string
  ) =>
    api
      .patch(`/task/${id}`, data, headers)
      .then((res) => {
        getTasks(idProject);
      })
      .catch((err) => alert(err));

  return (
    <TaskContext.Provider
      value={{ getTasks, tasks, projectName, createTask, editTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

function UseTask() {
  const context = useContext(TaskContext);

  return context;
}

export { TaskProvider, TaskContext, UseTask };
