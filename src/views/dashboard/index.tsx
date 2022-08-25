import { useEffect } from "react";
import Menu from "../../components/menu";
import { UseProject } from "../../context/project";
import { UseUser } from "../../context/user";
import "./styles.scss";

export default function Dashboard() {
  const { user, token, getUser } = UseUser();
  const { projects, getProject } = UseProject();

  useEffect(() => {
    if (projects.length === 0) {
      getProject();
    }
  }, [token]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container-dashboard-general">
      <div className="menu">
        <Menu />
      </div>
      <div className="container-dashboard">
        <div>
          <h1>Olá {user}</h1>
          <div className="line" />
        </div>
        <div>
          <p>Total de projetos</p>
          <div className="card">
            <h2>{projects.length} Projetos</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
