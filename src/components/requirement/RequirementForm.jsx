import { useState } from 'react';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
function RequirementForm({ handleSubmit, btnText, productData }) {
  const [requirement, setRequirement] = useState({});

  function submit(e) {
    e.preventDefault();
    productData.requirements.push(requirement);
    handleSubmit(productData);
  }

  function handleChange(e) {
    setRequirement({ ...requirement, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={submit}>
      <Input
        type="text"
        text="Nome do requisito"
        name="name"
        placeholder="Insira o nome do requisito"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Custo do requisito"
        name="cost"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do requisito"
        name="description"
        placeholder="Insira a descrição do requisito"
        handleOnChange={handleChange}
      />

      <SubmitButton text={btnText} />
    </form>
  );
}

export default RequirementForm;
