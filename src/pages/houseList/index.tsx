import React from 'react'
import './index.css'
import SearchHeader from '../../components/searchHeader/index'
import { getCurrentCity } from '../../utils/utils'
import Filter from './filter/filter'
import { fetch } from '../../utils/fetch'
import styles from './index.module.css'
interface IProps {
    history: any
}
interface IState {
    cityName: String
    cityValue: String
    houseList: Array<any>
    count: Number | String
}

export default class List extends React.Component<IProps, IState> {
    state = {
        cityName: '上海',
        cityValue: '',
        houseList: [{desc:'',houseCode:'',houseImg:'',price:'',tags:[],title:''}],
        count: 0
    }
    async componentDidMount() {
        // 获取当前城市定位
        const curCity: any = await getCurrentCity()
        this.setState({
            cityName: curCity.label,
            cityValue: curCity.value
        })
        this.getHousedList({})
    }
    getHousedList = async (state:any) => {
        console.log(state)
        const {areaValue=[],modeValue=[],priceValue=[]} = state
        let params = {
            cityId: this.state.cityValue,
            area: areaValue.join('|') || '',
            rentType: modeValue.join('|'),
            price: priceValue.join('|'),
            start: 1,
            end: 20
        }
        let res = await fetch.get('/houses',{params})
        const {list,count} = res.data.body
        this.setState({
            houseList: list,
            count
        })
    }
    renderHosueLsit() {
        return this.state.houseList.map(item=> (
            <div className={styles.house} key={item.houseCode} onClick={() => this.props.history.push('/detail')}>
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
            <div className="houseList">
                <div className="my-icon-back">
                    <i className="iconfont icon-back"></i>
                </div>
                <SearchHeader cityName={this.state.cityName}></SearchHeader>
                <Filter getHousedList={this.getHousedList}></Filter>
                <div className={styles.houseItems}>
                    {this.renderHosueLsit()}
                </div>
            </div>
        )
    }
}
