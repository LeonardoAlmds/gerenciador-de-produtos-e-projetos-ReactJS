import styles from "./Home.module.css";
import LinkButton from "../layout/LinkButton";
import home from "../../img/home.svg";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao <span>YouX</span>
      </h1>
      <p>Comece a garantir os seus projetos agora mesmo</p>
      <div className={styles.btn_adjustment}>
        <LinkButton to="/newproject" text="Criar Projeto" />
        <LinkButton to="/projects" text="Meus Projetos" />
      </div>
      <img src={home} alt="YouX" />
    </section>
  );
}

export default Home;
