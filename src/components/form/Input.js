import React from 'react';
import styles from './Input.module.scss';

function Input({ isTextarea, label, name, placeholder, handleOnChange, value }) {
    
    return (
        <div className={styles.input_group}>
            <label>{label}</label>
            {isTextarea ? (
                <textarea name={name} placeholder={placeholder} onChange={handleOnChange} value={value} />
            ) : (
                <input type="text" name={name} placeholder={placeholder} onChange={handleOnChange} value={value} />
            )}
        </div>
    );
}

export default Input;
