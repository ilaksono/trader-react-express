const Header = () => {


  return (
    <div className='profile-header-container'>
      
      <div style={{
        width: 200,
        height: 200,
        backgroundImage: "url(https://britarchschools.com/img/founder.png)",
        backgroundPosition: 'center',
        backgroundSize: '200px',
        borderRadius: '50%'
      }}>
      </div>
      <div className='name-container'>
        <h1>Ian Laksono</h1>
        <img src="https://www.countryflags.io/ca/shiny/32.png" alt='flag not found' />
      </div>
    </div>
  );
};

export default Header;