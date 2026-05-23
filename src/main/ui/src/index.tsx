import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Fix: Prevent react-error-overlay from blocking input fields
// react-scripts@4.0.3 has a bug where the error overlay creates an invisible
// full-screen iframe that intercepts all pointer events on the page
if (process.env.NODE_ENV === 'development') {
  const disableOverlay = async () => {
    try {
      const { stopReportingRuntimeErrors } = await import(
        'react-error-overlay'
      );
      stopReportingRuntimeErrors();
    } catch (e) {
      // Silently ignore if module not available
    }
  };
  disableOverlay();
}

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
