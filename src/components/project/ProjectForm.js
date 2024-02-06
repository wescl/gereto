import React, { useEffect, useState } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import Submit from "../form/Submit";
import Message from "../layout/Message";
import axios from 'axios';
import Loading from "../layout/Loading";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    ...projectData,
    budget: projectData?.budget || 0,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    budget: "",
  });

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "O nome do projeto é obrigatório.",
      }));

      delay(3100).then(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "",
        }));
      });

      setLoading(false);
      return;
    }

    if (formData.name.length > 50) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "O nome do projeto deve ter no máximo 50 caracteres.",
      }));

      delay(3100).then(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "",
        }));
      });

      setLoading(false);
      return;
    }

    if (isNaN(parseFloat(formData.budget)) || parseFloat(formData.budget) <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        budget: "O orçamento deve ser maior que zero.",
      }));

      delay(3100).then(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          budget: "",
        }));
      });

      setLoading(false);
      return;
    }

    if (!formData.category) {
      formData.category = "Desenvolvimento";
    }

    if (!formData.description || !formData.description.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "A descrição do projeto é obrigatória.",
      }));

      delay(3100).then(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          description: "",
        }));
      });

      setLoading(false);
      return;
    }

    if (formData.description.length > 1000) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "A descrição do projeto deve ter no máximo 1000 caracteres.",
      }));

      delay(3100).then(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          description: "",
        }));
      });

      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://api-gereto.onrender.com/api/inserir-dados', {
        projectName: formData.name,
        projectCategory: formData.category,
        projectDescription: formData.description,
        projectBudget: formData.budget,
        projectServices: [],
        projectCost: 0,
      });

      console.table(formData)

      if (handleSubmit) {
        handleSubmit(formData);
      }
      setLoading(false);
    } catch (error) {
      console.error('Erro ao fazer solicitação:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }

  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }))
  }

  const handleBudgetChange = (e) => {
    let budgetValue = e.target.value.replace("R$", "").replace(/\D/g, "");
    setFormData({
      ...formData,
      budget: budgetValue,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      budget: "",
    }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {errors.name && <Message customClass="error" message={errors.name} />}
      {errors.budget && <Message customClass="error" message={errors.budget} />}
      {errors.description && <Message customClass="error" message={errors.description} />}
      {errors.category && <Message customClass="error" message={errors.category} />}
      <Input
        label="Nome do Projeto"
        type="text"
        text="name"
        name="name"
        handleOnChange={handleChange}
        value={formData.name || ""}
      />

      <Input
        label="Orçamento"
        type="text"
        text="budget"
        name="budget"
        placeholder="R$"
        handleOnChange={handleBudgetChange}
        value={`R$ ${formData.budget || ""}`}
      />

      <Select
        options={categories}
        onSelect={(selectedOption) =>
          handleChange({
            target: { name: "category", value: selectedOption.name },
          })
        }
        name="category"
        value={formData.category || "teste"}
        text={"Selecione uma categoria"}
      />

      <Input
        label="Descrição"
        isTextarea={true}
        name="description"
        handleOnChange={handleChange}
        value={formData.description || ""}
      />

      {loading ? (
        <Submit customClass="medio" text={<Loading largura="medio" />} />
      ) : (
        <Submit customClass="medio" text="enviar" />
      )}

    </form>
  );
}

export default ProjectForm;
