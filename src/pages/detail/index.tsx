import React, { Component } from 'react'
import NavHeader from '../../components/navHeader/index'
import './index.css'
interface IProps {
history: any
}
interface IState {
    
}
export default class index extends Component<IProps, IState> {
    render() {
        return (
            <div className="houseDetail">
                <NavHeader>详情页</NavHeader>
                <div>这个是详情页</div>
            </div>
        )
    }
}


