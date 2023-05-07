import styles from '../../css/Storage/StorageBody.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import ItemTable from './ItemTable';

function StorageBody(props) {
  const email = props.email;
  const [enteredCode, setEnteredCode] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredQuantity, setEnteredQuantity] = useState('');
  const [addItemResponse, setAddItemResponse] = useState('');
  const [items, setItems] = useState([]);

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
  const logOut = () => {
    localStorage.clear();
  };
  const handleRemove = async (item) => {
    try {
      item['email'] = email;
      await axios.post('http://localhost:8080/storage/removeItem', item);
      const updatedListItems = items.filter((listItem) => listItem.code !== item.code);
      setItems(updatedListItems);
    } catch (err) {
      console.log(err);
    }
  };
  const addItemUpdate = (newItem) => {
    const existingItemIndex = items.findIndex(
      (listItem) => listItem.code === newItem.code && listItem.name === newItem.name
    );

    if (existingItemIndex >= 0) {
      const existingItem = items[existingItemIndex];
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + Number(newItem.quantity) };
      const updatedListItems = [...items];
      updatedListItems[existingItemIndex] = updatedItem;
      setItems(updatedListItems);
      return;
    }

    const existingWrongItemIndex = items.some((listItem) => listItem.code === newItem.code);

    if (!existingWrongItemIndex) {
      setItems([...items, newItem]);
      return;
    }
  };
  const addItemHandler = async (event) => {
    event.preventDefault();

    const postData = {
      code: enteredCode,
      name: enteredName,
      email: email,
      quantity: Number(enteredQuantity),
    };
    if (!postData.code || !postData.name || !postData.quantity) {
      setAddItemResponse('Missing values');
      return;
    }
    try {
      await axios
        .post('http://localhost:8080/storage/addItem', postData)
        .then((response) => {
          setAddItemResponse(response.data.message);
        })
        .catch((error) => {
          const erorrResponse = error.response.data.message;
          setAddItemResponse(erorrResponse);
        });
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
      <div className={styles.mainContainer}>
        <div className={styles.listContainer}>
          <b style={{ marginTop: '2%' }}>Your items in the Storage</b>

          <ItemTable items={items} RemoveButton={true} onRemove={() => handleRemove()} />
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
            <p>{addItemResponse}</p>
          </form>
          <Link to='/storage/inventarization' className={styles.startInventarizationButton}>
            Start Inventarization
          </Link>
          <Link to='/login' className={styles.logOutButton} onClick={logOut}>
            Log out
          </Link>
        </div>
      </div>
    </>
  );
}

export default StorageBody;
