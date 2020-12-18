import DashTable from 'components/Home/DashTable';
import {useContext, useEffect} from 'react';
import AppContext from 'AppContext';
import {useParams} from 'react-router-dom';
import useProfileData from 'hooks/useProfileData';
const ProfileDashboard = () => {
  const {getDailyAdjusted} = useContext(AppContext);
  const {profData, getFavs} = useProfileData();
  const {id} = useParams();
  let index = [];
  useEffect(() => {
    if(id) getFavs(id)
  }, [])
  

  
  return (
    <div className='profile-dash-container'>
      DASHBOARD
      <DashTable />
    </div>
  )
}

export default ProfileDashboard;