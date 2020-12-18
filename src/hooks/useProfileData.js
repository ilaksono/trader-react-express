import { useReducer } from 'react';
import axios from 'axios';



const profileReducer = (profData, action) => {
  switch (action.type) {
    case GET_FAVS:
      return { ...action.data };

    default:
      throw new Error('invalid profile type');
  }
};
const initProf = {
  id: 1,
  name: 'Ian Laksono',
  email: 'test@test.ca',
  favs: [{
    symbol: 'A',
    name: 'Agilent Technologies Inc',
    close: 117.01,
    open: 114.34,
    high: 117.34,
    low: 114.33,
    volume: 1338445
  }]
};
const GET_FAVS = 'GET_FAVOURITES';

const useProfileData = () => {
  const [profData, dispatch] = useReducer(profileReducer,);
  const getFavs = async (id) => {
    const data = await axios
      .get(`/api/users/${id}`);

    dispatch({ type: GET_FAVS, data: data.data.data });

  };

  return {
    profData,
    getFavs
  }

};

export default useProfileData;