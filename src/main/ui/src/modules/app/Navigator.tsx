import { useSelector } from 'react-redux';
import styles from './Navigator.module.css';
import InitialState from '../../types/InitialState';

const Navigator = (): JSX.Element => {
  const clientName = useSelector((state: InitialState) => state.app.clientName);
  const logoutHandler = useSelector(
    (state: InitialState) => state.app.logoutHandler
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 2a4 4 0 0 1 3.5 5.9L5.1 4.5A3.97 3.97 0 0 1 8 4zm0 8a4 4 0 0 1-3.5-5.9l6.4 5.4A3.97 3.97 0 0 1 8 12z" fill="white"/>
          </svg>
        </div>
        <span className={styles.logoText}>Whirlpool</span>
        <span className={styles.liveBadge}>LIVE</span>
      </div>

      <div className={styles.navTabs}>
        <button className={`${styles.tab} ${styles.tabActive}`}>Dashboard</button>
        <button className={styles.tab}>Streams</button>
        <button className={styles.tab}>Services</button>
        <button className={styles.tab}>Alerts</button>
      </div>

      <div className={styles.userControls}>
        <div className={styles.connectionStatus}>
          <div className={styles.liveDot}></div>
          <span className={styles.connectionLabel}>CONNECTED</span>
        </div>
        <button className={styles.avatar} onClick={logoutHandler} title="Logout">
          {clientName.substring(0, 2).toUpperCase() || 'U'}
        </button>
      </div>
    </div>
  );
};

export default Navigator;
