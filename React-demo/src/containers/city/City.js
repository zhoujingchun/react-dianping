import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  history from '../../History/history'

import Header from '../../conponents/City/Header/CityHeader'
import CurrentCity from '../../conponents/City/CurrentCity/CurrentCity'
import CityList from '../../conponents/City/CityList/CityList'


import * as userInfoActionsFromOtherFile from '../../actions/userinfo'

import { CITYNAME } from '../../config/localStoreKey'
import localStore from '../../localStore/localStore'

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Header title="选择城市"/>
                  <CurrentCity cityName={this.props.userinfo.cityName}/>
                  <CityList changeCity={this.ChangeCity.bind(this)}/>


            </div>
        )
    }
    ChangeCity(newCity){

      if(newCity==null){
          return
      }
      let {userinfo}=this.props;
      userinfo.cityName=newCity;
      this.props.userInfoActions.update(userinfo)
        //修改cookie
       localStore.setItem(CITYNAME,newCity);
       window.history.back()

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
)(City)