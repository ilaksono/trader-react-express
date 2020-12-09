import { useReducer, useEffect } from 'react';
import axios from 'axios';
const index = require('index.json');
const GET_DASH = 'GET_DASH';
const SET_PAGE = 'SET_PAGE';
const dashReducer = (dashState, action) => {
  switch (action.type) {
    case GET_DASH:
      return { page: dashState.page, data: [...action.data] };
    case SET_PAGE:
      return { ...dashState, page: action.num };
    default:
      throw new Error('invalid dash type');
  }
};
const initDash = {
  data: [],
  page: 1
};

const useDashboardData = () => {
  const [dash, dispatch] = useReducer(dashReducer, initDash);

  const setDashboard = async (arr) => {
    const prom = arr.map(each =>
      getGlobal(each.symbol)
    );
    const all = await Promise.all(prom);
    const data = all.map(each =>
      each.data.data
    );
    console.log(data);
    //  dispatch({ type: GET_DASH, data });
  };
  const getGlobal = (id) => {
    return axios.get(`/api/global/${id}`);
  };
  const setPage = (event, num) => {
    console.log(num);
    dispatch({ type: SET_PAGE, num });
  };
  return {
    dash,
    setDashboard,
    setPage
  };
};

export default useDashboardData;