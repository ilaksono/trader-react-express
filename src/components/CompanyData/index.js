import {useContext, useEffect} from 'react';
import AppContext from 'AppContext';
import { useParams } from 'react-router-dom';
import Description from './Description';
const CompanyData = () => {
  const {id} = useParams();
  const {
    primeOverview,
    desc,

  } = useContext(AppContext);

  useEffect(() => {
    primeOverview(id);
  }, [])

  return (
    <div className='company-data-container'>
      <Description desc={desc}/>
    </div>
  )
}

export default CompanyData;