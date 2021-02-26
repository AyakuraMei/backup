import Home from '../components/Home'
import NotFound from '../components/NotFound'
import Detect from '../components/Detect'
import MyHistory from '../components/MyHistory'
import User from '../components/User'
import About from '../components/About'
import Login from '../components/Login'
import Auth from '../components/Auth'
import App from '../App'


export const routes = [
    {
        path: '/login',
        component: Login,
        auth: false,
    }
    ,
    {
        path: '/home',
        component: Home,
        auth: true,
    },
    {
        path: '/404',
        component: NotFound,
        auth: true,
    },
]

export const secondRoutes = [
    {
        path: '/home/Detect',
        component: Detect,
    },
    {
        path: '/home/MyHistory',
        component: MyHistory,
    },
    {
        path: '/home/UserInfo',
        component: User,
    },
    {
        path: '/home/About',
        component: About,
    },
]