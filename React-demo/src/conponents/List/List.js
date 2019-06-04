import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './Item/Item'
import './style.css'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
       let {data}=this.props;
      /* if(data.data){
           data=data.data;
           console.log(data)
       }*/

       return (
            <div className="list-container">
                {
                    data.map((item,index)=>{
                        return  <Item  key={index} data={item}/>
                    })
                }
            </div>
        )
    }
}

export default List