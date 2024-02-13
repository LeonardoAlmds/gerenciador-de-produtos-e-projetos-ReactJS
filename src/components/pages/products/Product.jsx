import { useParams } from 'react-router-dom';
import styles from '../projects/Project.module.css';
import ProductEdit from './ProductEdit';

function Product() {
  const { id } = useParams();

  return (
    <>
      <div className={styles.project_details}>
        <ProductEdit id={id} />
      </div>
    </>
  );
}

export default Product;
