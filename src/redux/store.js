import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import loginReducer from '../redux/reducers/loginReducer'
import { routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const rootReducer = combineReducers({
    login: loginReducer,
})

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconiler: autoMergeLevel2, 
}

const myPersistReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk, routerMiddleware(createBrowserHistory())]

const initialState = {}

const store = createStore(
    myPersistReducer, initialState, compose(
        applyMiddleware(...middleware),
        // 调试
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
)

export const persistor = persistStore(store)
export default store
