import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import   history from '../../../History/history'

import * as storeActionsFromFile from '../../../actions/store'
import * as orderActionsFromFile from '../../../actions/order'

import BuyStore from '../../../conponents/BuyAndStore/BuyAndStore'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore: false,
            isOrder:false
        }
    }

    render() {

        return (
              <div>
                 <BuyStore buyHandle={this.buyHandle.bind(this)}
                           storeHandle={this.storeHandle.bind(this)}
                           isStore={this.state.isStore}/>
              </div>

        )
    }
    componentDidMount() {
   //sessionStorage.removeItem('user')
        // 验证当前商户是否收藏
      //  console.log(this.props);
        this.cheackStoreState()

    }

    // 检验当前商户是否被收藏

    cheackStoreState(){
        const  {store,data,id}=this.props;
        store.some(item=>{
            if(item.data.id===id){
                  this.setState({
                      isStore: true,
                      isOrder:true
                  });
                return  ;
            }

        })
    }

    // 检查登录状态
        checkLoogin(){
        const {userinfo,id}=this.props;

        if(!JSON.parse(sessionStorage.getItem('user'))){

            alert('你还没有登陆，请先登陆');
            history.push('/login/'+id);

            return false
        }
        return true
    }

    // 购买事件
    buyHandle(){
        //检查是否登陆   如果未登录 return
       const checkLogin=this.checkLoogin();
       if(!checkLogin){
           return
       }
       alert('加入订单成功');

        const {data}=this.props;

        var a=JSON.parse(sessionStorage.getItem('user'));

        a.data.unshift(data);
        sessionStorage.setItem('user',JSON.stringify(a));
        history.push('/user')
    }

    // 此过程为模拟购买，因此可省去复杂的购买过程
    // 跳转到用户主页

    // 收藏事件
    storeHandle(){
        //检查是否登陆   如果未登录 return;

        const checkLogin=this.checkLoogin();
        if (!checkLogin) {
            return
        }
        const {data,storeActions}=this.props;


        //如果已经收藏了，则取消收藏， 如果没有收藏，则收藏
        if(this.state.isStore){
            storeActions.remove({data:data})

        }else{
            storeActions.add({data: data})

        }

        this.setState({
            isStore:!this.state.isStore
        })


    }


}

function mapStateToProps(state) {

    return {
        userinfo: state.userinfo,
        store: state.store,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch),
        orderActions: bindActionCreators(orderActionsFromFile, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)