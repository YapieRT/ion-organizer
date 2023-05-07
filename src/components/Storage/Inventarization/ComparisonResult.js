import React from 'react';
import styles from '../../../css/Storage/ComparisonResult.module.scss';

import ItemTable from '../ItemTable';

const ComparisonResult = ({ items, comparisonItems, isOpen, onClose }) => {
  if (!isOpen) return null;
  let missingItems = [];
  let newItems = [];

  for (let i = 0; i < items.length; i++) {
    let found = false;

    for (let j = 0; j < comparisonItems.length; j++) {
      if (items[i].code === comparisonItems[j].code && items[i].name === comparisonItems[j].name) {
        found = true;

        if (items[i].quantity !== comparisonItems[j].quantity) {
          missingItems.push({
            code: items[i].code,
            name: items[i].name,
            quantity: comparisonItems[j].quantity - items[i].quantity,
          });
        }

        break;
      }
    }

    if (!found) {
      missingItems.push({
        code: items[i].code,
        name: items[i].name,
        quantity: Number(-items[i].quantity),
      });
    }
  }

  for (let i = 0; i < comparisonItems.length; i++) {
    let found = false;

    for (let j = 0; j < items.length; j++) {
      if (comparisonItems[i].code === items[j].code && comparisonItems[i].name === items[j].name) {
        found = true;
        break;
      }
    }

    if (!found) {
      newItems.push({
        code: comparisonItems[i].code,
        name: comparisonItems[i].name,
        quantity: comparisonItems[i].quantity,
      });
    }
  }
  let itemsSurplus = missingItems.filter((listItem) => listItem.quantity > 0);
  missingItems = missingItems.filter((listItem) => listItem.quantity < 0);
  if (itemsSurplus) newItems.push(...itemsSurplus);

  return (
    <>
      <div className={styles.modal}>
        <h2>Results</h2>
        <div className={styles.containers}>
          <div className={styles.listContainer}>
            <b style={{ marginTop: '1rem' }}>Missing Items</b>
            <ItemTable items={missingItems} RemoveButton={false} />
          </div>

          <div className={styles.listContainer}>
            <b style={{ marginTop: '1rem' }}>New Items</b>
            <ItemTable items={newItems} RemoveButton={false} />
          </div>
        </div>
        <button className={styles.modalClose} onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};

export default ComparisonResult;
