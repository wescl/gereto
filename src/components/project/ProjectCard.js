import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.scss';
import { MdEdit } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';
import { TbCategoryFilled } from "react-icons/tb";

function truncateText(text, maxLength) {
    return text && text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

function ProjectCard(props) {
    const { id, name, budget, category, description, handleRemove, handleEdit } = props;  
    const truncatedName = truncateText(name, 13);
    const truncatedBudget = truncateText(`R$${budget}`, 18);
    const truncatedDescription = truncateText(description, 48);

    return (
        <div className={styles.block_container}>

            <div className={styles.block}>
                <h2>{truncatedName}</h2>
                <div className={styles.budget}>
                    <span>{truncatedBudget}</span>
                </div>
                <div className={styles.category}>
                    <span>
                        <TbCategoryFilled /> {category}
                    </span>
                </div>
                <div className={styles.description}>
                    <span>
                        <strong>Descrição: </strong>{truncatedDescription}
                    </span>
                </div>

                <div className={styles.action}>
                    <Link to={`/project/${id}`}>
                        <button className={` ${styles.edit}`} >
                            <MdEdit />Editar
                        </button>
                    </Link>
                    <button className={` ${styles.delete}`} onClick={() => handleRemove(id)}>
                        <BsFillTrashFill />
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
