import styles from '../project/ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select';
import { useState, useEffect } from 'react';

function ProductForm() {
  const [productsCategories, setProductsCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products_categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProductsCategories(data)
        console.log()
      })
      .catch((err) => console.log(err));
  }, []);


  function submit() {
    
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input 
        type='text'
        text='Nome do produto'
        name='name'
        placeholder='Insira o nome do produto'
      />

      <Input 
        type='number'
        text='Valor unitário do produto'
        name='cost'
        placeholder='Insira o valor do produto'
      />

      <Select
        name="category_id"
        text="Selecione a categoria"
        options={productsCategories}
      />



    </form>
  )
}

export default ProductForm