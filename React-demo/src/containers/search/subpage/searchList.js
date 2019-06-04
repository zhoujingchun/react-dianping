import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import axios from 'axios'
import  FirstComponet  from '../../../conponents/List/List'
import  LoadMore  from '../../../conponents/LoadMore/LoadMore'
import {connect}  from 'react-redux'

const initialState = {
    data: [],
    hasMore: false,
    isLoadingMore: false,
    page: 0
};

class searchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = initialState;

    }
    render() {
        return (
            <div>

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
        const cityName = this.props.userinfo.cityName;
        //获取猜你喜欢数据
        //axios 实现异步回调 并更新数据
        const {page}=this.state;
        //获取type keyord
        const {keyword,type}=this.props;
        this.resultHandle(cityName,page,type,keyword)
    }
    LoadMoreData(){

        if(this.state.hasMore){
            this.setState({
                isLoadingMore: true

            });
            const cityName = this.props.userinfo.cityName;
            //获取猜你喜欢数据
            //axios 实现异步回调 并更新数据
            let {page}=this.state;
            page=page+1;

            const {keyword,type}=this.props;
            this.resultHandle(cityName,page,type,keyword);
            this.setState({
                page:page,
                isLoadingMore:false

            });
        }


    }


    componentDidUpdate(prevProps, prevState){

         const {type,keyword}=this.props;
         if(type===prevProps.type&&keyword===prevProps.keyword){
            return;
        }
        this.setState(initialState);
        this.LoadFirstPageData()


    }

    //数据处理
    resultHandle(cityName,page,type,keyword){
        axios.get('http://127.0.0.1:3000/api/search/'+page+'/'+cityName+'/'+type+'/'+keyword)
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

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(searchList)