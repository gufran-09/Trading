/* eslint-disable react/jsx-filename-extension */
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChartLine, faServer, faCloudSun, faDesktop, faBell, faTerminal } from '@fortawesome/free-solid-svg-icons';
import Navigator from './Navigator';
import ServiceList from './ServiceList';
import Modal from '../../components/Modal';

import { writeToScreen } from '../../common/common';

import styles from './Main.module.css';
import InitialState from '../../types/InitialState';

const Main = (): JSX.Element => {
  const websocket = useSelector((state: InitialState) => state.app.websocket);
  const clientName = useSelector((state: InitialState) => state.app.clientName);
  const [modalVisible, setModalVisible] = useState<string | null>(null);

  const doSend = useCallback(
    (e: any, messageType: string, data: string) => {
      if (e) {
        e.preventDefault();
      }

      setModalVisible(null);

      if (websocket && data) {
        const message = `{"type":"${messageType}", "id":"${clientName}", "command":"add", "subscription":"${data}"}`;
        websocket.send(message);
        writeToScreen(`SENT: ${message}`);
      }
    },
    [clientName, websocket]
  );

  const sendStockAdd = useCallback((e: any, data: string) => doSend(e, 'TickerCommand', data), [doSend]);
  const sendUpDownAdd = useCallback((e: any, data: string) => doSend(e, 'UpDownCommand', data), [doSend]);
  const sendWeatherAdd = useCallback((e: any, data: string) => doSend(e, 'WeatherCommand', data), [doSend]);

  return (
    <>
      <Navigator />
      <div className={styles.dashboardLayout}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>Streams</div>
          <button className={`${styles.sidebarItem} ${styles.sidebarItemActive}`}>
            <FontAwesomeIcon icon={faChartLine} /> Stocks <span className={styles.sidebarBadge}>4</span>
          </button>
          <button className={styles.sidebarItem}>
            <FontAwesomeIcon icon={faServer} /> Site Uptime
          </button>
          <button className={styles.sidebarItem}>
            <FontAwesomeIcon icon={faCloudSun} /> Weather
          </button>

          <div className={styles.sidebarHeader} style={{ marginTop: '24px' }}>System</div>
          <button className={styles.sidebarItem}>
            <FontAwesomeIcon icon={faDesktop} /> Services Health
          </button>
          <button className={styles.sidebarItem}>
            <FontAwesomeIcon icon={faTerminal} /> Kafka Monitor
          </button>
          <button className={styles.sidebarItem}>
            <FontAwesomeIcon icon={faBell} /> Alerts Rules
          </button>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Active Streams</span>
              <span className={styles.statValue}>14</span>
              <span className={`${styles.statSubLabel} ${styles.colorGreen}`}>+2 this hour</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Kafka Msgs/s</span>
              <span className={styles.statValue}>8,421</span>
              <span className={`${styles.statSubLabel} ${styles.colorGreen}`}>Peaks at 11k</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>WebSocket Latency</span>
              <span className={styles.statValue}>24ms</span>
              <span className={`${styles.statSubLabel} ${styles.colorMuted}`}>Optimal</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Services Online</span>
              <span className={styles.statValue}>6/6</span>
              <span className={`${styles.statSubLabel} ${styles.colorGreen}`}>100% Uptime</span>
            </div>
          </div>

          <div className={styles.panelsGrid}>
            <div className={`${styles.dataPanel} ${styles.fullWidthPanel}`}>
              <div className={styles.panelHeader}>
                <span className={styles.panelTitle}>Market Stocks Feed</span>
                <button className={styles.panelAddBtn} onClick={() => setModalVisible('stocks')}>
                  <FontAwesomeIcon icon={faPlus} /> Add Symbol
                </button>
              </div>
              <ServiceList serviceName="stocks" />
            </div>

            <div className={styles.dataPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelTitle}>Site Uptime Monitor</span>
                <button className={styles.panelAddBtn} onClick={() => setModalVisible('updown')}>
                  <FontAwesomeIcon icon={faPlus} /> Add URL
                </button>
              </div>
              <ServiceList serviceName="updown" />
            </div>

            <div className={styles.dataPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelTitle}>Weather Stations</span>
                <button className={styles.panelAddBtn} onClick={() => setModalVisible('weather')}>
                  <FontAwesomeIcon icon={faPlus} /> Add City
                </button>
              </div>
              <ServiceList serviceName="weather" />
            </div>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.rightPanelSection}>
            <div className={styles.rightPanelHeader}>Microservices State</div>
            <div className={styles.serviceHealthRow}>
              <div className={styles.serviceInfo}>
                <div className={`${styles.statusDot} ${styles.bgGreen}`}></div>
                <span className={styles.serviceName}>StockService</span>
              </div>
              <span className={styles.serviceUptime}>100%</span>
            </div>
            <div className={styles.serviceHealthRow}>
              <div className={styles.serviceInfo}>
                <div className={`${styles.statusDot} ${styles.bgGreen}`}></div>
                <span className={styles.serviceName}>WeatherService</span>
              </div>
              <span className={styles.serviceUptime}>100%</span>
            </div>
            <div className={styles.serviceHealthRow}>
              <div className={styles.serviceInfo}>
                <div className={`${styles.statusDot} ${styles.bgGreen}`}></div>
                <span className={styles.serviceName}>UpDownService</span>
              </div>
              <span className={styles.serviceUptime}>99.8%</span>
            </div>
          </div>

          <div className={styles.rightPanelSection}>
            <div className={styles.rightPanelHeader}>Kafka Throughput</div>
            <div className={styles.kafkaRow}>
              <div className={styles.kafkaHeader}>
                <span>ticks.live</span>
                <span className={styles.kafkaValue}>4.2k/s</span>
              </div>
              <div className={styles.kafkaTrack}>
                <div className={`${styles.kafkaFill} ${styles.bgBlue}`} style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className={styles.kafkaRow}>
              <div className={styles.kafkaHeader}>
                <span>weather.updates</span>
                <span className={styles.kafkaValue}>900/s</span>
              </div>
              <div className={styles.kafkaTrack}>
                <div className={`${styles.kafkaFill} ${styles.bgIndigo}`} style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>

          <div className={styles.rightPanelSection}>
            <div className={styles.rightPanelHeader}>Activity Feed</div>
            <div className={styles.feedRow}>
              <div className={`${styles.feedDot} ${styles.bgBlue}`}></div>
              <div className={styles.feedContent}>
                <span className={styles.feedText}>Client <span className={styles.feedHighlight}>{clientName || 'Admin'}</span> connected</span>
                <span className={styles.feedTime}>Just now</span>
              </div>
            </div>
            <div className={styles.feedRow}>
              <div className={`${styles.feedDot} ${styles.bgGreen}`}></div>
              <div className={styles.feedContent}>
                <span className={styles.feedText}>Subscribed to <span className={styles.feedHighlight}>MSFT</span></span>
                <span className={styles.feedTime}>2 mins ago</span>
              </div>
            </div>
            <div className={styles.feedRow}>
              <div className={`${styles.feedDot} ${styles.bgAmber}`}></div>
              <div className={styles.feedContent}>
                <span className={styles.feedText}>High latency on <span className={styles.feedHighlight}>weather API</span></span>
                <span className={styles.feedTime}>15 mins ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalVisible === 'stocks' && <Modal visible title="Enter ticker symbol (e.g. GOOG)" onClose={sendStockAdd} />}
      {modalVisible === 'updown' && <Modal visible title="Enter URL (e.g. https://example.com)" onClose={sendUpDownAdd} />}
      {modalVisible === 'weather' && <Modal visible title="Enter city name or ZIP code" onClose={sendWeatherAdd} />}
    </>
  );
};

export default Main;
