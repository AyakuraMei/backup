import React, { Component } from 'react'
import {Card} from 'antd'
import axios from 'axios'
import PubSub from 'pubsub-js'
import { connect } from 'react-redux'
import store from '../../redux/store'

export class User extends Component {
    state = {
        accuracy: '',
        uploadedImage: 0,
    }
    // todo: 加到查询中
    // componentDidMount(){
    //     axios.post('/User', {
    //         username: this.props.username, password: this.props.pw,
    //     }).then((response) => {
    //         // 返回一个obj，需要 parse 后获取 accuracy 和 已经上传的图像
    //     }).then((error) => {
    //         alert(error)
    //     })
    // }

    render() {
        return (
            <div>
                <Card style={{width: '100%'}} title='Username'>
                    <p>Uploaded Image:  {this.state.uploadedImage}</p>
                    <p>Accuracy:  {this.state.accuracy}</p>
                </Card>
            </div>
        )
    }
}

export default connect((state) => ({
    user: store.login.user,
    pw: store.login.pw,
}))(User)