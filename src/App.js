import Main from 'components/Main';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from 'components/NavBar';
import Home from 'components/Home';
import Background from 'components/Background';
import 'styles/Background.scss';

import Candle from 'components/Charts';
import Profile from 'components/Profile';
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className='nav-spacer'>
        </div>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/main'>
            <Main />
          </Route>
          <Route path='/charts'>
            <Candle />
          </Route>
          <Route path='/users/:id'>
            <Profile />
          </Route>
        </Switch>
      </Router>
      {/* <Background/> */}
    </div>
  );
}

export default App;
