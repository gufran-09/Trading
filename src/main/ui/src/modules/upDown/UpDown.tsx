import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './UpDown.module.css';
import UpDownData from '../../types/UpDownData';
import InitialState from '../../types/InitialState';

interface UpDownProps {
  item: UpDownData;
}

const UpDown = (props: UpDownProps): JSX.Element => {
  const { item } = props;
  const { key, data, timestamp } = item;
  const { status } = data;

  const removeUpDownHandler = useSelector(
    (state: InitialState) => state.upDown.removeUpDownHandler
  );

  const isUp = status === 'UP';

  return (
    <div className={styles.uptimeCard}>
      <div className={`${styles.statusDot} ${isUp ? styles.glowGreen : styles.glowRed}`}></div>
      <div className={styles.infoColumn}>
        <span className={styles.serviceName}>{key}</span>
        <span className={styles.pingTime}>{timestamp}</span>
      </div>
      <div className={`${styles.statusPill} ${isUp ? styles.pillUp : styles.pillDown}`}>
        {status}
      </div>
      <button
        type="button"
        className={styles.removeBtn}
        name="remove_updown"
        onClick={removeUpDownHandler}
        data-key={key}
        title="Remove URL"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

UpDown.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    data: PropTypes.shape({
      status: PropTypes.string,
    }),
    timestamp: PropTypes.string,
  }).isRequired,
};

export default UpDown;
