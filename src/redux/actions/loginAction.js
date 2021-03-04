import { CREATE_LOGIN_POST, CREATE_REGISTER_POST } from '../constants'
import axios from 'axios'
import store from '../store'

export const loginPost = (username, password) => {
    axios.post('http://localhost:8000/login/',
        {
            username: username,
            password: password,
            isRegister: 0,
        }).catch((error) => {
            console.log(error)
        }).then((response) => {
            console.log(response)
            store.dispatch({
                type: CREATE_LOGIN_POST, data: response.data,
            })
        })
}

export const registerPost = (username, password) => {
    axios.post('http://localhost:8000/login/',
        {
            username: username,
            password: password,
            isRegister: 1,
        }).catch((error) => {
            console.log(error)
        }).then((response) => {
            store.dispatch({
                type: CREATE_REGISTER_POST, data: response.data,
            })
        })
}