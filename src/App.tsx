import React, { lazy,Suspense } from 'react'
import './App.css'
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'
import Index from './pages/Index/index'
// import Map from './pages/map/index'
// import CityList from './pages/cityList/index'
// import Detail from './pages/detail/index'
// import Login from './pages/login/index'
// import Search from './pages/search/index'
// import AuthRoute from './components/authroute/index'
// const Index = React.lazy(() => import('./pages/Index/index'))
// react 实现按需加载
const Map = React.lazy(() => import('./pages/map/index'))
const CityList = React.lazy(() => import('./pages/cityList/index'))
const Detail = React.lazy(() => import('./pages/detail/index'))
const Login = React.lazy(() => import('./pages/login/index'))
const Search = React.lazy(() => import('./pages/search/index'))
const AuthRoute = React.lazy(() => import('./components/authroute/index'))
const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<div>loading...</div>}>
                <div className="app">
                    <Route
                        path="/"
                        exact
                        render={() => <Redirect to="/index/index" />}
                    ></Route>
                    <Route path="/index" component={Index}></Route>
                    <Route path="/map" component={Map}></Route>
                    <Route path="/citylist" component={CityList}></Route>
                    <AuthRoute path="/detail" component={Detail}></AuthRoute>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/search" component={Search}></Route>
                </div>
            </Suspense>
        </Router>
    )
}

export default App
