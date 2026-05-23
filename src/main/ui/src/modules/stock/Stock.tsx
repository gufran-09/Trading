import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Stock.module.css';
import StockData from '../../types/StockData';
import InitialState from '../../types/InitialState';

interface StockProps {
  item: StockData;
}

const Stock = (props: StockProps): JSX.Element => {
  const { item } = props;
  const { key, data } = item;
  const { price } = data;

  const removeStockHandler = useSelector(
    (state: InitialState) => state.stock.removeStockHandler
  );

  // Mock calculated fields since they aren't in standard response
  const numPrice = parseFloat(price || '0');
  const isUp = numPrice % 2 === 0; // arbitrary logic for demo
  const mockChange = `+ ${(numPrice * 0.05).toFixed(2)}`;
  
  // Create mock sparkline bars based on ticker string length
  const bars = [12, 16, 8, 20, 14, 24];

  return (
    <tr className={styles.row}>
      <td className={`${styles.cell} ${styles.symbol}`}>{key}</td>
      <td className={`${styles.cell} ${styles.price}`}>${price}</td>
      <td className={styles.cell}>
        <span className={`${styles.changePill} ${styles.changeUp}`}>
          {mockChange}
        </span>
      </td>
      <td className={`${styles.cell} ${styles.volume}`}>
        {(numPrice * 1234).toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </td>
      <td className={`${styles.cell} ${styles.trendCell}`}>
        <div className={styles.sparkline}>
          {bars.map((h, i) => (
            <div 
              key={i} 
              className={`${styles.bar} ${styles.barGreen}`} 
              style={{ height: `${h}px`, opacity: 0.4 + (i * 0.1) }} 
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.removeBtn}
          name="remove_stock"
          onClick={removeStockHandler}
          data-key={key}
          title="Remove"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  );
};

Stock.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    data: PropTypes.shape({
      price: PropTypes.string,
    }),
    timestamp: PropTypes.string,
  }).isRequired,
};

export default Stock;
