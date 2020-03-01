import React from 'react'
import { Carousel, Flex, Grid } from 'antd-mobile'
import { Link, Route } from 'react-router-dom'
import { fetch } from '../../utils/fetch'
import './index.css'
import nav1 from '../../asserts/images/nav-1.png'
import nav2 from '../../asserts/images/nav-2.png'
import nav3 from '../../asserts/images/nav-3.png'
import nav4 from '../../asserts/images/nav-4.png'
import { getCurrentCity, getCity } from '../../utils/utils'
import SearchHeader from '../../components/searchHeader/index'
interface IProps {
    location: any
    history: any
}
interface IState {
    imgList: Array<Object>
    imgHeight: Number | String
    isLoading: Boolean
    navBarList: Array<Object>
    rentGrouplist: Array<Object>
    newsList: Array<Object>
    cityName: String
}
const win: any = window
export default class Homeindex extends React.Component<IProps, IState> {
    state = {
        // 类型检查???
        imgList: [{ id: 0, imgSrc: '', alt: '' }],
        imgHeight: 176,
        isLoading: false,
        navBarList: [
            { pic: nav1, name: '整租', id: 0, url: '/index/list' },
            { pic: nav2, name: '合租', id: 1, url: '/index/list' },
            { pic: nav3, name: '地图找房', id: 3, url: '/index/list' },
            { pic: nav4, name: '去出租', id: 4, url: '/index/list' }
        ],
        rentGrouplist: [{ desc: '', id: 0, imgSrc: '', title: '' }],
        newsList: [{ date: '', from: '', id: 0, imgSrc: '', title: '' }],
        cityName: '上海' // 城市名称
    }
    async getImgList() {
        let res = await fetch.get('/home/swiper')
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
                style={{
                    display: 'inline-block',
                    width: '100%',
                    height: this.state.imgHeight
                }}
            >
                <img
                    src={`http://localhost:8080${item.imgSrc}`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'))
                        this.setState({ imgHeight: 'auto' })
                    }}
                />
            </a>
        ))
    }
    // 渲染导航栏
    renderNavBar() {
        return this.state.navBarList.map(item => (
            <Flex.Item key={item.id}>
                <Link to={item.url}>
                    <img src={item.pic} alt="" />
                    <p>{item.name}</p>
                </Link>
            </Flex.Item>
        ))
    }
    async componentDidMount() {
        // 获取当前城市定位
        const curCity: any = await getCurrentCity()
        this.setState({
            cityName: curCity.label
        })
        this.getImgList()
        this.getGroup()
        this.getNews()
    }
    async getGroup() {
        let res = await fetch.get('/home/groups')
        this.setState({
            rentGrouplist: res.data.body
        })
    }
    async getNews() {
        let res = await fetch.get('/home/news')
        this.setState({
            newsList: res.data.body
        })
    }
    // 渲染资讯列表
    renderNewsList() {
        return this.state.newsList.map(item => (
            <div className="title-content" key={item.id}>
                <div className="img">
                    <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                </div>
                <div className="info">
                    <div className="topInfo">{item.title}</div>
                    <div className="botInfo">
                        <span>{item.from}</span>
                        <span style={{ float: 'right' }}>{item.date}</span>
                    </div>
                </div>
            </div>
        ))
    }
    render() {
        return (
            <div className="homeIndex">
                {/* 首页轮播 */}
                <div className="swiper">
                    {this.state.isLoading && (
                        <Carousel autoplay={true} infinite>
                            {this.rederSwiper()}
                        </Carousel>
                    )}
                    <SearchHeader cityName={this.state.cityName}></SearchHeader>
                </div>
                {/* 导航栏*/}
                <Flex className="navBarList">{this.renderNavBar()}</Flex>
                {/* 租房小组模块 */}
                <div className="rentGroup">
                    <Flex justify="between" className="rentGroupTitle">
                        <h3>租房小组</h3>
                        <p>更多</p>
                    </Flex>
                    {/* 列表 */}
                    <Grid
                        data={this.state.rentGrouplist}
                        hasLine={true}
                        activeStyle={true}
                        columnNum={2}
                        renderItem={DataItem => (
                            <Flex
                                className="rentGroup-DataItem"
                                justify="between"
                            >
                                <div>
                                    <p>家住回龙观</p>
                                    <p>归属的感觉</p>
                                </div>
                                <div>
                                    <img
                                        width="50px"
                                        src={`http://localhost:8080/img/groups/2.png`}
                                        alt=""
                                    />
                                </div>
                            </Flex>
                        )}
                    />
                </div>
                {/* 资讯模块 */}
                <div className="news">
                    <div className="news-title">
                        <h3>最新资讯</h3>
                    </div>
                    {this.renderNewsList()}
                </div>
            </div>
        )
    }
}
