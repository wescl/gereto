import styles from './ServiceCard.module.scss'
import React from 'react';
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';

function ServiceCard({ id, name, cost, description, handleRemove }) {

    function remove() {
        handleRemove(id);
    }

    return (
        <div className={styles.block_container}>
            <div className={styles.block}>
                <h2>{name}</h2>
                <div className={`${styles.budget} ${styles.category}`}>
                    <strong>Custo: </strong> R$ {cost}
                </div>
                <div className={styles.description}>
                    <strong>Descrição: </strong>{description}
                </div>
                <div className={styles.action}>
                    <button className={`delete ${styles.delete}`} onClick={remove}>
                        <BsFillTrashFill />
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ServiceCard;