import React from 'react';
import ReactDOM from 'react-dom';

import {Provider}  from 'react-redux'
import configureStore from './store/configureStore'
import history from './History/history'
//import RouterMap from './router/Router'


import {Router  , Route, } from 'react-router-dom';

import App from './App';
import Home from './containers/home/Home'
import City from './containers/city/City'
import User from './containers/user/User'
import Search from './containers/search/Search'
import Detail from './containers/detail/Detial'
import Login from './containers/login/login'
import Store from './containers/store/store'


import './static/css/common.css'
import './static/css/font.css'



//创建Redux store 对象
const  store=configureStore();



ReactDOM.render(  <Provider  store={store} >
     <Router  history={history} >
        <App>
            <Route  exact={true} path="/" component={Home}/>

            <Route path='/city' component={City}/>
            <Route path='/User'  exact={true} component={User}/>
            <Route path='/User/:store'  exact={true}  component={Store}/>
            <Route path='/Login'  exact={true} component={Login}/>
            <Route path='/Login/:router' component={Login}/>
            <Route path='/search/:type/:keyword'  component={Search}/>
           <Route path='/search/:type' exact={true} component={Search}/>

            <Route path='/detail/:id' exact={true}  component={Detail}/>

         </App>
     </Router>
    </Provider>, document.getElementById('root'));

//<Route path='/search/:type(/:keyword)' component={Search}/>