import React, { Component } from 'react'
import '../../App'
import { secondRoutes } from '../../Router'
import { Route, Redirect } from 'react-router-dom'
// import PubSub from 'pubsub-js'
// import { USERINFO } from '../pubsub'
import Admin from '../Admin'
import { connect } from 'react-redux'
import store from '../../redux/store'

// second routes
export class Home extends Component {
  state = {
    username: '',
    password: '',
  }

  // 组件加载的时候就接受从 login 接受到的 user 信息
  // componentDidMount() {
  //   console.log('subscribe')
  //   this.token = PubSub.subscribe('ayakuramei', (_, data) => {
  //     console.log(data)
  //     this.setState(data, () => { })
  //   })
  // }

  // componentWillUnmount() {
  //   PubSub.unsubscribe(this.token)
  // }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Admin>
          {
            secondRoutes.map((item) => {
              {/* 使用 props 形式将 user 信息传送到每个子组件 */ }
              return <Route key={item.path} path={item.path} component={item.component}></Route>
            })
          }
          <Redirect from="/home" to="/home/Detect" exact></Redirect>
        </Admin>
      </div>
    );
  }
}

export default connect((state) => ({
  status: { user: state.login.username, pw: state.login.password }
}))(Home)