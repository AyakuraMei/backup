import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Card } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import { loginPost, registerPost } from '../../redux/actions/loginAction'
import { connect } from 'react-redux'
// import axios from 'axios'
// import PubSub from 'pubsub-js'
// import { USERINFO } from '../pubsub'
import './index.css'

class Login extends Component {

    // username 和 password 是用来记录当前发送的用户名和密码
    state = {
        hasRegister: null,
        description: '',
        username: '',
        password: '',
    }

    /* res 格式
                response.data:
                {
                    'Description': 描述出错的原因,
                    'status': 是否进行跳转,
                }
    */
    sendMessage = () => {
        const { Username: { state: { value: user } } } = this
        const { Password: { state: { value: pw } } } = this
        this.setState({ username: user, password: pw }, () => { })
        // todo: 在后端写入 /login 发送的 request 请求处理
        // axios.post('http://localhost:8000/login/',
        //     {
        //         username: this.state.user,
        //         password: this.state.password,
        //         isRegister: 0,
        //     }
        // ).then((response) => {
        //     // 收到 res 后确定是否注册，如果已经注册，那么跳转到home
        //     // 使用 pubsub 更新数据
        //     this.setState({ description: response['Description'] }, () => { })
        //     if (response.data['status'] === 1) {
        //         PubSub.publish('ayakuramei', { username: this.state.username, password: this.state.password })
        //         this.props.history.push('/home')
        //     } else {
        //         window.alert('Register a user.')
        //     }
        //     // 否则跳出提醒用户注册
        // }).catch((error) => {
        //     console.log(error)
        // })
        this.props.loginUser(user, pw)
        console.log('1')
    }

    sendRegisterMessage = () => {
        const { Username: { state: { value: user } } } = this
        const { Password: { state: { value: pw } } } = this
        // 使用 callback function 及时刷新 state 的内容
        // this.setState({ username: user, password: pw }, () => axios.post('http://localhost:8000/login/',
        //     {
        //         username: this.state.username,
        //         password: this.state.password,
        //         isRegister: 1,
        //     }
        // ).then((response) => {
        //     // 收到注册信息后，查看是否存在，如果存在那么进行提示
        //     this.setState({ description: response.data['Description'] }, () => { })
        //     console.log(response)
        //     if (response.data['status'] === 1) {
        //         this.token = PubSub.publish(USERINFO, { username: this.state.username, password: this.state.password })
        //         console.log(this.state)
        //         this.props.history.push('/home/')
        //     }
        //     // 如果不存在则进行注册后，那么跳转到 home 界面
        //     // 如果成功那么就统一 user 信息
        // }).catch((error) => {
        //     console.log('posted', error)
        // }))
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

// 没有这玩意会报错
function mapDispatchToProps(dispatch){
    return {
        loginUser: loginPost,
        registerUser: registerPost,
    }
}

export default connect((state) => ({
    login: state.login,
}), mapDispatchToProps)(Login)