import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import RegisterImage from "../../assets/undraw_sign_in_re_o58h.svg";
import Bar from "../../components/bar";
import Button from "../../components/button";
import Footer from "../../components/footer";
import { UseUser } from "../../context/user";
import "./styles.scss";

interface PropsUserRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { registerUser } = UseUser();

  const Schema = yup.object().shape({
    name: yup.string().required("Nome Obrigatório"),
    email: yup.string().email("Email Inválido").required("Email Obrigatório"),
    password: yup
      .string()
      .required("Senha Obrigatória")
      .min(6, "Mínimo de 6 dígitos"),
    confirmPassword: yup
      .string()
      .required("Senhas Diferentes")
      .oneOf([yup.ref("password"), null], "Senhas Diferentes"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  function onSubmitFunction(data: PropsUserRegister) {
    delete data.confirmPassword;
    registerUser(data);
  }

  return (
    <>
      <Bar />
      <div className="container-register">
        <form onSubmit={handleSubmit(onSubmitFunction as () => void)}>
          <div>
            <h1>Cadastrar</h1>
          </div>
          <div className="box-email">
            <label>Nome</label>
            <input placeholder="Ex: João Silva" {...register("name")} />
            {errors.name?.message && (
              <p className="input-error">{errors.name?.message as string}</p>
            )}
          </div>
          <div className="box-email">
            <label>E-mail</label>
            <input placeholder="Ex: exemplo@email.com" {...register("email")} />
            {errors.email?.message && (
              <p className="input-error">{errors.email?.message as string}</p>
            )}
          </div>
          <div className="box-email">
            <label>Senha</label>
            <input
              placeholder="Ex: exemplo"
              type="password"
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="input-error">
                {errors.password?.message as string}
              </p>
            )}
          </div>
          <div className="box-email">
            <label>Confirmação de senha</label>
            <input
              placeholder="Ex: exemplo"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <p className="input-error">
                {errors.confirmPassword?.message as string}
              </p>
            )}
          </div>
          <Button name={"Cadastrar"} type="submit" />
          <p>
            Já possui conta?{" "}
            <span onClick={() => navigate("/login")}>Entrar</span>
          </p>
        </form>
        <div className="container-image">
          <img src={RegisterImage} alt="LoginImage" />
        </div>
      </div>
      <Footer />
    </>
  );
}
