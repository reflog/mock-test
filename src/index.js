import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createClient } from 'service-mocker/client';
const client = createClient('/static/js/src/server.js', { forceLegacy: true }); // if you set this parameter to 'false' the 'client.ready' below will not fire
import axios from 'axios';
axios.defaults.baseURL = '/api';
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  if (token)
    config.headers.common['Authorization'] = `Bearer: ${token}`;
  return config;
}, function (error) {
  return Promise.reject(error);
});

client.ready.then(async () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
});
