import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import axios from 'axios'
import  FirstComponet  from '../../../conponents/ListComponent/componentList'
import  LoadMore  from '../../../conponents/LoadMore/LoadMore'




class Comment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[],
            hasMore:false,
            isLoadingMore:false,
            page:0
        }
    }
    render() {
        return (
            <div>
                <h2 className="home-list-title">商品评论</h2>
                {
                    this.state.data.length
                        ? <FirstComponet data={this.state.data}/>
                        : <div>{/* 加载中... */}</div>
                }
                {
                    this.state.hasMore?<LoadMore   hasMore={this.state.hasMore}    isLoadingMore={this.state.isLoadingMore}   LoadMoreData={this.LoadMoreData.bind(this)} />
                        :<span style={{'color':'#666'}}>已经加载全部</span>
                }

            </div>
        )
    }
    componentDidMount() {
        this.LoadFirstPageData()
    }

    // 获取首页数据
    LoadFirstPageData(){
        let {id}=this.props;
        //获取猜你喜欢数据
        //axios 实现异步回调 并更新数据
        const {page}=this.state;
        this.resultHandle(page,id)
    }
    LoadMoreData(){

        if(this.state.hasMore){
            this.setState({
                isLoadingMore: true

            });
            let {id}=this.props;
            //获取猜你喜欢数据
            //axios 实现异步回调 并更新数据
            let {page}=this.state;
            page=page+1;

            this.resultHandle(page,id);
            this.setState({
                page:page,
                isLoadingMore:false

            });
        }


    }


    //数据处理
    resultHandle(page,id){
        axios.get('http://127.0.0.1:3000/api/detail/comment/'+page+'/'+id)
            .then(res=>
                {
                    return  res.data
                }
            )
            .then(data=>{


                this.setState({
                    data:  this.state.data.concat(data.data),
                    hasMore: data.hasMore
                })

            }).catch(err=>{
            console.log(err)
        })

    }

}

export default Comment