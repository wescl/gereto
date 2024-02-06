import React, { useState, useEffect } from 'react';
import styles from './Select.module.scss';
import { AiFillCaretDown } from 'react-icons/ai';
import axios from 'axios';

const Select = ({ onSelect, text, handleOnChange, value }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api-gereto.onrender.com/api/listar-categorias');
        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao obter categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
    onSelect(category);
  };

  return (
    <div className={styles.custom_select}>
      <div
        onChange={handleOnChange}
        value={value || ''}
        className={`${styles.selected_option} ${isDropdownOpen ? styles.open : ''}`}
        onClick={() => setDropdownOpen(!isDropdownOpen)}>
        {selectedCategory ? selectedCategory.name : (text ? text : 'Selecione uma opção')}{' '}
        <AiFillCaretDown />
      </div>
      {isDropdownOpen && (
        <ul className={styles.options_list}>
          {categories.map((category) => (
            <li key={category._id} onClick={() => handleCategoryClick(category)}>
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
