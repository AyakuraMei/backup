import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { routes } from '../../Router'
import { connect } from 'react-redux'

export default class Auth extends Component {
    render() {
        // 获取用户输入的地址
        const pathname = this.props.location.pathname
        // 查看是否在路由中
        const targetRouter = routes.find((item) => {
            return item.path === pathname
        })
        // 检查登录状态
        const isLogin = JSON.parse(sessionStorage.getItem("loginStatus"))


        // 如果是访问 / 地址，则返回登录页面
        // 如果访问的地址不在一级路由中，则返回 404 页面
        if (pathname === "/") return <Redirect to="/login"></Redirect>
        if (!targetRouter) return <Redirect to="/404"></Redirect>

        // 已登录
        if (isLogin) {
            // 如果想要访问 login 界面，那么就回到 home 主页
            if (pathname === "/login") {
                return <Redirect to="/home"></Redirect>
            } else {
                // 否则返回一个 404 页面
                return <Redirect to="/404"></Redirect>
            }
        // 如果没有登录
        } else {
            // 如果输入的地址为 home 404，但是没有登录，那么弹出警告后重新定位
            if (targetRouter.auth) {
                alert('请先登录')
                return <Redirect exact to="/login"></Redirect>
            } else {
                // 正常返回
                return <Route exact={pathname} component={targetRouter.component}></Route>
            }
        }
    }
}