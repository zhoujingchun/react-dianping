import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import history from '../../History/history'
import Header from '../../conponents/City/Header/CityHeader';
import  FirstComponet  from '../../conponents/List/List'

class Store extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const data=this.props.store;

        var data1=[];

     // 提取data
        data.forEach(item=>{
            data1.push(item.data)
        });


        return (
            <div>
            <Header title="我的收藏" backRouter="/User"/>

           {
            data.length
                ? <FirstComponet data={data1} />
                : <div>你还没有收藏哦</div>
           }
         </div>

        )
    }
}

function mapStateToProps(state) {

    return {
        store: state.store,

    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Store)
