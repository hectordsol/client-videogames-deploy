import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateVideogame from './components/Home/Create/CreateVideogame';
import VideogameDetail from './components/VideogameDetail/VideogameDetail';

function App() {
  return (
    <React.Fragment>
      <Switch>
      <Route path={'/'} exact component={LandingPage}/>
      <Route path={'/home/:id'} component={VideogameDetail}/>
      <Route path={'/home'} component={Home}/>
      <Route path={'/create'} component={CreateVideogame}/>
      </Switch>
    </React.Fragment>  
  );
}

export default App;
