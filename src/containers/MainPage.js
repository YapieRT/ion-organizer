import '../css/MainPage.module.scss';
import Header from '../components/Headers/Header';

function MainPage() {
  return (
    <>
      <Header linkTo='/' navs={true} />
      <h3>Welcome to ION</h3>
    </>
  );
}

export default MainPage;
