import React, { Component } from 'react'
import { Upload, message, Card } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import axios from 'axios'

export default class Detect extends Component {
    state = {
        username: this.props.username,
        password: this.props.password,
        isCovid: '',
        uploadedInfo: '',
    }

    render() {
        const { Dragger } = Upload
        const uploadProps = {
            name: '',
            multiple: false,
            // 根据 username 来确定上传的地址
            action: "/home/Detect",
            accept: "image/png, image/jpeg",
            data: {
                // 存储在特定文件夹的时候需要用到，通过 request 获得
                username: this.state.username,
                password: this.state.password,
            },
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
                <Dragger {...uploadProps}>
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
            </div>
        )
    }
}
