import { useState } from 'react';
import axios from 'axios';

const useOverviewData = () => {
  const [overview, setOverview] = useState({});

  const primeOverview = async (tick) => {
    const data = await axios.get(`/api/statements/overview/${tick}`);
    setOverview(data.data);
  };

  return {
    overview,
    setOverview,
    primeOverview
  };
};

export default useOverviewData;