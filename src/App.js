import Main from 'components/Main';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from 'components/NavBar';
import Home from 'components/Home';
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/main'>
            <Main />
          </Route>
          <Route path='/intra'>
            <Main />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
