import styles from '../../css/Storage/ItemTable.module.scss';

import Item from './Item';

function ItemTable({ items, RemoveButton, onRemove }) {
  const handleRemove = async (item) => {
    onRemove(item);
  };

  const DeleteColumn = RemoveButton ? (
    <div className={`${styles.cell} ${styles.actions}`} style={{ border: 'none' }}>
      Delete
    </div>
  ) : (
    ''
  );

  return (
    <div className={styles.table}>
      <div className={styles.cellRow} style={{ fontWeight: 'bold' }}>
        <div className={`${styles.cell} ${styles.code}`} style={{ border: 'none' }}>
          Code
        </div>
        <div className={`${styles.cell} ${styles.name}`} style={{ border: 'none' }}>
          Name
        </div>
        <div className={`${styles.cell} ${styles.quantity}`} style={{ border: 'none' }}>
          Quantity
        </div>
        {DeleteColumn}
      </div>
      <div style={{ height: '35rem', overflow: 'auto' }}>
        <div style={{ height: 'auto' }}>
          {items ? (
            items.map((item) => (
              <>
                <Item key={item.code} button={RemoveButton} item={item} onRemove={() => handleRemove(item)} />
              </>
            ))
          ) : (
            <p>Loading items...</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default ItemTable;
