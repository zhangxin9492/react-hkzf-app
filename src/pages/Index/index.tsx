import React from 'react'
import { TabBar } from 'antd-mobile'
import './index.css'

import {Route} from "react-router-dom";
// 导入组件
import Homeindex from '../Home/index'
import List from '../houseList/index'
import News from '../news/idnex'
import Profile from '../profile/index'

// interface Props { location: any }
interface IProps {
    location: any
  }
  interface IState {
    selectedTab: any,
    hidden: any,
    fullScreen: Boolean
}
export default class Index extends React.Component<IProps,IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            // selectedTab: '',
            selectedTab: this.props.location.pathname,
            hidden: false,
            fullScreen: true,
        }
    }
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return (
            <div className="homePage">
                <Route path="/index/index" component={ Homeindex }></Route>   
                <Route path="/index/list" component={ List }></Route>   
                <Route path="/index/news" component={ News }></Route>   
                <Route path="/index/profile" component={ Profile }></Route>   
                <div className="tabBar" style={{ position: 'fixed', height: '100%', width: '100%', top: 0 } }>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                        hidden={this.state.hidden}
                    >
                        <TabBar.Item
                        title="首页"
                        key="Life"
                        icon={ <i className="iconfont icon-ind"></i> }
                        selectedIcon={ <i className="iconfont icon-ind"></i> }
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                            selectedTab: 'blueTab',
                            });
                        }}
                        data-seed="logId"
                        >
                        </TabBar.Item>
                        <TabBar.Item
                        icon={ <i className="iconfont icon-findHouse"></i> }
                        selectedIcon={ <i className="iconfont icon-findHouse"></i> }
                        title="Koubei"
                        key="Koubei"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                            selectedTab: 'redTab',
                            });
                        }}
                        data-seed="logId1"
                        >
                        </TabBar.Item>
                        <TabBar.Item
                        icon={ <i className="iconfont icon-infom"></i> }
                        selectedIcon={ <i className="iconfont icon-infom"></i> }
                        title="Friend"
                        key="Friend"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                            selectedTab: 'greenTab',
                            });
                        }}
                        >
                        </TabBar.Item>
                        <TabBar.Item
                        icon={ <i className="iconfont icon-my"></i> }
                        selectedIcon={ <i className="iconfont icon-my"></i> }
                        title="My"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                            selectedTab: 'yellowTab',
                            });
                        }}
                        >
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>           
        );
    }
}