import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
const { Header, Content, Sider } = Layout

@withRouter
class Admin extends Component {
    go = ({ item, key, path, domEvent }) => {
        this.props.history.push(key)
    }
    render() {
        return (
            <Layout>
                <Header className="header">
                    <div style={{ color: 'white' }}>Header</div>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu mode='inline' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
                            <Menu.Item key="/home/Detect" onClick={this.go}>Detect</Menu.Item>
                            <Menu.Item key="/home/MyHistory" onClick={this.go}>My History</Menu.Item>
                            <Menu.Item key="/home/UserInfo" onClick={this.go}>User</Menu.Item>
                            <Menu.Item key="/home/About" onClick={this.go}>About</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight:280}}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default Admin
