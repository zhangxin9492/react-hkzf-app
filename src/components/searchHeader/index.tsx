import React from 'react'
import { Flex } from 'antd-mobile'
// 非路由组件用到history等路由属性需要使用withRouter高接路由组件
import { withRouter, RouteComponentProps } from 'react-router-dom'
import './index.css'
// ---坑---
interface IProps extends RouteComponentProps {
    history: any
    cityName: String
}
const SearchHeader: React.SFC<IProps> = props => (
    <Flex className="search-box">
        <Flex className="search-left">
            <div
                className="location"
                onClick={() => props.history.push('/citylist')}
            >
                <span>{props.cityName}</span>
                <i className="iconfont icon-arrow" />
            </div>

            <div
                className="search-form"
                onClick={() => props.history.push('/search')}
            >
                <i className="iconfont icon-seach" />
                <span>请输入小区或地址</span>
            </div>
        </Flex>
        <i
            className="iconfont icon-map"
            onClick={() => props.history.push('/map')}
        />
    </Flex>
)
export default withRouter(SearchHeader)
