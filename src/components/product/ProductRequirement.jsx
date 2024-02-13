import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from '../pages/projects/Project.module.css';
import RequirementForm from '../requirement/RequirementForm';
import Message from '../layout/Message';

function ProductRequirement({ productData }) {
  const [showForm, setShowForm] = useState(false);
  const [product] = useState(productData);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  function toggleForm() {
    setShowForm(!showForm);
  }

  function createRequirement(product) {
    setMessage('');
    const lastRequirement =
      product.requirements[product.requirements.length - 1];

    lastRequirement.id = uuidv4();

    const lastRequirementCost = lastRequirement.cost;
    const newCost = parseFloat(product.cost) + parseFloat(lastRequirementCost);

    // maximun value validation
    if (newCost > parseFloat(product.budget)) {
      setMessage(
        `Valor de custo é maior que R$ ${parseFloat(product.budget) - parseFloat(product.cost)}`,
      );
      setType('error');
      product.requirements.pop();
      return false;
    }
    // add service cost to product total cost
    product.cost = newCost;

    fetch(`http://localhost:5000/products/${productData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setShowForm(false);
        setMessage('Requisito adicionado com sucesso');
        setType('success');
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {message && <Message msg={message} type={type} />}
      <div className={styles.service_form_container}>
        <h2>Adicionar Requisitos</h2>
        <button className={styles.btn} onClick={toggleForm}>
          {showForm ? 'Fechar' : 'Adicionar requisito do produto'}
        </button>
        <div className={styles.project_info}>
          {showForm ? (
            <RequirementForm
              btnText="Salvar novo requisito"
              productData={product}
              handleSubmit={createRequirement}
            />
          ) : (
            'Adicione um novo requisito...'
          )}
        </div>
      </div>
    </>
  );
}

export default ProductRequirement;
