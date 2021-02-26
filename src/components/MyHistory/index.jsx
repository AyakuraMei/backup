import React, { Component } from 'react'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';

export default class MyHistory extends Component {
    state = {
        username: this.props.username,
        password: this.props.password,
        // Data: { filename：string, img: image, comment: Comment, isCovid: false }
        // 接受发回来的数据包
        listData: [{ filename: 'string', img: 'image', comment: 'Comment', isCovid: 'No', date: '20xx-xx-xx' }],
    }

    componentDidMount(){
        axios.post('/MyHistory', {
            username: this.props.username,
            password: this.props.password,
        }).then((response) => {
            // 获取 response 中返回的数组，赋值给 listData
        }).then((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={this.state.listData}
                    renderItem={item => (
                        <List.Item
                            key={item.filename}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={item.img}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.isCovid}
                            />
                            {item.comment}
                            <br/>
                            <br/>
                            <p className="checkdate" style={{fontSize: 'small'}}>{'Check Date:' + item.date}</p>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}
