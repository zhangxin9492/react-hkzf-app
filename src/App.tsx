import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from './pages/Index/index'
import Home from './pages/Home'

const App: React.FC = () => {
  return (
      <Router>
          {/* <Link to="/">首页</Link> */}
          {/* <Link to="/home">个人中心</Link>   */}
          <Route path="/" exact component={Index}></Route>
          {/* <Route path="/home" component={Home}></Route> */}
      </Router>
  );
}

export default App