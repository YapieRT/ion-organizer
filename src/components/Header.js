import styles from '../css/Header.module.scss';
import arrow from '../img/right-arrow.png';
import { Link } from 'react-router-dom';

const line = 1 ? <hr /> : '';

function Header(props) {
  return (
    <div className={styles.Header}>
      <div className={styles.ION}>
        <Link to="/" style={{}}>
          <b>ION</b>
        </Link>
      </div>
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
      <Link to="/registration">
        <button type="button" className={styles.getIN}>
          {' '}
          <div className={styles.text}>Get in</div>
          <img className={styles.arrow} src={arrow} alt="Get in" />
        </button>
      </Link>
      {line}
    </div>
  );
}

export default Header;
