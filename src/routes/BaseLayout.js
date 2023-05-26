import { Outlet } from 'react-router-dom';
import Header from '../components/Headers/Header';

function BaseLayout(props) {
  return (
    <>
      <Header linkTo={props.linkTo} />
      <Outlet />
    </>
  );
}

export default BaseLayout;
