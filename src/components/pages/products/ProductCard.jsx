import styles from '../../project/ProjectCard.module.css';
import { Link } from 'react-router-dom';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

function ProductCard({ id, name, budget, category, handleRemove }) {
  function remove(e) {
    handleRemove(id);
  }

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Preço: </span>R${budget}
      </p>

      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span>
        {category}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/product/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
