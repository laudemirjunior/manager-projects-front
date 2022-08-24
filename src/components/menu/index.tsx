import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CloseIcon from "../../assets/close.png";
import MenuIcon from "../../assets/menu.png";
import { UseProject } from "../../context/project";
import ModalCreateProject from "../modalCreateProject";
import "./styles.scss";

export default function Menu() {
  const { projects } = UseProject();
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(true);

  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  useEffect(() => {
    if (width < 600) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [width]);

  return (
    <div>
      <div className="bars">
        <img
          onClick={() => setShowMenu(!showMenu)}
          src={showMenu ? CloseIcon : MenuIcon}
          alt="menuIcon"
        />
      </div>
      {showMenu && (
        <div className="container-menu">
          <div className="container-projects">
            <div className="menu-item">
              <h2 onClick={() => navigate(`/dashboard`)}>Home</h2>
            </div>
            <div>
              <h2>Projetos</h2>
            </div>
            <div className="projects">
              {projects.map((item) => {
                return (
                  <div
                    className="project"
                    onClick={() => navigate(`/tasks/${item.id}`)}
                  >
                    <div className="project-item">
                      <h3>{item.name}</h3>
                      <h3>{">"}</h3>
                    </div>
                    <div className="line" />
                  </div>
                );
              })}
            </div>
          </div>
          <div onClick={() => setShow(true)} className="add-project">
            <b>+ New Project</b>
          </div>
          <div
            className="close"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <b>Sair</b>
          </div>
        </div>
      )}
      <ModalCreateProject show={show} setShow={setShow} />
    </div>
  );
}
