import { useState } from 'react';
import axios from 'axios';

const useOverviewData = () => {
  const [overview, setOverview] = useState({});
  const [desc, setDesc] = useState({});
  const primeOverview = async (tick) => {
    const data = await axios.get(`/api/statements/overview/${tick}`);
    const json = data.data;
    primeDesc(json);
    delete json.Symbol;
    delete json.AssetType;
    delete json.Name;
    delete json.Description;
    delete json.Exchange;
    delete json.Currency;
    delete json.Country;
    delete json.Sector;
    delete json.Industry;
    delete json.Address;
    delete json.FullTimeEmployees;
    setOverview(json);
  };

  const primeDesc = (json) => {
    const {
      Symbol,
      AssetType,
      Name,
      Description,
      Exchange,
      Currency,
      Country,
      Sector,
      Industry,
      Address,
      FullTimeEmployees
    } = json;
    setDesc({
      Symbol,
      AssetType,
      Name,
      Description,
      Exchange,
      Currency,
      Country,
      Sector,
      Industry,
      Address,
      FullTimeEmployees
    });
  };

  return {
    overview,
    setOverview,
    primeOverview,
    desc
  };
};

export default useOverviewData;