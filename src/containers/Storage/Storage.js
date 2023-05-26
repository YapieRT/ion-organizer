import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../css/Storage/Storage.module.scss';
import ItemTable from './ItemTable';

function Storage() {
  document.title = 'ION - Storage';
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
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
    const verify = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/UserAuth', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserEmail(response.data.email);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/login', {});
        }
      }
    };
    verify();
    getItems();
  });
  const logOut = () => {
    localStorage.clear();
  };
  const handleRemove = async (item) => {
    try {
      console.log(item);
      item['email'] = userEmail;
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
      name: enteredName.trim(),
      email: userEmail,
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

          <ItemTable items={items} RemoveButton={true} onRemove={(item) => handleRemove(item)} />
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

export default Storage;
