import 'styles/Company.scss';
import CompanyChart from 'components/Charts/CompanyChart';
import CompanyData from 'components/CompanyData';
const Company = () => {



  return (
    <div className='company-page-layout'>
      <CompanyChart />
      <CompanyData/>
    </div>

  );
};
export default Company;