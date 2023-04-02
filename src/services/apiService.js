import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL

const ApiService = {
  get: (url) => {
    return axios.get(`${baseURL}${url}`);
  },
  post: (url, body) => {
    return axios.post(`${baseURL}${url}`, body);
  },
  put: (url, body) => {
    return axios.put(`${baseURL}${url}`, body);
  },
  delete: (url) => {
    return axios.delete(`${baseURL}${url}`);
  },
};

export default ApiService;
