import React from 'react'
import './index.css'
interface IProps {
}
  interface IState {
}
const win: any = window

export default class Map extends React.Component<IProps,IState> {
    constructor(props: any) {
        super(props)
        // this.state= {

        // }
    }
    componentDidMount() {
        // 获取当前坐标
        navigator.geolocation.getCurrentPosition(position => {
            let latitude = position.coords.latitude
            let longitude = position.coords.longitude
            let ggPoint = new win.BMap.Point(longitude,latitude)
            console.log(ggPoint)
        })
        let map = new win.BMap.Map("container")
        let point = new win.BMap.Point(116.404, 39.915)
        map.centerAndZoom(point, 15)
    }
    render() {
        return (
            <div id="container"></div> 
        )
    }
}