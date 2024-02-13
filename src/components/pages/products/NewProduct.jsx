import styles from '../projects/NewProjects.module.css';
import ProductForm from '../../product/ProductForm';
import { useNavigate } from 'react-router-dom';

function NewProduct() {
  const navigate = useNavigate();

  function createPost(product) {
    product.requirements = []
    product.cost = 0
    product.amount = 0

    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((resp) => resp.json())
      .then((data) => {
        navigate('/products', {
          state: { message: 'Produto criado com sucesso!' }
        })
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Produto</h1>
      <p>Crie seu produto para depois adicionar suas especifições</p>
      <ProductForm handleSubmit={createPost} btnText="Criar Produto" amount={false} />
    </div>
  );
}

export default NewProduct;
