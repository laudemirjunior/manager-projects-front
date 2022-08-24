import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { UseProject } from "../../context/project";
import Button from "../button";
import "./styles.scss";

export default function ModalCreateProject({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (data: boolean) => void;
}) {
  const { createProject } = UseProject();

  const Schema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  async function onSubmitFunction(data: { name: string }) {
    await createProject(data.name);
    reset();
    setShow(false);
  }

  return (
    <>
      {show && (
        <form
          className="container-modal"
          onSubmit={handleSubmit(onSubmitFunction as () => Promise<void>)}
        >
          <div className="modal">
            <h2>Editar</h2>
            <div className="box">
              <label>Nome</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Ex: Offline"
              />
              {errors?.name && (
                <p className="input-error">{errors.name?.message as string}</p>
              )}
            </div>
            <div className="buttons">
              <Button
                name="Cancelar"
                onClick={() => {
                  setShow(!show);
                }}
              />
              <Button name="Criar" type="submit" />
            </div>
          </div>
        </form>
      )}
    </>
  );
}
