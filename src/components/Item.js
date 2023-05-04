import React from 'react';
import styles from '../css/StorageBody.module.scss';

function Item({ code, name, quantity, onRemove }) {
  const handleRemove = () => {
    //onRemove(item);
  };
  return (
    <div className={styles.cellRow}>
      <div className={`${styles.cell} ${styles.code}`}>{code}</div>
      <div className={`${styles.cell} ${styles.name}`}>{name}</div>
      <div className={`${styles.cell} ${styles.quantity}`}>{quantity} pc.</div>
      <button className={`${styles.cell} ${styles.actions}`}>Remove</button>
    </div>
  );
}

export default Item;
