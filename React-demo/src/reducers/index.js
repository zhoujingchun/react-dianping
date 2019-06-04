import {combineReducers} from 'redux';

import  userinfo  from './userinfo';
import  store      from './store'
import order from './order'

export  default  combineReducers({
    userinfo,
    store,
    order
})


