import axios from 'axios'
const win: any = window
// 获取当前城市定位
const getCurrentCity = () => {
    let curCity = getCity()
    // 本地存储无数据
    if (!curCity) {
        return new Promise(resolve => {
            let myCity = new win.BMap.LocalCity()
            myCity.get(async (result: any) => {
                let cityName = result.name
                let res = await axios.get('http://localhost:8080/area/info', {
                    params: { name: cityName }
                })
                localStorage.setItem('curCity', JSON.stringify(res.data.body))
                const { label, value } = res.data.body
                resolve({ label, value })
                setCity({ label, value })
            })
        })
    } else {
        // 当有数据的时候
        return Promise.resolve(curCity)
    }
}
const getCity = () => {
    if (localStorage.getItem('curCity')) {
        return JSON.parse(localStorage.getItem('curCity') || '')
    } else {
        return ''
    }
}
const setCity = (curCity: Object) => {
    localStorage.setItem('curCity', JSON.stringify(curCity))
}
// 判断机型是否是iphonex及其以上
function isMoreIPhonex() {
    var isp = /iphone/gi.test(win.navigator.userAgent),
        dpr = win.devicePixelRatio,
        dpi = win.devicePixelRatio,
        w = win.screen.width,
        h = win.screen.height
    // iPhone X、iPhone XS, 11pro
    var isIPhoneX = isp && dpr && dpi === 3 && w === 375 && h === 812
    // iPhone XS Max 11 max
    var isIPhoneXSMax = isp && dpr && dpi === 3 && w === 414 && h === 896
    // iPhone XR 11
    var isIPhoneXR = isp && dpr && dpi === 2 && w === 414 && h === 896

    if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
        return true
    } else {
        return false
    }
}
// 判断设备是ios 和andrid 或者 pc
const judgeClient = () => {
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //判断是否是 android终端
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //判断是否是 iOS终端
    console.log('是否是Android：' + isAndroid) //true,false
    console.log('是否是iOS：' + isIOS)
    if (isAndroid) {
        return 'Android'
    } else if (isIOS) {
        return 'IOS'
    } else {
        return 'PC'
    }
}
// 设置登录token
const setTokn = (val: string) => {
    localStorage.setItem('token', val)
}
const getToken = () => {
    return localStorage.getItem('token')
}
const removeToken = () => {
    localStorage.getItem('token') && localStorage.removeItem('token')
}
export {
    getCurrentCity,
    getCity,
    setCity,
    setTokn,
    getToken,
    removeToken,
    isMoreIPhonex,
    judgeClient
}
