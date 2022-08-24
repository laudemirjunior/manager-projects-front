import Menu from "../../components/menu";
import { UseProject } from "../../context/project";
import { UseUser } from "../../context/user";
import "./styles.scss";

export default function Dashboard() {
  const { user } = UseUser();
  const { projects } = UseProject();

  return (
    <div style={{ display: "flex" }}>
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
