import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  KEY_CLINET_ID,
  KEY_TOKEN,
  KEY_TOKEN_REFRESH,
  ROUTE_HOME,
  ROUTE_SIGNUP,
} from '../../constants';
import client, { URL_LOGIN } from '../../client';
import { alertErrors, alertComplete } from '../../lib/notify';

const STRING_LOGIN_SUCCESSFULLY = 'Вы вошли';

const Login = (props) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handlerOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = () => {
    client
      .post(URL_LOGIN, user)
      .then((res) => {
        localStorage.setItem(KEY_TOKEN, res.data.access);
        localStorage.setItem(KEY_CLINET_ID, res.data.client_id);
        localStorage.setItem(KEY_TOKEN_REFRESH, res.data.refresh);
        alertComplete({ text: STRING_LOGIN_SUCCESSFULLY });
        props.history.push(ROUTE_HOME);
      })
      .catch((err) => {
        alertErrors(err.response.data);
      });
  };

  return (
    <div>
      <div>
        <input
          onChange={handlerOnChange}
          placeholder="name"
          name="username"
          type="text"
        />
        <input
          onChange={handlerOnChange}
          placeholder="password"
          name="password"
          type="text"
        />
      </div>
      <button onClick={login}>LogIn</button>
      <Link to={ROUTE_SIGNUP}>Sign Up</Link>
    </div>
  );
};

export default Login;
