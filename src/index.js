import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './components/About'
import reportWebVitals from './reportWebVitals';
import { routes } from './Router'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {
          routes.map((item) => {
            return <Route key={item.path} path={item.path} component={item.component}></Route>
          })
        }
        {/* 默认跳转到 /home */}
        <Redirect from="/" to="/login"></Redirect>
        {/* 都匹配不上就跳转到 /404 */}
        <Redirect to="/404"></Redirect>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
