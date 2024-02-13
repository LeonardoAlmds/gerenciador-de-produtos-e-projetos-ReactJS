import styles from '../project/ProjectCard.module.css';
import { BsFillTrashFill } from 'react-icons/bs';

function RequirementCard({ id, name, cost, decription, handleRemove }) {
  function remove() {
    handleRemove(id)
  }

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Custo do Serviço: </span>
        R$ {cost}
      </p>
      <p>{decription}</p>
      <div className={styles.project_card_actions}>
        <button className={styles.remove_service} onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

export default RequirementCard;
