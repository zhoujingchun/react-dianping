import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import OrderListComponent  from '../../../conponents/OrderList/orderLisr'

//import OrderListComponent from '../../../components/OrderList'

//import './style.css'

class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }
    render() {
        const order= JSON.parse(sessionStorage.getItem('user'));
        return (
            <div className="order-list-container">
                <h2>您的订单</h2>
                {
                    order.data.length
                        ? <OrderListComponent data={order.data} />
                        : <h2>您还没有订单</h2>
                }

            </div>
        )
    }



}

export default OrderList