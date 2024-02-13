import { useState, useEffect } from 'react';
import styles from '../projects/Project.module.css';

import Container from '../../layout/Container';
import Message from '../../layout/Message';
import ProductForm from '../../product/ProductForm';
import Loading from '../../layout/Loading';
import ProductRequirement from '../../product/ProductRequirement';
import RequirementCard from '../../requirement/RequirementCard';

function ProductEdit({ id }) {
  const [product, setProduct] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProduct(data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function editProduct(product) {
    // Reset Message
    setMessage('');
    setType('');
    if (product.budget < product.cost) {
      setMessage(
        `Impossivel diminuir orçamento para R$ ${product.budget} os gastos atuais são de R$ ${product.cost}`,
      );
      setType('error');
      return false;
    }

    fetch(`http://localhost:5000/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product, (product.cost = 100)),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data);
        setShowForm(false);
        //Message de alterado com sucesso
        setMessage('Produto atualizado com sucesso');
        setType('success');
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  function toggleForm() {
    setShowForm(!showForm);
  }

  function requirementRemove(id) {
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data);
        console.log('removi');
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {product.name ? (
        <Container>
          {message && <Message type={type} msg={message} />}
          <div className={styles.details_container}>
            <h1>Produto: {product.name}</h1>
            <button className={styles.btn} onClick={toggleForm}>
              {showForm ? 'Fechar' : 'Editar Produto'}
            </button>
            {!showForm ? (
              <div className={styles.project_info}>
                <p>
                  <span>Categoria: </span>
                  {product.category.name}
                </p>
                <p>
                  <span>Total de orçamento: </span>
                  R${product.budget}
                </p>
                <p>
                  <span>Quantidade: </span>
                  {product.amount > 0
                    ? `${product.amount} unidades`
                    : 'Ainda não há quantidade cadastrada...'}
                </p>
                <p>
                  <span>Valor gasto por unidade: </span>
                  R${product.cost}
                </p>
              </div>
            ) : (
              <div className={styles.project_info}>
                <ProductForm
                  handleSubmit={editProduct}
                  btnText="Concluir Edição"
                  productData={product}
                  amount={true}
                />
              </div>
            )}
          </div>
          <ProductRequirement productData={product} />
          <h2>Requisitos</h2>

          <Container customClass="start">
            {product.requirements.length > 0 &&
              product.requirements.map((requirement) => (
                <RequirementCard
                  id={requirement.id}
                  name={requirement.name}
                  cost={requirement.cost}
                  decription={requirement.description}
                  key={requirement.id}
                  handleRemove={requirementRemove}
                />
              ))}
            {product.requirements.length === 0 && (
              <p>Não há serviços cadastrados</p>
            )}
          </Container>
        </Container>
      ) : (
        <Container customClass="column">
          <div className={styles.project_details}>
            <p>Carregando...</p>
            {isLoading && <Loading />}
          </div>
        </Container>
      )}
    </>
  );
}

export default ProductEdit;
