import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link}  from 'react-router-dom';
import axios from 'axios'



import Star from '../../Start/Start'

import './style.css'

class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            commentState: 2,  // commentState  0-未评价 1-评价中 2-已评价
            stars: {}
        }
    }

    render() {
        const data = this.props.data;
        const id=data.id

        return (
            <div className="order-item-container">


                <div className="clear-fix">
                    <div className="order-item-img float-left">
                        <img src={data.img}/>
                    </div>
                    <div className="order-item-comment float-right">
                        {  //commentState 分为三个状态  commentState: 0  未评价
                            //1 评价中   2 已评价  我们可以用一个三元不等式来写出这个式子
                              this.state.commentState===0?
                               <button className="btn" onClick={this.showComment.bind(this)}> 评价 </button>:
                                   this.state.commentState===1?
                                       //评价中
                                 ""
                            // 已经评价
                            : <button className="btn unseleted-btn">已评价</button>


                        }
                    </div>
                    <div className="order-item-content">
                        <span>商户：{data.title}</span>
                        <span>数量：{1}</span>
                        <span>价格：￥{data.price}</span>
                    </div>
                </div>
                {
                    // “评价中”才会显示输入框
                    this.state.commentState === 1
                        ? <div className="comment-text-container">
                            <textarea style={{width: '100%', height: '80px'}} className="comment-text" ref="commentText"></textarea>
                            <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                                <Star star="0" clickCallback={this.starClickCallback.bind(this)}/>
                            </div>
                            <button className="btn"   onClick={this.submitComment.bind(this)}>提交</button>
                            &nbsp;
                            <button className="btn unseleted-btn" onClick={this.hideComment.bind(this)}>取消</button>
                        </div>
                        : ''
                }

            </div>
        )
    }
    componentDidMount() {
        // 将状态维护到 state 中

        this.setState({
            commentState: this.props.data.commentState
        });

       /* const {id}=this.props.data;
        console.log(id);
        let alldata= JSON.parse(sessionStorage.getItem('user'));
        alldata.data.forEach((item,index)=>{
            console.log(item.id)
            if(item.id===id){

                item.commentState=0
                console.log(index)
            }

        });
        sessionStorage.setItem('user',JSON.stringify(alldata))*/


    }
    showComment() {
        // 显示输入框
        this.setState({
            commentState: 1
        })
    }
    submitComment() {
        // 获取操作函数
       // const submitComment = this.props.submitComment
        // 获取id
        const id = this.props.data.id;
        // 获取 star 数量
        const stars = this.state.stars;
        const star = stars[id] || '0';
        // 获取评价内容
        const commentText = this.refs.commentText;
        const value = commentText.value.trim();
        if (!value) {
            return
        }

        // 执行数据提交
       axios.post('http://127.0.0.1:3000/api/submitComment',
           {   id:id,
               star:star,
               comment:value,
               img:this.props.data.img
           })
           .then(res=>{
               console.log(res)
               return res.data
           }).catch(err=>{
               console.log(err)
       });
        this.commentOk()


}

    commentOk() {
        // 已经评价，修改状态
        this.setState({
            commentState: 2
        });
        // 根据id修改  更改sesionStore 里面的   commentState
       const {id}=this.props.data;
       
        let alldata= JSON.parse(sessionStorage.getItem('user'));
        alldata.data.forEach((item,index)=>{

            if(item.id===id){

                item.commentState=2
                console.log(index)
            }

        });
        console.log(alldata)
      sessionStorage.setItem('user',JSON.stringify(alldata))


    }
    hideComment() {
        // 隐藏输入框
        this.setState({
            commentState: 0
        })
    }
    starClickCallback(star) {
        let stars = this.state.stars
        const id = this.props.data.id
        stars[id] = star


        this.setState({
            stars: stars
        })

    }
}

export default Item