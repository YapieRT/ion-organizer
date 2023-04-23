import { Outlet } from 'react-router-dom';
import AdditionalHeader from '../components/AdditionalHeader';

function BaseLayout() {
  return (
    <>
      <AdditionalHeader linkTo="/" />
      <Outlet />
    </>
  );
}

export default BaseLayout;
