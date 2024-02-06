import React, { useState } from 'react';
import Input from "../form/Input";
import Submit from "../form/Submit";

const ServiceForm = ({ handleSubmit, btnText = 'Adicionar' }) => {
  const [serviceData, setServiceData] = useState({
    name: '',
    cost: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();


    const success = await handleSubmit(serviceData);

    if (success) {
      setServiceData({
        name: '',
        cost: '',
        description: '',
      });
    }
  };

  return (
    <form onSubmit={submitForm}>

      <Input
        label="Tipo de serviço"
        type="text"
        text="name"
        name="name"
        handleOnChange={handleChange}
        value={serviceData.name || ""}
      />

      <Input
        label="Custo"
        type="number"
        text="cost"
        name="cost"
        handleOnChange={handleChange}
        value={serviceData.cost || ""}
      />

      <Input
        label="Descrição"
        isTextarea={true}
        name="description"
        handleOnChange={handleChange}
        value={serviceData.description || ""}
      />

      <Submit customClass="medio" text={btnText} />
    </form>
  );
};

export default ServiceForm;
