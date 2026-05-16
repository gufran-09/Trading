import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import InitialState from '../../types/InitialState';

const Login = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = useSelector(
    (state: InitialState) => state.app.loginHandler
  );

  const login = useCallback(
    (e: any) => {
      if (loginHandler) {
        loginHandler(e, username, password);
      }
    },
    [loginHandler, password, username]
  );

  return (
    <form onSubmit={login}>
      <table>
        <tbody>
          <tr>
            <td className="left">Username</td>
            <td>
              <input
                id="user"
                type="text"
                size={40}
                value={username}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="left">Password</td>
            <td>
              <input
                id="password"
                type="password"
                size={40}
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>&nbsp;</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button id="login" type="submit">
                Login
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default Login;
