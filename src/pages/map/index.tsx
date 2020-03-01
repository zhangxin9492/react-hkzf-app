import React from 'react'
import './index.css'
import styles from './index.module.css'
import NavHeader from '../../components/navHeader/index'
import { getCurrentCity } from '../../utils/utils'
import { fetch } from '../../utils/fetch'
interface IProps {}
interface IState {
    map: any
    isShowHouseList: boolean
    houseList: Array<any>
}
const win: any = window
export default class Map extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            map: null,
            isShowHouseList: false,
            houseList: []
        }
    }
    componentDidMount() {
        this.initRenderMap()
    }
    // 初始化地图数据
    async initRenderMap() {
        const curCity: any = await getCurrentCity()
        let map = new win.BMap.Map('container')
        // 移动地图关闭
        map.addEventListener('movestart', () => {
            this.setState({
                isShowHouseList: false
            })
        })
        this.setState({
            map: map
        })
        let myGeo = new win.BMap.Geocoder()
        myGeo.getPoint(
            curCity.label,
            async (point: any) => {
                if (point) {
                    map.centerAndZoom(point, 11)
                    map.addControl(new win.BMap.ScaleControl())
                    map.addControl(new win.BMap.NavigationControl())
                    this.renderOverLaysById(curCity.value)
                }
            },
            curCity.label
        )
    }
    // 获取所有房源数据
    // async getHousesList(id: string|number) {
    //     let res = await axios.get('http://localhost:8080/area/map',{params:{id: id}})
    // }
    // 获取当前缩放等级
    getCurrentZoom() {
        const curZoom = this.state.map.getZoom()
        let nextZoom, type
        if (curZoom === 11) {
            nextZoom = 13
            type = 'cicle'
        } else if (curZoom == 13) {
            nextZoom = 15
            type = 'cicle'
        } else {
            type = 'rect'
        }
        return { nextZoom, type }
    }
    // 根据id获取数据
    async renderOverLaysById(id: number | string) {
        let res = await fetch.get('/area/map', {
            params: { id: id }
        })
        let getHousesList: Array<any> = res.data.body
        // 便利房源数据
        const { nextZoom, type } = this.getCurrentZoom()
        getHousesList.forEach(item => {
            if (type === 'cicle') {
                this.createOverLays(item, nextZoom)
            } else if (type === 'rect') {
                this.createPlotOverflaw(item)
            }
        })
    }
    // 创建覆盖物
    createOverLays(item: any, nextZoom: any) {
        // 转换坐标
        let {
            coord: { latitude, longitude },
            value
        } = item
        let point = new win.BMap.Point(longitude, latitude)
        let opts = {
            position: point // 指定文本标注所在的地理位置
            //offset   : new win.BMap.Size(30, -30)    //设置文本偏移量
        }
        var label = new win.BMap.Label('', opts)
        label.setContent(`
         <div class="${styles.bubble}">
             <p class="${styles.name}">${item.label}</p>
             <p>${item.count}套</p>
         </div>
         `)
        label.setStyle({
            cursor: 'pointer',
            border: '0px solid rgb(255, 0, 0)',
            padding: '0px',
            whiteSpace: 'nowrap',
            fontSize: '12px',
            color: 'rgb(255, 255, 255)',
            textAlign: 'center'
        })
        //  label事件处理函数
        label.addEventListener('click', () => {
            console.log(1)
            this.renderOverLaysById(value)
            // 清除之前的覆盖物
            this.state.map.clearOverlays()
            this.state.map.centerAndZoom(point, nextZoom)
        })
        this.state.map.addOverlay(label)
    }
    // 创建小区覆盖物逻辑单独逻辑
    createPlotOverflaw(item: any) {
        // 转换坐标
        let {
            coord: { latitude, longitude },
            value
        } = item
        let point = new win.BMap.Point(longitude, latitude)
        let opts = {
            position: point // 指定文本标注所在的地理位置
            //offset   : new win.BMap.Size(30, -30)    //设置文本偏移量
        }
        var label = new win.BMap.Label('', opts)
        label.setContent(`
            <div class="${styles.bubble}">
                <p class="${styles.name}">${item.label}</p>
                <p>${item.count}套</p>
            </div>
        `)
        label.setStyle({
            cursor: 'pointer',
            border: '0px solid rgb(255, 0, 0)',
            padding: '0px',
            whiteSpace: 'nowrap',
            fontSize: '12px',
            color: 'rgb(255, 255, 255)',
            textAlign: 'center'
        })
        //  label事件处理函数
        label.addEventListener('click', (e: any) => {
            // 被点击小区的 x 和 y
            const { clientX, clientY } = e.changedTouches[0]
            const x = window.innerWidth / 2 - clientX
            const y = (window.innerHeight - 330 + 45) / 2 - clientY

            //
            this.state.map.panBy(x, y)
            this.getHouseList(value)
        })
        this.state.map.addOverlay(label)
    }
    async getHouseList(id: number) {
        let res: any = await fetch.get('/houses', {
            params: { cityId: id }
        })
        if (res.data.body.list && res.data.body.list.length > 0) {
            this.setState({
                houseList: res.data.body.list,
                isShowHouseList: true
            })
        }
    }
    // 渲染小区数据列表
    renderHouseList() {
        return this.state.houseList.map(item => (
            <div className={styles.house} key={item.houseCode}>
                <div className={styles.imgWrap}>
                    <img
                        className={styles.img}
                        src={`http://localhost:8080${item.houseImg}`}
                        alt=""
                    />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <div className={styles.desc}>{item.desc}</div>
                    <div>
                        {item.tags.map((tag: any, index: any) => {
                            const tagClass = `tag${index > 2 ? '3' : index + 1}` // tag1 or tag2 or tag3
                            return (
                                <span
                                    key={index}
                                    className={[
                                        styles.tag,
                                        styles[tagClass]
                                    ].join(' ')}
                                >
                                    {tag}
                                </span>
                            )
                        })}
                    </div>
                    <div className={styles.price}>
                        <span className={styles.priceNum}>{item.price}</span>{' '}
                        元/月
                    </div>
                </div>
            </div>
        ))
    }
    render() {
        return (
            <div className="map">
                <NavHeader>地图选房</NavHeader>
                <div id="container"></div>
                <div
                    className={`${styles.houseList} ${
                        this.state.isShowHouseList ? styles.show : ''
                    }`}
                >
                    <div className={styles.titleWrap}>
                        <h1 className={styles.listTitle}>房屋列表</h1>
                        <a className={styles.titleMore} href="/house/list">
                            更多房源
                        </a>
                    </div>
                    <div className={styles.houseItems}>
                        {this.renderHouseList()}
                    </div>
                </div>
            </div>
        )
    }
}
