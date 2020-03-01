import React from 'react'
import {
    Route,
    Redirect,
    withRouter,
    RouteComponentProps
} from 'react-router-dom'

// ------- 坑 ------
// import {BrowserRouter as Route} from "react-router-dom" 只有在app.tsx中可以这么引入
// ------- 坑 ------

// import { withRouter, RouteComponentProps } from 'react-router-dom'
import { getToken } from '../../utils/utils'
interface IProps extends RouteComponentProps {
    component: any
    path: string
}
const AuthRoute: React.SFC<IProps> = props => {
    const { component: Components, ...rest } = props
    return (
        <Route
            {...rest}
            render={(props: any) => {
                if (getToken()) {
                    return <Components {...props}></Components>
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location }
                            }}
                        ></Redirect>
                    )
                }
            }}
        ></Route>
    )
}
export default withRouter(AuthRoute)
