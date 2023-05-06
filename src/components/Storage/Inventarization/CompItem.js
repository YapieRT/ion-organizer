import React from 'react';
import styles from '../../../css/Storage/ComparisonResult.module.scss';

function Item({ item, onRemove, button }) {
  const handleRemove = () => {
    onRemove(item);
  };
  const buttonRemove = button ? (
    <button onClick={handleRemove} className={`${styles.cell} ${styles.actions}`}>
      Remove
    </button>
  ) : (
    ''
  );
  if (!Object.is(item, null))
    return (
      <div className={styles.cellRow}>
        <div className={`${styles.cell} ${styles.code}`} title={item.code}>
          {item.code}
        </div>
        <div className={`${styles.cell} ${styles.name}`} title={item.name}>
          {item.name}
        </div>
        <div className={`${styles.cell} ${styles.quantity}`} title={`${item.code} + pc.`}>
          {item.quantity} pc.
        </div>
        {buttonRemove}
      </div>
    );
  else return;
}

export default Item;
