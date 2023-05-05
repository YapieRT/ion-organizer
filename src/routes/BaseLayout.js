import { Outlet } from 'react-router-dom';
import AdditionalHeader from '../components/Headers/AdditionalHeader';

function BaseLayout() {
  return (
    <>
      <AdditionalHeader linkTo='/' />
      <Outlet />
    </>
  );
}

export default BaseLayout;
