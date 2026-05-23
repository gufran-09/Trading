import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import UpDownData from '../../types/UpDownData';
import StockData from '../../types/StockData';
import WeatherData from '../../types/WeatherData';
import WeatherLocation from '../weather/WeatherLocation';
import Stock from '../stock/Stock';
import UpDown from '../upDown/UpDown';
import InitialState from '../../types/InitialState';

import styles from './ServiceList.module.css';

interface ServiceListProps {
  serviceName: string;
}

const ServiceList = (props: ServiceListProps): JSX.Element => {
  const { serviceName } = props;
  const stockList = useSelector((state: InitialState) => state.stock.stockList);
  const upDownList = useSelector((state: InitialState) => state.upDown.upDownList);
  const weatherList = useSelector((state: InitialState) => state.weather.weatherList);

  if (serviceName === 'stocks') {
    return (
      <div className={styles.tableContainer}>
        <table className={styles.stockTable}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Change</th>
              <th>Volume</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {stockList?.map((item) => (
              <Stock key={item.key} item={item as StockData} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (serviceName === 'weather') {
    return (
      <div className={styles.weatherGrid}>
        {weatherList?.map((item) => (
          <WeatherLocation key={item.key} item={item as WeatherData} />
        ))}
      </div>
    );
  }

  if (serviceName === 'updown') {
    return (
      <div className={styles.gridContainer}>
        {upDownList?.map((item) => (
          <UpDown key={item.key} item={item as UpDownData} />
        ))}
      </div>
    );
  }

  return <></>;
};

ServiceList.propTypes = {
  serviceName: PropTypes.string.isRequired,
};

export default ServiceList;
