import React from 'react'
import { Flex } from 'antd-mobile'
import './filter.css'
interface IProps {
    getCurrentType: any
    currentType: String
    selectedStatus: any
}
interface IState {
    // currentType: String
}
const titleList = [
    { title: '区域', type: 'area' },
    { title: '方式', type: 'mode' },
    { title: '租金', type: 'price' },
    { title: '筛选', type: 'more' }
]
export default class FilterTitle extends React.Component<IProps, IState> {
    render() {
        const {currentType,selectedStatus} =this.props
        return (
            <div className="filterTitle">
                <Flex>
                    {titleList.map(item => (
                        <Flex.Item
                            key={item.type}
                            onClick={() => this.props.getCurrentType(item.type)}
                            className={
                                (currentType === item.type || selectedStatus[item.type])
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <span>{item.title}</span>
                            <i className="iconfont icon-arrow"></i>
                        </Flex.Item>
                    ))}
                </Flex>
            </div>
        )
    }
}
