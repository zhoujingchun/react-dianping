import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'; //性能优越  简介https://www.cnblogs.com/xzqyun/p/9
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userInfoActionsFromOtherFile from './actions/userinfo'

import LocalStore from './localStore/localStore';
import { CITYNAME } from './config/localStoreKey'

class App extends Component {
    constructor(props,contex){
        super(props,contex);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            initDone: false
        }


    }
    render() {
        return (
            <div>

                {this.state.initDone   //根据状态判断是否显示
                        ? this.props.children
                        : <div>正在加载...</div>
                }
            </div>
        )
    }


    componentDidMount() {
        // 获取位置信息


        let cityName=LocalStore.getItem(CITYNAME );
        if(cityName==null){
            cityName='哈尔滨'
        }
        //把城市 更新到 update 方法中
        this.props.userInfoActions.update({
            cityName:cityName
        });
        //更改状态
        this.setState({
            initDone:true
        })
    }



}


function mapStateToProps(state) {

    return {
    }
}

function mapDispatchToProps(dispatch) {

    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
