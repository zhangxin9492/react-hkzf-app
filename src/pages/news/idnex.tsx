import React from 'react'
const win: any = window
export default class News extends React.Component {
    goToUrl() {
        win.location.href = 'http://localhost:8081/#/home'
    }
    render() {
        return (
            <div onClick={() => {this.goToUrl()}}>
                跳转页面
            </div>
        )
    }
}