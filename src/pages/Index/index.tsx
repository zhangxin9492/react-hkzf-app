import React from 'react'
import { TabBar } from 'antd-mobile'
import './index.css'

import {Route} from "react-router-dom"
// 导入组件
import Homeindex from '../Home/index'
import List from '../houseList/index'
import News from '../news/idnex'
import Profile from '../profile/index'

// interface Props { location: any }
interface IProps {
    location: any,
    history: any
  }
  interface IState {
    selectedTab: any,
    hidden: any,
    fullScreen: Boolean
}
const TABR_ITEMLIST = [
    {title: '首页',icon: 'icon-ind',path:'/index/index'},
    {title: '找房',icon: 'icon-findHouse',path:'/index/list'},
    {title: '资讯',icon: 'icon-infom',path:'/index/news'},
    {title: '我的',icon: 'icon-my',path:'/index/profile'}
]
const win:any = window
export default class Index extends React.Component<IProps,IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedTab: this.props.location.pathname,
            hidden: false,
            fullScreen: true,
        }
    }
    componentDidMount() {
        console.log(this.props, this.props.location.pathname)
        function myFun( result: any ) {
            var cityName = result.name;
            // map.setCenter(cityName);
        }
        let myCity = new win.BMap.LocalCity();
        myCity.get(myFun)
    }
    componentDidUpdate(pre:any) {
        if(pre.location.pathname != this.props.location.pathname) {
            this.setState({
                selectedTab: this.props.location.pathname
            })
        }
    }
    renderTabBarList = () => {
        return TABR_ITEMLIST.map(item => (
            <TabBar.Item
                title={item.title}
                key={item.path}
                icon={ <i className={`iconfont ${item.icon}`} />}
                selectedIcon={ <i className={`iconfont ${item.icon}`} />}
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                    this.props.history.push(item.path)
                    this.setState({
                        selectedTab: item.path,
                    })
                }}
            />
        ))
    }
    render() {
        return (
            <div className="homePage">
                <Route path="/index/index" component={ Homeindex }></Route>   
                <Route path="/index/list" component={ List }></Route>   
                <Route path="/index/news" component={ News }></Route>   
                <Route path="/index/profile" component={ Profile }></Route>   
                <div className="tabBar" style={{ position: 'fixed',width: '100%', bottom: 0 } }>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                        hidden={this.state.hidden}
                    >    
                    {this.renderTabBarList()}                   
                    </TabBar>
                </div>
            </div>           
        );
    }
}