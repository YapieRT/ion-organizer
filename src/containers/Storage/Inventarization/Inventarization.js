import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../css/Storage/Inventarization.module.scss';
import ComparisonResult from './ComparisonResult';
import ItemTable from '../ItemTable';

function Inventarization() {
  const navigate = useNavigate();

  const [itemAddResponse, setItemAddResponse] = useState('');

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
    const verify = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.get('http://localhost:8080/api/UserAuth', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/login', {});
        }
      }
    };
    const getItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/storage/getItems', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    verify();
    getItems();
  });

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
      code: itemInfo.code,
      name: itemInfo.name.trim(),
      quantity: Number(itemInfo.quantity),
    };
    if (!postData.code || !postData.name || !postData.quantity) {
      setItemAddResponse('Missing values');
      return;
    }

    try {
      await addItemUpdate(postData);
    } catch (err) {}
  };

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
                <input
                  className={styles.labelInputText}
                  id='code'
                  name='code'
                  type='text'
                  onChange={itemHandler}
                ></input>
              </div>
              <div className={styles.formElement}>
                <label>Name:</label>
                <input
                  className={styles.labelInputText}
                  id='name'
                  name='name'
                  type='text'
                  onChange={itemHandler}
                ></input>
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

export default Inventarization;
