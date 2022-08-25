import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Pen from "../../assets/pen.png";
import Menu from "../../components/menu";
import ModalConfirmeDelete from "../../components/modalConfirmeDelete";
import ModalCreateTask from "../../components/modalCreateTask";
import ModalEditProject from "../../components/modalEditProject";
import { UseProject } from "../../context/project";
import { UseTask } from "../../context/task";
import "./styles.scss";

interface PropsDataTask {
  id: string;
  name: string;
  conclude: boolean;
  delivery: Date;
  status: string;
  responsible: string;
}

export default function Tasks() {
  const { id } = useParams();
  const { projectName, tasks, getTasks, editTask, deleteTask } = UseTask();
  const [show, setShow] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [newTasks, setNewTasks] = useState<PropsDataTask[]>([]);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [params, setParams] = useState("Todos");
  const { deleteProject } = UseProject();
  const [showModalDeleteTask, setShowModalDeleteTask] =
    useState<boolean>(false);

  const filterTasks = () => {
    if (params === "Todos") {
      setNewTasks(tasks);
    } else {
      setNewTasks(tasks.filter((fil) => fil.status === params));
    }
  };

  useEffect(() => {
    filterTasks();
  }, [params, tasks]);

  useEffect(() => {
    getTasks(id || "");
  }, [id]);

  const newDate = (item: { delivery: Date }) => {
    if (moment(item.delivery).format("L") === moment().format("L")) {
      return "Today";
    }
    if (
      moment(item.delivery).format("L") ===
      moment().subtract(1, "days").format("L")
    ) {
      return "Yesterday";
    }
    if (
      moment(item.delivery).format("L") === moment().add(1, "days").format("L")
    ) {
      return "Tomorrow";
    } else {
      return moment(item.delivery).format("L");
    }
  };

  return (
    <div className="container-general">
      <div className="menu">
        <Menu />
      </div>
      <div className="container-tasks">
        <div>
          <div className="header">
            <div className="name-project">
              <h2>{projectName}</h2>
              <span
                onClick={() => {
                  setShowModalEdit(!showModalEdit);
                }}
              >
                <img src={Pen} alt="pen" />
              </span>
            </div>
            <div className="header-right">
              <h2>
                {tasks.filter((item) => item.status === "Concluída").length ||
                  0}
                /{tasks.filter((item) => item.status === "Vencida").length || 0}
                /{tasks.length}
              </h2>
              <p
                className="button-delete"
                onClick={() => setShowModalDelete(true)}
              >
                Delete project
              </p>
            </div>
          </div>
          <div className="line" />
          <div className="radios">
            <div>
              <input
                type="radio"
                value="Todos"
                onChange={(e) => setParams(e.target.value)}
                checked={"Todos" === params}
              />
              <label>Todos</label>
            </div>
            <div>
              <input
                type="radio"
                value="Vencida"
                onChange={(e) => setParams(e.target.value)}
                checked={"Vencida" === params}
              />
              <label>Vencidas</label>
            </div>
            <div>
              <input
                type="radio"
                value="Pendente"
                onChange={(e) => setParams(e.target.value)}
                checked={"Pendente" === params}
              />
              <label>Pendentes</label>
            </div>
            <div>
              <input
                type="radio"
                value="Concluída"
                onChange={(e) => setParams(e.target.value)}
                checked={"Concluída" === params}
              />
              <label>Concluídas</label>
            </div>
          </div>
        </div>
        <div className="tasks">
          {newTasks.length !== 0 ? (
            newTasks.map((item) => {
              return (
                <div className={`task ${item.status}`}>
                  <input
                    type="checkbox"
                    checked={item.conclude === true}
                    onChange={() =>
                      editTask(item.id, { conclude: !item.conclude }, id || "")
                    }
                  />
                  <div className={"task-item"}>
                    <p>{item.name}</p>
                    <p className="gray-item">@{item.responsible}</p>
                    <p className="gray-item">{String(newDate(item))}</p>
                    <p
                      className="button-delete"
                      onClick={() => setShowModalDeleteTask(true)}
                    >
                      Delete task
                    </p>
                  </div>
                  <ModalConfirmeDelete
                    show={showModalDeleteTask}
                    setShow={setShowModalDeleteTask}
                    id={item.id || ""}
                    text="Tem certeza que deseja excluir esta task?"
                    action={deleteTask}
                  />
                </div>
              );
            })
          ) : (
            <b className="zero-tasks">Ainda não existe tasks aqui!</b>
          )}
          <div className="task-more" onClick={() => setShow(true)}>
            <b>+ Add Task</b>
          </div>
        </div>
      </div>
      <ModalCreateTask show={show} setShow={setShow} id={id || ""} />
      <ModalConfirmeDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        id={id || ""}
        text="Tem certeza que deseja excluir esse projeto?"
        action={deleteProject}
      />
      <ModalEditProject
        show={showModalEdit}
        setShow={setShowModalEdit}
        id={id || ""}
      />
    </div>
  );
}
