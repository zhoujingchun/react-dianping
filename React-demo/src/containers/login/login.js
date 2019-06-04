import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import history from '../../History/history'

import Header from '../../conponents/City/Header/CityHeader'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import LoginComponent from "../../conponents/Login/Login";

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            checking: true
        }

    }

    render() {


        return (

            <div>
                <Header title="登录"/>
                {
                    this.state.checking?'':<LoginComponent  loginHandle={this.loginHandle.bind(this)} />
                }

            </div>
        )
    }

    componentDidMount() {
        // 如果未登录，跳转到登录页面

        this.doCheck()

    }
    doCheck() {
        //
       // const userinfo = this.props.userinfo;
       const username=sessionStorage.getItem('user')

        if (username) {
           history.push('user');

        } else {
            //未登录
            this.setState({
                checking: false
            })
        }
    }
//处理登录之后的事情
    loginHandle(username) {
        // 保存用户名
        let {userinfo}=this.props;
        //用户页面信息
        const user={
            username:username,
             data:[]

         };

        sessionStorage.setItem('user',JSON.stringify(user));

        const router=this.props;
        //console.log(router)

              history.push('/user');
    }






}
// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)