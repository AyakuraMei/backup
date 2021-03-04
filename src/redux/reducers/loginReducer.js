import { CREATE_LOGIN_POST, CREATE_REGISTER_POST } from '../constants'

const initialState = {
    hasRegister: 0,
    description: '',
    username: '',
    password: '',
}

export default function loginReducer(state = initialState, action) {
    const { type, data } = action
    switch (type) {
        case CREATE_LOGIN_POST:
            return {
                ...state, items: data,
            }
        case CREATE_REGISTER_POST:
            return {
                ...state, items: data,
            }
        default:
            return state
    }
}