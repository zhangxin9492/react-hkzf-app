import React from 'react'
// 导入 withRouter 高阶组件, 可以进行路由导航
import { withRouter } from 'react-router-dom'
import { NavBar,Icon } from 'antd-mobile'
interface IProps {
    history: any,
    // children: String
}
const NavHeader: React.SFC<IProps> = ({children,history}) => {
    return (
        <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.go(-1)}
        >{children}</NavBar>
    )
}
export default withRouter(NavHeader)