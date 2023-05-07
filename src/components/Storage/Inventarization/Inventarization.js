import InventarizationBody from './InventarizationBody';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import AdditionalHeader from '../../Headers/AdditionalHeader';

function Inventarization() {
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.get('http://localhost:8080/UserAuth', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/login', {});
        }
      }
    };
    verify();
  }, []);
  return (
    <>
      <AdditionalHeader linkTo='/storage' />
      <InventarizationBody />
    </>
  );
}

export default Inventarization;
