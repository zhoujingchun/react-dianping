import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import history from '../../History/history'

import Header from '../../conponents/City/Header/CityHeader'
import Userinfo from '../../conponents/Userinfo/userinfo'
import OrderList from './subpage/OrderList'

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const userinfo = this.props.userinfo;
        const username=   JSON.parse(sessionStorage.getItem('user')).username;




        return (
            <div>
                <Header title="用户主页" />
                <Userinfo username={username} city={userinfo.cityName}  />
                <OrderList  />




            </div>
        )
    }

    componentDidMount() {
        // 如果未登录，跳转到登录页面
        const username= JSON.parse(sessionStorage.getItem('user')).username


        if (!username) {
          history.push('/Login')
            
        }

    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {

    return {
        userinfo: state.userinfo,
        store:state.state,
        order:state.order
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)