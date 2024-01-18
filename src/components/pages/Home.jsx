import styles from "./Home.module.css";
import LinkButton from "../layout/LinkButton";
import loading from "../../img/loading.svg";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao <span>YouX</span>
      </h1>
      <p>Comece a garantir os seus projetos agora mesmo</p>
      <LinkButton to="/newproject" text="Criar Projeto" />
      <img src={loading} alt="YouX" />
    </section>
  );
}

export default Home;
