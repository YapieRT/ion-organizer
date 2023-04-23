import styles from '../css/AdditionalHeader.module.scss';
import { Link } from 'react-router-dom';

const line = 1 ? <hr /> : '';

function AdditionalHeader(props) {
  return (
    <div className={styles.Header}>
      <div className={styles.ION}>
        <Link to={props.linkTo} style={{ textDecoration: 'none', color: 'black' }}>
          <b>ION</b>
        </Link>
      </div>
      {line}
    </div>
  );
}

export default AdditionalHeader;
