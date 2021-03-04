import { createStore, applyMiddleware , combineReducers, compose} from 'redux'
import thunk from 'redux-thunk'
import loginReducer from '../redux/reducers/loginReducer'

const rootReducer = combineReducers({
    login: loginReducer,
})

const middleware = [thunk]

const initialState = {}

export default createStore(
    rootReducer, initialState ,compose(
        applyMiddleware(...middleware),
        // 调试
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
)
