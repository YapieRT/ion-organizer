import styles from '../../../css/Storage/InvBody.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ComparisonResult from './ComparisonResult';
import axios from 'axios';
import ItemTable from '../ItemTable';

function InventarizationBody(props) {
  const [itemAddResponse, setItemAddResponse] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredQuantity, setEnteredQuantity] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [items, setItems] = useState([]);
  const [comparisonItems, setComparisonItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/storage/getItems', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getItems();
  }, []);

  const handleRemove = async (item) => {
    try {
      const updatedListItems = comparisonItems.filter((listItem) => listItem.code !== item.code);
      setComparisonItems(updatedListItems);
    } catch (err) {
      console.log(err);
    }
  };
  const addItemUpdate = (newItem) => {
    const existingItemIndex = comparisonItems.findIndex(
      (listItem) => listItem.code === newItem.code && listItem.name === newItem.name
    );

    if (existingItemIndex >= 0) {
      const existingItem = comparisonItems[existingItemIndex];
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + Number(newItem.quantity) };
      const updatedListItems = [...comparisonItems];
      updatedListItems[existingItemIndex] = updatedItem;
      setComparisonItems(updatedListItems);
      setItemAddResponse('Item Added');
      return;
    }

    const existingWrongItemIndex = comparisonItems.some((listItem) => listItem.code === newItem.code);

    if (!existingWrongItemIndex) {
      setComparisonItems([...comparisonItems, newItem]);
      setItemAddResponse('Item Added');
      return;
    }
    setItemAddResponse('Wrong data');
    return;
  };
  const addItemHandler = async (event) => {
    event.preventDefault();

    const postData = {
      code: enteredCode,
      name: enteredName,
      quantity: Number(enteredQuantity),
    };
    if (!postData.code || !postData.name || !postData.quantity) {
      setItemAddResponse('Missing values');
      return;
    }

    try {
      await addItemUpdate(postData);
    } catch (err) {}
  };

  function codeChangeHandler(event) {
    setEnteredCode(event.target.value);
  }

  function nameChangeHandler(event) {
    setEnteredName(event.target.value);
  }

  function quantityChangeHandler(event) {
    setEnteredQuantity(event.target.value);
  }

  return (
    <>
      <div>
        <div className={styles.mainContainer}>
          <div className={styles.listContainerSmall}>
            <b style={{ marginTop: '1rem' }}>Items in your storage</b>
            <ItemTable items={items} RemoveButton={false} />
          </div>

          <div className={styles.listContainerLarge}>
            <b style={{ marginTop: '1rem' }}>Items for Comparison</b>

            <ItemTable items={comparisonItems} RemoveButton={true} onRemove={(item) => handleRemove(item)} />
          </div>

          <div className={styles.formContainer}>
            {' '}
            <form onSubmit={addItemHandler}>
              <h4>Add item to your Storage:</h4>
              <div className={styles.formElement}>
                <label>Code:</label>
                <input className={styles.labelInputText} id='code' type='text' onChange={codeChangeHandler}></input>
              </div>
              <div className={styles.formElement}>
                <label>Name:</label>
                <input className={styles.labelInputText} id='name' type='text' onChange={nameChangeHandler}></input>
              </div>
              <div className={styles.formElement}>
                <label>Quantity:</label>
                <input
                  className={styles.labelInputText}
                  id='quantity'
                  type='number'
                  onChange={quantityChangeHandler}
                ></input>
              </div>
              <button type='submit' className={styles.buttonAddItem}>
                Add Item
              </button>
              <p>{itemAddResponse}</p>
            </form>
          </div>
        </div>
        <ComparisonResult
          items={items}
          comparisonItems={comparisonItems}
          isOpen={modalOpen}
          onClose={handleModalClose}
        ></ComparisonResult>
        <button className={styles.modalButton} onClick={handleModalOpen}>
          Compare
        </button>
        <Link to='/storage' className={styles.backToButton}>
          Back to Storage
        </Link>
      </div>
    </>
  );
}

export default InventarizationBody;
