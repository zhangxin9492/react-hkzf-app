import React, { Component } from 'react'
import NavHeader from '../../components/navHeader/index'
import { InputItem, Button, WhiteSpace,Toast } from 'antd-mobile'
import { fetch } from '../../utils/fetch'
import { setTokn } from '../../utils/utils'
import './index.css'
interface IProps {
    history: any
}
interface IState {
    userName: String,
    passWord: String
}
export default class index extends Component<IProps, IState> {
    state = {
        userName: '',
        passWord: ''
    }
    // onChange(val:any) {
    //     console.log(val)
    // }
    submitForm = async () => {
        const {userName,passWord} = this.state
        let res = await fetch.post('/user/login', {
            username: userName,
            password: passWord       
        })
        console.log(res)
        const {status,body,description} = res.data
        if (status === 200) {
            setTokn(body.token)
            this.props.history.push(this.props.history.location.state.from.pathname)
        } else {
            Toast.fail(description)
        }
    }
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return (
            <div className="login">
                <NavHeader>登录页</NavHeader>
                <div className="form">
                    <InputItem
                        // {...getFieldProps('input3')}
                        className="mgT15"
                        placeholder="用户名"
                        value={this.state.userName}
                        onChange={(val:String) => {this.setState({userName: val})}}
                    />
                    <InputItem
                        // {...getFieldProps('input3')}
                        className="mgT15"
                        placeholder="密码"
                        value={this.state.passWord}
                        onChange={(val:String) => {this.setState({passWord: val})}}
                    />
                    <Button type="primary" className="mgT15" onClick={this.submitForm}>登录</Button><WhiteSpace />
                </div>
            </div>
        )
    }
}
