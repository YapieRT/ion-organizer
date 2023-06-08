import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../css/Storage/Storage.module.scss';
import ItemTable from './ItemTable';

function Storage() {
  document.title = 'ION - Storage';

  const ip = process.env.REACT_APP_BACKEND_IP ? process.env.REACT_APP_BACKEND_IP : process.env.REACT_APP_DEFAULT_IP;

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');

  const [itemInfo, setItemInfo] = useState({
    code: '',
    name: '',
    quantity: '',
  });

  const itemHandler = (event) => {
    setItemInfo((prevItemInfo) => ({
      ...prevItemInfo,
      [event.target.name]: event.target.value,
    }));
  };

  const [itemAddResponse, setItemAddResponse] = useState('');

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${ip}/api/storage/getItems`, {
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
        const response = await axios.get(`${ip}/api/UserAuth`, {
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
      await axios.delete(`${ip}/api/storage/removeItem`, item);
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
      code: itemInfo.code,
      name: itemInfo.name.trim(),
      email: userEmail,
      quantity: Number(itemInfo.quantity),
    };
    if (!postData.code || !postData.name || !postData.quantity) {
      setItemAddResponse('Missing values');
      return;
    }
    try {
      await axios
        .post(`${ip}/api/storage/addItem`, postData)
        .then((response) => {
          setItemAddResponse(response.data.message);
        })
        .catch((error) => {
          const erorrResponse = error.response.data.message;
          setItemAddResponse(erorrResponse);
        });
      await addItemUpdate(postData);
    } catch (err) {}
  };

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
              <input className={styles.labelInputText} id='code' name='code' type='text' onChange={itemHandler}></input>
            </div>
            <div className={styles.formElement}>
              <label>Name:</label>
              <input className={styles.labelInputText} id='name' name='name' type='text' onChange={itemHandler}></input>
            </div>
            <div className={styles.formElement}>
              <label>Quantity:</label>
              <input
                className={styles.labelInputText}
                id='quantity'
                name='quantity'
                type='number'
                onChange={itemHandler}
              ></input>
            </div>
            <button type='submit' className={styles.buttonAddItem}>
              Add Item
            </button>
            <p>{itemAddResponse}</p>
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
