import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StorageBody from './StorageBody';
import axios from 'axios';
import AdditionalHeader from './AdditionalHeader';

function Storage() {
  document.title = 'ION - Storage';
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
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
  }, []);

  return (
    <>
      <AdditionalHeader linkTo='/storage' />
      <StorageBody email={userEmail} />
    </>
  );
}

export default Storage;
