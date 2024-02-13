import styles from '../project/ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import { useState, useEffect } from 'react';
import SubmitButton from '../form/SubmitButton';

function ProductForm({ handleSubmit, btnText, productData, amount }) {
  const [productCategories, setProductCategories] = useState([]);
  const [product, setproduct] = useState(productData || {});

  useEffect(() => {
    fetch('http://localhost:5000/product_categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProductCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(e) {
    setproduct({ ...product, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setproduct({
      ...product,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(product);
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do produto"
        name="name"
        placeholder="Insira o nome do produto"
        handleOnChange={handleChange}
        value={product.name ? product.name : ''}
      />

      <Input
        type="number"
        text="Valor unitário do produto"
        name="budget"
        placeholder="Insira o valor do produto"
        handleOnChange={handleChange}
        value={product.budget ? product.budget : ''}
      />

      <Select
        name="category_id"
        text="Selecione a categoria"
        options={productCategories}
        handleOnChange={handleCategory}
        value={product.category ? product.category.id : ''}
      />

      {amount && (
        <Input
          text="Quantidade"
          type="number"
          placeholder="Digite a quantidade"
          value={product.amount}
          name="amount"
          handleOnChange={handleChange}
        />
      )}

      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProductForm;
