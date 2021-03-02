import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Card } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import axios from 'axios'
import PubSub from 'pubsub-js'
import { USERINFO } from '../pubsub'
import './index.css'

export default class Login extends Component {

    sendMessage = () => {
        const { Username: { state: { value: user } } } = this
        const { Password: { state: { value: pw } } } = this
        this.setState({ username: user, password: pw })
        // todo: 在后端写入 /login 发送的 request 请求处理
        axios.post('/login',
            {
                username: this.state.user,
                password: this.state.password,
                isRegister: 0,
            }
        ).then((response) => {
            // 收到 res 后确定是否注册，如果已经注册，那么跳转到home，使用 this.state.description 来提示用户
            // 使用 pubsub, 如果返回的是 200
            this.token = PubSub.publish(USERINFO, { username: this.state.user, password: this.state.password })
            // 跳转
            this.props.history.push('/home')
            // 否则跳出提醒用户注册
            this.state.description = 'Register A User'
        }).then((error) => {
            console.log(error)
        })
    }

    sendRegisterMessage = () => {
        const { Username: { state: { value: user } } } = this
        const { Password: { state: { value: pw } } } = this
        // 使用 callback function 及时刷新 state 的内容
        this.setState({ username: user, password: pw }, () => axios.post('http://localhost:8000/login/',
        {
            username: this.state.username,
            password: this.state.password,
            isRegister: 1,
        }
    ).then((response) => {
        console.log(response)
        // 收到注册信息后，查看是否存在，如果存在那么进行提示
        this.state.description = "User already exist."
        // 如果不存在则进行注册后，那么跳转到 home 界面
        // 如果成功那么就统一 user 信息
        this.token = PubSub.publish(USERINFO, { username: this.state.user, password: this.state.password })
        this.props.history.push('/home/')
    }).then((error) => {
            console.log('posted', error)
    }))
    }

    // username 和 password 是用来记录当前发送的用户名和密码
    state = {
        hasRegister: null,
        description: '',
        username: '',
        password: '',
    }


    render() {
        const { Meta } = Card
        return (
            <div className="page-login" >
                <Card className="LoginPadding">
                    <Input ref={c => { this.Username = c }} className="username" size="middle" placeholder="username" prefix={<UserOutlined />}></Input>
                    <Input ref={c => this.Password = c} className="password" size="middle" placeholder="password" type="password" prefix={<KeyOutlined />}></Input>
                    <Button className="Login" value="Login" onClick={this.sendMessage} size="middle">Login </Button>
                    <Button className="Register" value="Register" onClick={this.sendRegisterMessage} size="middle">Register</Button>
                    <Meta className="Meta" description={this.state.description}></Meta>
                </Card>
            </div>
        )
    }
}