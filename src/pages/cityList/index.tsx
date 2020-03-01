import React from 'react'
import { fetch } from '../../utils/fetch'
import { NavBar, Icon, Toast } from 'antd-mobile'
import { List, AutoSizer } from 'react-virtualized'
import './index.css'
// import Index from '../Index'
import { setCity } from '../../utils/utils'

import NavHeader from '../../components/navHeader/index'
interface IProps {
    history: any
}
interface IState {
    formtCityList: any
    writeList: Array<any>
    currentIndex: Number
    hasCityList: Array<String>
}
export default class CityList extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            formtCityList: null,
            writeList: [],
            currentIndex: 0,
            hasCityList: ['上海', '北京', '广州', '深圳']
        }
    }
    // 创建ref对象
    listRef: any = React.createRef()
    async componentDidMount() {
        await this.getCityList()
        this.listRef.current.measureAllRows()
    }
    // 格式化城市列表数据
    formatCityList(citylist: Array<any>) {
        let formtCityList: any = {}
        let writeList = []
        citylist.forEach(item => {
            let write = item.pinyin.substr(0, 1)
            if (write in formtCityList) {
                formtCityList[write].push(item)
            } else {
                formtCityList[write] = [item]
            }
        })
        writeList = Object.keys(formtCityList).sort()
        let cs = localStorage.getItem('curCity')
        // ???
        if (cs) {
            var curCity = JSON.parse(cs)
        }
        formtCityList['#'] = [curCity]
        writeList.unshift('#')
        this.setState({
            formtCityList: formtCityList,
            writeList: writeList
        })
    }
    // 获取城市列表索引
    getIndex(letter: String) {
        if (letter == '#') {
            return '当前城市'
        } else {
            return letter.toUpperCase()
        }
    }
    // 获取城市列表
    async getCityList() {
        let res = await fetch.get('/area/city', { params: { level: 1 } })
        this.formatCityList(res.data.body)
    }
    // 切换城市
    changeCity(item: any) {
        const { label, value } = item
        if (this.state.hasCityList.indexOf(label) <= -1) {
            Toast.info('当前城市无房源,请重新选择!')
            return
        }
        setCity({ label, value })
        this.props.history.push('/index/index')
    }
    // 渲染列表
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style // Style object to be applied to row (to position it)
    }: any) => {
        const { formtCityList, writeList } = this.state
        const letter = writeList[index]
        const list: Array<any> = formtCityList[letter]
        return (
            <div key={key} style={style} className="city">
                <div className="title">{this.getIndex(letter)}</div>
                {list.map(item => (
                    <div
                        key={item.value}
                        className="name"
                        onClick={() => this.changeCity(item)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        )
    }
    //   动态计算每一行的高度
    caculateHeight = ({ index }: any) => {
        const { formtCityList, writeList } = this.state
        const letter = writeList[index]
        const list: Array<any> = formtCityList[letter]
        const Height = 36 + list.length * 50
        return Height
    }
    // 根据索引跳转到对应高度
    goToIndex = (index: Number) => {
        this.listRef.current.scrollToRow(index)
        // this.listRef.current.scrollToRow(Index)
    }
    // 渲染右侧索引列表
    renderCityIndex() {
        return this.state.writeList.map((item, index) => (
            <li
                className="city-index-item"
                key={item}
                onClick={() => this.goToIndex(index)}
            >
                <span
                    className={
                        this.state.currentIndex === index ? 'index-active' : ''
                    }
                >
                    {item === 'hot' ? '热' : item.toUpperCase()}
                </span>
            </li>
        ))
    }
    rowsRendered = ({ startIndex }: any) => {
        if (this.state.currentIndex !== startIndex) {
            this.setState({
                currentIndex: startIndex
            })
        }
    }
    render() {
        return (
            <div className="cityList">
                {/* <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.push('/index/index')}
                >城市选择</NavBar> */}
                {/* 坑----组件首字母需要大写 */}
                <NavHeader>城市选择</NavHeader>
                {/* 城市列表 */}
                <AutoSizer>
                    {({ width, height }) => (
                        <List
                            ref={this.listRef}
                            width={width}
                            height={height}
                            rowCount={this.state.writeList.length}
                            rowHeight={this.caculateHeight}
                            rowRenderer={this.rowRenderer}
                            onRowsRendered={this.rowsRendered}
                            scrollToAlignment="start"
                        />
                    )}
                </AutoSizer>
                <ul className="city-index">{this.renderCityIndex()}</ul>
            </div>
        )
    }
}
