import axios from 'axios';
import { KEY_TOKEN, KEY_TOKEN_REFRESH } from './constants';

const API = 'http://erp.apptrix.ru/api/clients';

export const URL_USER_DATA = '';
export const URL_SIGNUP = '/create/';
export const URL_LOGIN = '/token/';
export const URL_TOKEN_REFRESH = '/token/refresh/';

const client = axios.create({
  baseURL: API,
});

const getRefreshToken = async () => {
  const refresh = localStorage.getItem(KEY_TOKEN_REFRESH);
  const response = await client.post(URL_TOKEN_REFRESH, {
    refresh,
  });
  return response.data.access;
};

client.interceptors.request.use(
  async (config, ...rest) => {
    if (config.url.match(/\/RU-\d{6}/)) {
      const token = localStorage.getItem(KEY_TOKEN);
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await getRefreshToken();
      localStorage.setItem(KEY_TOKEN, token);
      return client(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default client;
