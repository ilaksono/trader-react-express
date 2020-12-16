import Header from './Header';
import ProfileDashboard from './ProfileDashboard';
import 'styles/Profile.scss';
const Profile = () => {

  return (
    <div className='profile-layout'>
      <Header/>
      <ProfileDashboard/>
    </div>

  );


};

export default Profile;