import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import InitialState from '../../types/InitialState';
import './Login.css';

const Login = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = useSelector(
    (state: InitialState) => state.app.loginHandler
  );

  const login = useCallback(
    (e: any) => {
      e.preventDefault();
      if (loginHandler) {
        loginHandler(e, username, password);
      }
    },
    [loginHandler, password, username]
  );

  return (
    <div className="login-root">
      <div className="login-background-overlay"></div>
      <div className="login-swirl-bg">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 2a4 4 0 0 1 3.5 5.9L5.1 4.5A3.97 3.97 0 0 1 8 4zm0 8a4 4 0 0 1-3.5-5.9l6.4 5.4A3.97 3.97 0 0 1 8 12z" fill="white" />
        </svg>
      </div>
      <div className="login-card-wrapper">
        <div className="login-card">
          <div className="login-logo-container">
            <div className="login-logo-icon">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 2a4 4 0 0 1 3.5 5.9L5.1 4.5A3.97 3.97 0 0 1 8 4zm0 8a4 4 0 0 1-3.5-5.9l6.4 5.4A3.97 3.97 0 0 1 8 12z" fill="white" />
              </svg>
            </div>
            <span className="login-brand-text">Whirlpool</span>
          </div>
          <h2 className="login-headline">Welcome back</h2>
          <p className="login-subtext">Connect to your live data streams</p>
          <form onSubmit={login} className="login-form">
            <div className="input-wrapper">
              <input
                id="user"
                type="text"
                placeholder="Username or email"
                value={username}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-btn" id="login" type="submit">
              Sign In
            </button>
          </form>
          <div className="login-footer">
            Powered by Apache Kafka
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
