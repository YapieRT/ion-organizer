import styles from '../../css/Headers/Header.module.scss';
import arrow from '../../img/right-arrow.png';
import { Link } from 'react-router-dom';

function Header(props) {
  const navs = props.navs ? (
    <>
      {' '}
      <nav>
        <ul>
          <li>
            <a href={props.idAbout}>About</a>
          </li>
          <li>
            <a href={props.idBenefits}>Benefits</a>
          </li>
          <li>
            <a href={props.idOurPartners}>Our Partners</a>
          </li>
        </ul>
      </nav>
      <Link to='/registration'>
        <button type='button' className={styles.getIN}>
          {' '}
          <div className={styles.text}>Get in</div>
          <img className={styles.arrow} src={arrow} alt='Get in' />
        </button>
      </Link>
    </>
  ) : (
    <> </>
  );
  return (
    <div className={styles.Header}>
      <div className={styles.ION}>
        <Link to={props.linkTo} style={{}}>
          <b>ION</b>
        </Link>
      </div>
      {navs}
    </div>
  );
}

export default Header;
