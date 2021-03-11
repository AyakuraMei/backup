import { CREATE_LOGIN_POST, CREATE_REGISTER_POST } from '../constants'

const initialState = {
    hasRegister: null,
    description: 'Not Register ？',
    username: '',
    password: '',
    response: 1,
}

export default function loginReducer(preState = initialState, action) {
    const { type, response, username, password } = action
    // todo: 更新状态的问题
    switch (type) {
        case CREATE_LOGIN_POST:
            console.log('reducer', username, password)
            return {
                ...preState, username: username, password: password, response: response, 
                description: response.data.Description,
            }
        case CREATE_REGISTER_POST:
            return {
                ...preState, username: username, password: password, response: response, 
                description: response.data.Description,
            }
        default:
            return preState
    }
}