import axios from 'axios'
const win:any = window
const getCurrentCity = () => {
    let curCity = getCity()
    // 本地存储无数据
    if (!curCity) {
        return new Promise(resolve => {
            let myCity = new win.BMap.LocalCity()
            myCity.get(async (result:any) => {
                let cityName = result.name
                let res = await axios.get('http://localhost:8080/area/info',{params:{name: cityName}})            
                localStorage.setItem('curCity',JSON.stringify(res.data.body))
                const { label, value } = res.data.body
                resolve({label, value })
                setCity({label, value})
            })
        })       
    } else {
        // 当有数据的时候
        return Promise.resolve(curCity)
    }
    
}
const getCity = () => {
    if(localStorage.getItem('curCity')) {
        return JSON.parse(localStorage.getItem('curCity') || '')
    } else {
        return ''
    }
}
const setCity = (curCity:Object) => {
    localStorage.setItem('curCity',JSON.stringify(curCity))
}
export {getCurrentCity, getCity, setCity}