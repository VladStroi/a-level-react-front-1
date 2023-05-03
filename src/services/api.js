import axios from 'axios';

const API_HOST = 'http://localhost:3010';

export const api = {
  getProducts: (params = {}) => {
    return axios.get(`${API_HOST}/product`, {
      // TODO: support server sorting?
      params: params.pagination
        ? { pagination: JSON.stringify(params.pagination) }
        : {}
    });
  },
  getCategories: () => {
    return axios.get(`${API_HOST}/category`);
  },
  getCurrencies: () => {
    return axios.get(`${API_HOST}/currency`);
  }
};
