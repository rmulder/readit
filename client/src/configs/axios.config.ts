import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import Router from 'next/router';

export interface IAxiosRequestConfigWithDelay extends AxiosRequestConfig {
  delay?: boolean;
}

const readitConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:9000/api',
  withCredentials: true,
};

export const readitAxios = axios.create(readitConfig);

//interceptors
readitAxios.interceptors.request.use((request: IAxiosRequestConfigWithDelay) => {
  if (request.delay) {
    return new Promise((resolve, reject) => setTimeout(() => resolve(request), 2000));
  }

  return request;
});

const onResponseFulFilled = (response: AxiosResponse<any>) => {
  return response;
};

const onResponseError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    Router.push('/account/login');
  }

  return Promise.reject(error); //Important to promise reject the error
};

readitAxios.interceptors.response.use(onResponseFulFilled, onResponseError);
