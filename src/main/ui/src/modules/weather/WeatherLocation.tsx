import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './WeatherLocation.module.css';
import WeatherData from '../../types/WeatherData';
import InitialState from '../../types/InitialState';

interface WeatherProps {
  item: WeatherData;
}

const getWeatherEmoji = (condition?: string) => {
  const c = condition?.toLowerCase() || '';
  if (c.includes('rain')) return '🌧️';
  if (c.includes('cloud')) return '☁️';
  if (c.includes('snow')) return '❄️';
  if (c.includes('storm') || c.includes('thunder')) return '⛈️';
  if (c.includes('clear') || c.includes('sun')) return '☀️';
  return '⛅';
};

const WeatherLocation = (props: WeatherProps): JSX.Element => {
  const { item } = props;
  const { key, data, timestamp } = item;
  const {
    temperature,
    feelsLikeTemperature,
    conditions,
    city,
    stateOrCountry,
  } = data;

  const removeWeatherHandler = useSelector(
    (state: InitialState) => state.weather.removeWeatherHandler
  );

  return (
    <div className={styles.weatherCard}>
      <div className={styles.cardHeader}>
        <span className={styles.cityName} title={`${city}, ${stateOrCountry}`}>
          {city || key}
        </span>
        <span className={styles.weatherIcon}>
          {getWeatherEmoji(conditions)}
        </span>
      </div>
      <div>
        <div className={styles.temperature}>{temperature}°</div>
        <div className={styles.description}>
          {conditions || 'Unknown'} (Feels {feelsLikeTemperature}°)
        </div>
      </div>
      
      <button
        type="button"
        className={styles.removeBtn}
        name="remove_weather"
        onClick={removeWeatherHandler}
        data-key={key}
        title="Remove"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

WeatherLocation.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    data: PropTypes.shape({
      temperature: PropTypes.string,
      feelsLikeTemperature: PropTypes.string,
      conditions: PropTypes.string,
      city: PropTypes.string,
      stateOrCountry: PropTypes.string,
    }),
    timestamp: PropTypes.string,
  }).isRequired,
};

export default WeatherLocation;
