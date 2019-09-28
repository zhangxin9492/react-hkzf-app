import React from 'react'
import { Carousel,Flex } from 'antd-mobile'
import { Link } from "react-router-dom";
import axios from 'axios'
import './index.css'
import nav1 from '../../asserts/images/nav-1.png'
import nav2 from '../../asserts/images/nav-2.png'
import nav3 from '../../asserts/images/nav-3.png'
import nav4 from '../../asserts/images/nav-4.png'
interface IProps {
    location: any,
    history: any
  }
  interface IState {
    imgList: Array<Object>,
    imgHeight: Number | String,
    isLoading: Boolean,
    navBarList: Array<Object>
}
export default class Homeindex extends React.Component<IProps,IState> {
    state = {
        // 类型检查???
        imgList: [{id: 0,imgSrc: '',alt:''}],
        imgHeight: 176,
        isLoading: false,
        navBarList: [
            {pic: nav1, name: '整租', id: 0,url: '/index/list'},
            {pic: nav2, name: '合租', id: 1,url: '/index/list'},
            {pic: nav3, name: '地图找房', id: 3,url: '/index/list'},
            {pic: nav4, name: '去出租', id: 4,url: '/index/list'}
        ]
    }
    async getImgList() {
        let res = await axios.get('http://localhost:8080/home/swiper')
        this.setState({
            imgList: res.data.body,
            isLoading: true
        })
    }
    // 渲染轮播组件
    rederSwiper() {
        return this.state.imgList.map(item => (
            <a
                key={item.id}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                <img
                    src={`http://localhost:8080${item.imgSrc}`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                    // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({ imgHeight: 'auto' });
                    }}
                />
            </a>
        ))
    }
    // 渲染导航栏
    renderNavBar() {
        return this.state.navBarList.map(item => (
            <Flex.Item key={item.id}>
                <Link to={ item.url }>
                    <img src={item.pic} alt=""/>
                    <p>{item.name}</p>
                </Link>
            </Flex.Item>
        ))
    }
    componentDidMount() {
        this.getImgList()
    }
    render() {
        return (
            <div className="homeIndex">
                {/* 首页轮播 */}
                {this.state.isLoading &&  <Carousel
                    autoplay={true}
                    infinite
                    >
                    { this.rederSwiper() }
                </Carousel>}
               {/* 导航栏*/}
                <Flex className="navBarList">
                   { this.renderNavBar() }
                </Flex>
                {/* 租房小组模块 */}
                <div className="rentGroup">
                    <Flex justify="between" className="rentGroupTitle">
                        <h3>租房小组</h3>
                        <p>更多</p>
                    </Flex>
                </div>
                
            </div>
        )
    }
}