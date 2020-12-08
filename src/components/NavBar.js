import 'styles/NavBar.scss';
import { Link } from 'react-router-dom';
const NavBar = () => {


  return (
    <nav className='nav-container'>
      <Link to='/main'>
        <div className='nav-logo'>
          Daily
      </div>
      </Link>
      <Link to='/currency'>
        <div className='nav-logo'>
          Currency
      </div>
      </Link>

    </nav>
  );

};

export default NavBar;