import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import LoginImage from "../../assets/undraw_login_re_4vu2.svg";
import Bar from "../../components/bar";
import Button from "../../components/button";
import Footer from "../../components/footer";
import { UseUser } from "../../context/user";
import "./styles.scss";

interface PropsUser {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = UseUser();

  const Schema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup
      .string()
      .required("A senha obrigatória")
      .min(6, "A senha deve conter no mínimo de 6 dígitos"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  function onSubmitFunction(data: PropsUser) {
    login(data);
  }

  return (
    <>
      <Bar />
      <div className="container-login">
        <div className="container-image">
          <img src={LoginImage} alt="LoginImage" />
        </div>
        <form onSubmit={handleSubmit(onSubmitFunction as () => void)}>
          <div>
            <h1>Entrar</h1>
          </div>
          <div className="box-email">
            <label>E-mail</label>
            <input placeholder="Ex: exemplo@email.com" {...register("email")} />
            {errors?.email && (
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
            <p className="input-error">{errors.password?.message as string}</p>
          </div>
          <Button name={"Entrar"} type="submit" />
          <p>
            Já possui conta?{" "}
            <span onClick={() => navigate("/register")}>Cadastre-se</span>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}
