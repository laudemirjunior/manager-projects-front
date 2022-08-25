import Button from "../button";
import "./styles.scss";

export default function ModalConfirmeDelete({
  show,
  setShow,
  id,
  text,
  action,
}: {
  show: boolean;
  setShow: (data: boolean) => void;
  id: string;
  text: string;
  action: (id: string) => void;
}) {
  return (
    <>
      {show && (
        <div className="container-modalCreateProject">
          <div className="modal">
            <h2>Confirmar exclusão</h2>
            <div className="box">
              <p>{text}</p>
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
                  action(id);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
