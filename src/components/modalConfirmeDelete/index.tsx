import { UseProject } from "../../context/project";
import Button from "../button";
import "./styles.scss";

export default function ModalConfirmeDelete({
  show,
  setShow,
  id,
}: {
  show: boolean;
  setShow: (data: boolean) => void;
  id: string;
}) {
  const { deleteProject } = UseProject();

  return (
    <>
      {show && (
        <div className="container-modalCreateProject">
          <div className="modal">
            <h2>Conformar exclusão</h2>
            <div className="box">
              <p>Tem certeza que deseja excluir esse projeto?</p>
            </div>
            <div className="buttons">
              <Button
                name="Não"
                onClick={() => {
                  setShow(!show);
                }}
              />
              <Button
                name="Sim"
                onClick={() => {
                  setShow(!show);
                  deleteProject(id);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
