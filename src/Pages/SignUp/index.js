import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../constants';
import client, { URL_SIGNUP } from '../../client';
import { alertErrors, alertComplete } from '../../lib/notify';

const DEFAULT_COUNTRY_KEY = 'RU';
const DEFAULT_INVETED_ID = 'RU-637164';

const SignUp = (props) => {
  const [data, setData] = useState({
    invited_by: DEFAULT_INVETED_ID,
    name: '',
    surname: '',
    phone: '',
    country_key: DEFAULT_COUNTRY_KEY,
    password: '',
    email: '',
  });

  const create = () => {
    const { password, email, ...rest } = data;
    client
      .post(URL_SIGNUP, { ...rest, user: { password, email } })
      .then((res) => {
        const text = 'регистрация завершена';
        alertComplete({ text });
        props.history.push(ROUTE_LOGIN);
      })
      .catch((err) => alertErrors(err.response.data));
  };

  const handlerOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div>
        <div>
          <input
            onChange={handlerOnChange}
            placeholder="email"
            type="text"
            name="email"
          />
          <br />
          <input
            onChange={handlerOnChange}
            placeholder="password"
            type="text"
            name="password"
          />
          <br />
        </div>
        <input
          onChange={handlerOnChange}
          placeholder="name"
          type="text"
          name="name"
        />
        <br />
        <input
          onChange={handlerOnChange}
          placeholder="surname"
          type="text"
          name="surname"
        />
        <br />
        <InputMask
          onChange={handlerOnChange}
          name="phone"
          placeholder="+7 XXX XXX-XX-XX"
          mask="+7 999 999-99-99"
          maskChar="_"
        />
      </div>
      <button onClick={create}>SignUp</button>
      <Link to={ROUTE_LOGIN}>LogIn</Link>
    </div>
  );
};

export default SignUp;
