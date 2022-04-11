import axios from 'axios';
import { getDomain } from 'helpers/getDomain';

export const api = axios.create({
  baseURL: getDomain(),
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use( (config) => {
  // Interceptor for authentication requests
  // console.log("Intercepted ", config.url);
  // Add auth token only to protected API requests

  // let's populate the basic auth with our token
  let authHeader = `Basic ${localStorage.getItem('token')}`;

  // formatting a string for the regex checking
  let requestString = `${config.method}:${config.url}`;

  // let us generally send the auth token (this may be insecure)
  let requiresAuth = true;

  // add the header to the axios request
  if(requiresAuth) {
    config.headers.Authorization = authHeader;
    console.log(`Sending ${authHeader}`);
  }

  // return config
  return config;

})

export const handleError = error => {
  const response = error.response;

  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    let info = `\nrequest to: ${response.request.responseURL}`;

    if (response.data.status) {
      info += `\nstatus code: ${response.data.status}`;
      info += `\nerror: ${response.data.error}`;
      info += `\nerror message: ${response.data.message}`;
    } else {
      info += `\nstatus code: ${response.status}`;
      info += `\nerror message:\n${response.data}`;
    }

    console.log('The request was made and answered but was unsuccessful.', error.response);
    return info;
  } else {
    if (error.message.match(/Network Error/)) {
      alert('The server cannot be reached.\nDid you start it?');
    }

    console.log('Something else happened.', error);
    return error.message;
  }
};
