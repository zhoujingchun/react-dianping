import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeAd from '../../../conponents/HomeAd/HomeAd'

import axios from 'axios';

class Ad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: []
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.data.length?
                       <HomeAd  data={this.state.data}/>:<div>{'加载中'}</div>

                }
            </div>
        )
    }
    componentDidMount(){
        axios.get('http://127.0.0.1:3000/api/homead').then(res=>{
            return  res.data
        }).then(data=>{
            if(data.length)
            {
                this.setState({
                    data: data
                });
               
            }

        }).catch(err=>{
            console.log(err)
        })


    }




}

export default Ad