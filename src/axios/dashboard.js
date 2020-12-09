import axios from 'axios';

export const getGlobal = (id) => {
  return axios.get(`/api/global/${id}`);
}
