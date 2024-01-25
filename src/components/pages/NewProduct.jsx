import styles from './NewProjects.module.css';
import ProductForm from '../product/ProductForm';


function NewProduct() {
  return (
    <div className={styles.newproject_container}>
      <h1>Criar Produto</h1>
      <p>Crie seu produto para depois adicionar suas especifições</p>
      <ProductForm handleSubmit="" btnText="Criar Projeto" />
    </div>
  );
}

export default NewProduct;
