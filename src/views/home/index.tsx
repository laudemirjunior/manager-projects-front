import { useNavigate } from "react-router-dom";
import Social from "../../assets/undraw_social_friends_re_7uaa.svg";
import Bar from "../../components/bar";
import Button from "../../components/button";
import Footer from "../../components/footer";
import "./styles.scss";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Bar />
      <div className="container">
        <h1>Gerenciador de Projetos e Tarefas</h1>
        <p className="description">
          Utilize está aplicação para gerenciamento de projetos, permitindo que
          se possa organizar as atividades que serão executadas e as que já
          foram concluídas nos projetos em andamento.
        </p>
        <div>
          <img src={Social} alt="hello" />
        </div>
        <div>
          <Button name="Login" onClick={() => navigate("/login")} />
          <Button name="Register" onClick={() => navigate("/register")} />
        </div>
      </div>
      <Footer />
    </>
  );
}
