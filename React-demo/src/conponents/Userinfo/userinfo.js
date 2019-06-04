import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link}  from 'react-router-dom'

import './style.css'

class UserInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div >
                <div className="userinfo-container">
                <p>
                    <i className="icon-user"></i>
                    &nbsp;

                    &nbsp;
                    <span>{this.props.username}</span>
                </p>
                <p>
                    <i className="icon-map-marker"></i>
                    &nbsp;

                    &nbsp;
                    <span>{this.props.city}</span>
                </p>
                </div>

                <div  className='userinfo-list'>
                  <ul >

                   <Link to='/User/store'>     <li> <i className="icon-star"  style={{color: 'red',fontSize :'20px'}}></i>我的收藏</li>

                   </Link>
                    <li> <i className="icon-key" style={{color: 'red',fontSize :'20px'}}></i>我的评价</li>

                  </ul>
                 </div>


            </div>
        )
    }
}

export default UserInfo