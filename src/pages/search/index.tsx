import React, { Component } from 'react'
import { InputItem } from 'antd-mobile'
import { fetch } from '../../utils/fetch'
import { getCurrentCity } from '../../utils/utils'
import _lodash from 'lodash'
import './index.css'
interface IProps {
    history: any
}
interface IState {
    keyWords: string
    cityId: string
    communityList: Array<any>
}
export default class Search extends Component<IProps, IState> {
    state = {
        keyWords: '',
        cityId: '',
        communityList: [{ communityName: '',community: '' }],
    }
    async componentDidMount() {
        const curCity: any = await getCurrentCity()
        this.setState({
            cityId: curCity.value
        })
    }
    timerId:any = null
    search = _lodash.debounce(async (val: string) => {
        let res = await fetch.get('/area/community', {
            params: {
                name: val,
                id: this.state.cityId
            }
        })
        const { code, body } = res.data
        this.setState({ communityList: body })
    }, 500)
    searchResult = (val: string) => {
        this.setState({ keyWords: val })
        console.log(1) 
        // console.log(this.state.communityList)
        // 搜索优化，一直输入只有在输入停止的时候才会发送请求
        // clearTimeout(this.timerId)
        // this.timerId = setTimeout(async () => {
        //     let res = await fetch.get('/area/community', {
        //         params: {
        //             name: val,
        //             id: this.state.cityId
        //         }
        //     })
        //     const { code, body } = res.data
        //     this.setState({ communityList: body })
        // },500)
        // 利用debounce函数
        this.search(val)
    }
    renderComunityList() {
        return (
            <ul>
                {this.state.communityList.map(item => (
                    <li className="communityList" key={item.community}>{item.communityName}</li>
                ))}
            </ul>
        )
    }
    render() {
        const {communityList} = this.state
        return (
            <div>
                <InputItem
                    // {...getFieldProps('input3')}
                    className="mgT15"
                    placeholder="输入关键词"
                    value={this.state.keyWords}
                    onChange={this.searchResult}
                />
                {communityList.length > 0 && this.renderComunityList()}
            </div>
        )
    }
}
