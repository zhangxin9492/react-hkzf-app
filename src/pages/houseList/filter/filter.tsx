import React from 'react'
import { PickerView, Button } from 'antd-mobile'
import FilterTitle from '../filterTitle/filterTitle'
import Sticky from '../../../components/sticky/index'
import './filter.css'
import { fetch } from '../../../utils/fetch'
import { getCity } from '../../../utils/utils'
interface IProps {
    getHousedList: any
}
interface IState {
    showFilter: Boolean
    openType: String
    allFilterData: Object
    currentFilterData: any
    currentFilterDataLength: Number
    // temporaryVlaue: Array<String>
    areaValue: Array<String>
    modeValue: Array<String>
    priceValue: Array<String>
    currentVlaue: Array<String>
    showFilterMore: Boolean
}
const openTypeList = ['area', 'mode', 'price']
// 选中状态
const selectedStatus = { area: false, mode: false, price: false }
export default class Filter extends React.Component<IProps, IState> {
    state = {
        openType: '',
        showFilter: false,
        showFilterMore: false,
        allFilterData: { area: {}, subway: {}, rentType: [], price: [] },
        currentFilterData: [],
        currentFilterDataLength: 1,
        // temporaryVlaue: [],
        areaValue: ['area', 'null'],
        modeValue: ['null'],
        priceValue: ['null'],
        currentVlaue: []
    }
    // 标记选中状态
    getSlectedStatus() {
        const { areaValue, modeValue, priceValue } = this.state
        if (
            !(
                areaValue.length === 2 &&
                areaValue[0] === 'area' &&
                areaValue[1] === 'null'
            )
        ) {
            selectedStatus.area = true
        } else {
            selectedStatus.area = false
        }
        if (modeValue[0] !== 'null') {
            selectedStatus.mode = true
        } else {
            selectedStatus.mode = false
        }
        if (priceValue[0] !== 'null') {
            selectedStatus.price = true
        } else {
            selectedStatus.price = false
        }
        console.log(this.state)
        this.props.getHousedList(this.state)
    }
    // 钩子函数
    componentDidMount() {
        this.getHouseCondition()
        // window.addEventListener('click', () => {
        //      this.setState({
        //        showFilterMore: false
        //     })
        // });
    }
    // 关闭遮罩层
    closeMask() {
        this.setState({
            showFilter: false,
            openType: '',
            showFilterMore: false
        })
    }
    // 获取选中的筛选属性
    getSelectedValue = (val: any) => {
        this.setState({
            currentVlaue: val
        })
    }
    // 确认筛选条件
    confirmSelected() {
        if (this.state.openType === 'area') {
            this.setState({
                areaValue: this.state.currentVlaue
            })
        }
        if (this.state.openType === 'mode') {
            this.setState({
                modeValue: this.state.currentVlaue
            })
        }
        if (this.state.openType === 'price') {
            this.setState({
                priceValue: this.state.currentVlaue
            })
        }
        this.setState({
            showFilter: false
        })
        this.getSlectedStatus()
    }
    // 前三个菜单渲染内容
    renderFilterPicker() {
        if (this.state.showFilter) {
            return (
                <div>
                    <PickerView
                        data={this.state.currentFilterData}
                        value={this.state.currentVlaue}
                        cols={this.state.currentFilterDataLength}
                        onChange={this.getSelectedValue}
                    />
                    <div className="oprate-button">
                        <Button
                            className="btn1"
                            onClick={() => this.closeMask()}
                        >
                            取消
                        </Button>
                        <Button
                            className="btn2"
                            onClick={() => this.confirmSelected()}
                        >
                            确定
                        </Button>
                    </div>
                </div>
            )
        }
    }
    // 获取所有搜索条件
    async getHouseCondition() {
        let { value } = getCity()
        let res = await fetch.get('/houses/condition', {
            params: {
                id: value
            }
        })
        const {
            data: { body, status }
        } = res
        if (status === 200) {
            this.setState({
                allFilterData: body
            })
        }
    }
    // 参数子传父需要使用箭头函数
    getCurrentType = (type: String) => {
        const { allFilterData } = this.state
        if (type === 'area') {
            this.setState({
                openType: type,
                showFilter: true,
                currentFilterData: [allFilterData.area, allFilterData.subway],
                currentFilterDataLength: 3,
                currentVlaue: this.state.areaValue
            })
        }
        if (type === 'mode') {
            this.setState({
                openType: type,
                showFilter: true,
                currentFilterData: allFilterData.rentType,
                currentFilterDataLength: 1,
                currentVlaue: this.state.modeValue
            })
        }
        if (type === 'price') {
            this.setState({
                openType: type,
                showFilter: true,
                currentFilterData: allFilterData.price,
                currentFilterDataLength: 1,
                currentVlaue: this.state.priceValue
            })
        }
        if (type === 'more') {
            this.setState({
                showFilterMore: true
            })
        }
    }
    // 更多筛选框
    renderFilterMore() {
        const { showFilterMore } =  this.state
            return <div className={['filterMore', showFilterMore? 'active': ''].join(' ')}></div>
    }
    render() {
        return (
            <div className="filter">
                {this.state.showFilter ? (
                    <div
                        className="mask"
                        onClick={() => this.closeMask()}
                    ></div>
                ) : null}
                <div className="content">
                <Sticky>
                <FilterTitle
                        getCurrentType={this.getCurrentType}
                        currentType={this.state.openType}
                        selectedStatus={selectedStatus}
                    ></FilterTitle>
                </Sticky>                   
                    {this.renderFilterPicker()}
                    <div>
                        {this.state.showFilterMore ? (
                            <div
                                className="mask2"
                                onClick={() => this.closeMask()}
                            ></div>
                        ) : null}
                        {this.renderFilterMore()}
                    </div>                    
                </div>
            </div>
        )
    }
}
