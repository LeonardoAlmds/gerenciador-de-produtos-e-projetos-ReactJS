import { useLocation } from 'react-router-dom';
import Message from '../../layout/Message';
import styles from '../projects/Projects.module.css';
import LinkButton from '../../layout/LinkButton';
import Container from '../../layout/Container';
import ProductCard from './ProductCard';
import Loading from '../../layout/Loading';
import { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [messageProduct, setMessageProduct] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  let message = '';
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProducts(data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    },200);
  }, []);

  function removeProduct(id) {
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(products.filter((product) => product.id !== id));
        setMessageProduct('Produto removido com sucesso!!');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Produtos</h1>
        <LinkButton to="/newproduct" text="Criar Produto" />
      </div>
      {message && isLoading === false && <Message type="success" msg={message} />}
      {messageProduct && <Message type="success" msg={messageProduct} />}

      <Container customClass="start">
      {isLoading ? <Loading /> : null}
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              id={product.id}
              name={product.name}
              key={product.id}
              budget={product.budget}
              category={product.category.name}
              handleRemove={removeProduct}
            />
          ))}
        {products.length <= 0 && isLoading === false && <p>Ainda não há produtos cadastrados...</p>}
      </Container>
    </div>
  );
}

export default Products;
