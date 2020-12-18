import React, { Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
const Dashboard = React.lazy(() => import('./Dashboard'));
// import Dashboard from './Dashboard';
const Home = () => {
  return (
    <div>
      <Suspense fallback={<div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%'
      }}>
        <CircularProgress color="primary" size={100} />
        Page is loading
        </div>}>
        <Dashboard />
      </Suspense>
    </div>
  );

};
export default Home;