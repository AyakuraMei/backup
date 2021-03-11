import React, { Component } from 'react'
import { Upload, message, Card } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import axios from 'axios'
import { connect } from 'react-redux'
import store from '../../redux/store'

export class Detect extends Component {
    state = {
        isCovid: '',
        uploadedInfo: '',
    }

    // componentDidMount(){
    //     // this.token = PubSub.subscribe('ayakuramei', (_, data) => {
    //         this.setState({username: data.username, password: data.password})
    //     })
    // }

    // componentWillUnmount(){
    //     PubSub.unsubscribe(this.token)
    // }

    render() {
        const { Dragger } = Upload
        const uploadProps = {
            name: '',
            multiple: false,
            // 根据 username 来确定上传的地址
            action: "http://localhost:8000/home/Detect/",
            accept: "image/png, image/jpeg",
            onChange(info) {
                const { status } = info.file
                // 根据不同的上传状态确定信息
                if (status !== 'uploading') {
                    console.log(info.file)
                }
                // 这里根据 response 内容显示（ hover 在上传的物件，会有相关的 response ）
                if (status === 'done') {
                    message.success(`File uploaded successfully.`)
                }
                if (status === 'error') {
                    message.error(`File upload failed.`)
                }
            }
        }

        return (
            <div>
                <Dragger {...uploadProps}
                    data={file => ({
                        username: this.props.user,
                        password: this.props.pw,
                        photo: file,
                    })}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or Drag.</p>
                    <p className="ant-upload-hint">Support for a single upload.</p>
                </Dragger>
                {/* <div className="site-card-border-less-wrapper">
                    <Card title="Result">
                        <p>is Covid:{this.state.isCovid}</p>
                    </Card>
                </div> */}
                <p>{this.props.user} - {this.props.pw}</p>
            </div>
        )
    }
}

export default connect((state) => ({
    user: state.login.username,
    pw: state.login.password,
}))(Detect)