import { CREATE_LOGIN_POST, CREATE_REGISTER_POST } from '../constants'
import axios from 'axios'
import store from '../store'
import { push } from 'react-router-redux'

export const loginPost = (username, password) => {
    return () => {
        axios.post('http://localhost:8000/login/',
            {
                username: username,
                password: password,
                isRegister: 0,
            }).catch((error) => {
                console.log(error)
            }).then((response) => {
                // 发送到 reducer 中
                if(response.data.status === true){
                    console.log(response)
                    store.dispatch({
                        type: CREATE_REGISTER_POST, response: response, username: username, password: password,
                    })
                    store.dispatch(push('/home'))
                    // 强制刷新
                    // SPA不知道如何重新render页面
                    window.location.reload()
                }
            })
    }
}

export const registerPost = (username, password) => {
    return () => {
        axios.post('http://localhost:8000/login/',
            {
                username: username,
                password: password,
                isRegister: 1,
            }).catch((error) => {
                console.log(error)
            }).then((response) => {
                // console.log(response)
                // 发送到 reducer 中
                console.log(response)
                if(response.data.status === true){
                    console.log(response)
                    store.dispatch({
                        type: CREATE_REGISTER_POST, response: response, username: username, password: password,
                    })
                    store.dispatch(push('/home'))
                    // 强制刷新
                    // SPA不知道如何刷新页面
                    window.location.reload()
                }
            })
    }
}