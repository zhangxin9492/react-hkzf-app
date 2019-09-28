import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Index from './pages/Index/index'
const App: React.FC = () => {
  return (
      <Router>
          <Route path="/" render={() => <Redirect to="/index/index" />}></Route>
          <Route path="/index" component={Index}></Route>
      </Router>
  );
}

export default App