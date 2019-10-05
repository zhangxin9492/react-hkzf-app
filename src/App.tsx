import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Index from './pages/Index/index'
import Map from './pages/map/index'
import CityList from './pages/cityList/index'
const App: React.FC = () => {
  return (
      <Router>
          <Route path="/" exact render={() => <Redirect to="/index/index" />}></Route>
          <Route path="/index" component={ Index }></Route>
          <Route path="/map" component={ Map }></Route>
          <Route path="/citylist" component={ CityList }></Route>
      </Router>
  )
}

export default App