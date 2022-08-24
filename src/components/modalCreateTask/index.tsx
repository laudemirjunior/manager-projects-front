import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { UseTask } from "../../context/task";
import Button from "../button";
import "./styles.scss";

interface PropsTask {
  name: string;
  conclude: boolean;
  delivery: Date;
  responsible: string;
}

export default function ModalCreateTask({
  show,
  setShow,
  id,
}: {
  show: boolean;
  setShow: (data: boolean) => void;
  id: string;
}) {
  const { createTask, getTasks } = UseTask();
  const [conclude, setConclude] = useState("false");

  const Schema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    delivery: yup.string().required("Data de entrega obrigatória"),
    responsible: yup.string().required("Responsável obrigatório"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  async function onSubmitFunction(data: PropsTask) {
    await createTask(id, {
      ...data,
      conclude: conclude === "false" ? false : true,
    });
    await getTasks(id);
    reset();
    setShow(!show);
  }

  return (
    <>
      {show && (
        <form
          className="container-modalCreateTask"
          onSubmit={handleSubmit(onSubmitFunction as () => Promise<void>)}
        >
          <div className="modal">
            <h2>Editar</h2>
            <div className="box">
              <label>Nome</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Ex: Criar home page"
              />
              {errors?.name && (
                <p className="input-error">{errors.name?.message as string}</p>
              )}
            </div>

            <div className="box">
              <label>Responsável</label>
              <input
                type="text"
                {...register("responsible")}
                placeholder="Ex: João"
              />
              {errors?.responsible && (
                <p className="input-error">
                  {errors.responsible?.message as string}
                </p>
              )}
            </div>
            <div className="box">
              <label>Entrega</label>
              <input type="date" {...register("delivery")} />
              {errors?.delivery && (
                <p className="input-error">
                  {errors.delivery?.message as string}
                </p>
              )}
            </div>
            <div className="box">
              <label>Concluída</label>
              <div className="inputs-radio">
                <div className="input-radio">
                  <input
                    type="radio"
                    value="true"
                    checked={conclude === "true"}
                    onChange={(e) => setConclude(e.target.value)}
                  />
                  <label>Sim</label>
                </div>
                <div className="input-radio">
                  <input
                    type="radio"
                    value="false"
                    checked={conclude === "false"}
                    onChange={(e) => setConclude(e.target.value)}
                  />
                  <label>Não</label>
                </div>
              </div>
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
