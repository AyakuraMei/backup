import React, { Component } from 'react'
import {Card} from 'antd'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class User extends Component {
    state = {
        username: this.props.username,
        password: this.props.password,
        accuracy: '',
        uploadedImage: 0,
    }

    componentDidMount(){
        axios.post('/User', {
            username: this.state.username, password: this.state.password,
        }).then((response) => {
            // 返回一个obj，需要 parse 后获取 accuracy 和 已经上传的图像
        }).then((error) => {
            alert(error)
        })
    }

    render() {
        return (
            <div>
                <Card style={{width: '100%'}} title='Username'>
                    <p>uploaded Image:  {this.state.uploadedImage}</p>
                    <p>Accuracy:  {this.state.accuracy}</p>
                </Card>
            </div>
        )
    }
}
