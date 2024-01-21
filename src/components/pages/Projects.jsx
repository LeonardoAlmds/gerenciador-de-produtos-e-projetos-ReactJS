import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./Projects.module.css";

import Message from "../layout/Message";
import LinkButton from "../layout/LinkButton";
import Container from "../layout/Container";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoader, setRemoveLoader] = useState(false);
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headears: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoader(true);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => resp.json())
      .then((data) => {
        setProjects(projects.filter((project) => project.id !== id))
        setProjectMessage('Projeto removido com sucesso!!')
      })
      .catch(err => console.log(err));
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="remove" msg={projectMessage} />}

      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}{" "}
        {!removeLoader && <Loading />}
        {removeLoader && projects.length === 0 && (
          <p>Ainda não há projetos cadastrados...</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
