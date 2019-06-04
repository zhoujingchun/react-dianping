import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import HomeHeader from   '../../conponents/HomeHead/homeHead'
import Category from   '../../conponents/Category/Category'
import Ad from './subpage/Ad'
import List from './subpage/List'


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const {cityName}=this.props.userinfo;

        return (

            <div>
            <HomeHeader cityName={this.props.userinfo.cityName}/>
                 <Category/>
                <div style={{height: '15px'}}>{/* 分割线 */}</div>
                <Ad/>
                 <List  cityName={cityName}/>
            </div>
        )
    }
}
function mapStateToProps(state) {

   return {
       userinfo:state.userinfo
   }

}
function mapDispatchToProps(dispatch) {
    return{

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Home)