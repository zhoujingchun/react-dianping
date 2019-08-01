本次项目是用 react 开发仿大众点评 ：包括 用户登陆，城市选择，点评，购买，收藏，页面的跳转。
首先说下React : 优点：1.React速度很快，2.跨游览器兼容，3一切都是component，4单向数据流，
                      5.同构，纯粹的javascript 6，兼容性好

                 缺点：React是目标是UI组件，通常可以和其它框架组合使用，
                 目前并不适合单独做一个完整的框架。React 即使配上 redux 的组合，
                 也不能称之一个完整的框架，比如你想用Promise化的AJAX？对不起没有，
                 自己找现成的库去。而且第三方组件远远不如Angular多。
                 目前在大的稳定的项目上采用React的，我也就只知道有Yahoo的Email。
                 React本身只是一个V而已，所以如果是大型项目想要一套完整的框架的话，
                 也许还需要引入Redux和route相关的东西。而Angular在这方面提供的东西比React多多了.
                    ---------------------


    本次项目所用到的组件： react-router-dom  react-addons-pure-render-mixin
    connect,bindActionCreators   re'a
    这个地方有个坑 在React-router 3.0 以下版本跟3.0以上版本的用法有很大区别，3.0以上的引入一个React-touter-dom
    就可以了，没有了hashHistory，其中就不一一叙述。
    还有一个是 history  在3.0以后的版本中给个一个history 组件，
    import { createBrowserHistory } from 'history';
    const history=createBrowserHistory( {forceRefresh: false},);
    export default history
    这里也有个坑  官方给的方法是
       history.push('xxxx’)
       history.go();
       但每次路径跳转的时候都会刷新页面，这就违背了react SPA 原理了，
       所以我查了网上的方法，和博客，
       解决的方法是在index.js配置路由时 引用的是Router 而不是 Router as BrowserRouter,
       下面给出 路由的配置
       然后去掉 history.go（）这一步



ReactDOM.render(  <Provider  store={store} >
     <Router  history={history} >
        <App>
            <Route  exact={true} path="/" component={Home}/>

             <Route path='/city' component={City}/>
            <Route path='/User'  exact={true} component={User}/>
            <Route path='/User/:store'  exact={true}  component={Store}/>
            <Route path='/Login'  exact={true} component={Login}/>
            <Route path='/Login/:router' component={Login}/>
            <Route path='/search/:type/:keyword'  component={Search}/>
           <Route path='/search/:type' exact={true} component={Search}/>

            <Route path='/detail/:id' exact={true}  component={Detail}/>

         </App>
     </Router>
    </Provider>, document.getElementById('root'));

    总结到这里要说一下Redux的方法使用

    https://www.cnblogs.com/bax-life/p/8440326.html  //我通过这篇文章了解了redux
  1.store:
   首先要创建一个对象store，这个对象有各种方法，用来让外界获取Redux的数据（store.getState），
   或者让外界来修改Redux中的数据（store.dispatch）

   import { createStore } from 'redux'
  import rootReducer from '../reducers'

  export default function configureStore() {

      const store = createStore(rootReducer);
      return store
  }

 2. Action:配置自己的方法，列如在收藏 我们定义了以下方法
  const actionTypes={   STORE_UPDATE :'STORE_UPDATE',
                         STORE_ADD : 'STORE_ADD',
                         STORE_RM :'STORE_RM'};

  export function update(data) {
      return {
          type:actionTypes.STORE_UPDATE,
          data
      }

  }
  export function add(data) {
      return {
          type:actionTypes.STORE_ADD,
          data
      }
  }
 export function remove(data) {
     data =data.data.id;
     return {
          type:actionTypes.STORE_RM,
          data
      }
  }

 3.reducer
 4.connect
 当然我要结合使用Redux 与react 还要在react 组件中引入
 import { connect } from 'react-redux';
 //connect 作用：连接React组件与 Redux store。

  首先connect之所以会成功，是因为Provider组件：

  在原应用组件上包裹一层，使原来整个应用成为Provider的子组件
  接收Redux的store作为props，通过context对象传递给子孙组件上的connect

  那connect做了些什么呢？
  它真正连接 Redux 和 React，它包在我们的容器组件的外一层，它接收上面 Provider 提供的 store 里面的 state
  和 dispatch，传给一个构造函数，connect返回一个对象，以属性形式传给我们的容器组件。
   Connect 有四个参数：我在这介绍他的常用的两个
  function mapStateToProps(state) {
     return {

         a:state.a
          将state.a里面的数据提供给props,可以在this.props.a获得到a的数据

      }
  }

  function mapDispatchToProps(dispatch) {

      return {
          userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
          //将actio里面方法订阅，这是一个发布订阅模式，我们可以在this.props.userInfoActions调用这个
          //方法，
          bindActionCreators：是一个中间件，目的是不让它的子元素知道Redux的存在

      }
  }

  import PureRenderMixin from 'react-addons-pure-render-mixin'; 作用是优化组件的性能

  现在基本的配置已经介绍完毕，接下来说下组件。
   这里我用到了智能组件，和木偶组件这个概念
   智能组件：通过方法接受到后台的数据，和与用户交互的方法
   木偶组件：只负责接受数据和方法，是个静态的组件

1.开发首页    ./contains/home
   首页我用了四个组件

      <HomeHeader cityName={this.props.userinfo.cityName}/>
      <Category/>
      <Ad/>
      <List  cityName={cityName}/>

      1.<HomeHeader cityName={this.props.userinfo.cityName}/>
        城市按钮，搜索框，用户按钮
      2.  <Category/>
        import ReactSwipe from 'react-swipe' //React 引入轮播图插件
        const opt = {
                    auto: 2500,
                    callback: function (index) {
                        // 更新当前轮播图的index
                        this.setState({index: index});
                    }.bind(this)
                };
        <ReactSwipe  swipeOptions={opt}>
         里面用三个div包住li ，opt是参数
         轮播图就是三个div
       </ReactSwipe>

       3. <Ad/>
          Ad里面的数据是从后台获取的，获取到数据传到 中，这里我们用到axios
           <HomeAd>是木偶组件，我们把数据传给它

          <HomeAd  data={this.state.data}/>:<div>{'加载中'}</div>

        4. <List  cityName={cityName}/>
         这个组件有点复杂，因为涉及到一个懒加载
         首先 定义
         this.state = {
              data:[],  //用来存放从后台的数据
              hasMore:false,  //后台获取的hasMore 用来告诉是否还有要加载的页面
              isLoadingMore:false,  //是否加载更多，如果  isLoadingMore haeMore组件就会显示加载全部
              page:0,
                             }
              首先定义一个 resultHandle的方法 用的axios获取后台数据
             后台的接口使用koa2 写的，这里就不多说
              resultHandle(cityName,page)
                  {
                   axios.get('http://127.0.0.1:3000/api/homelist/'+cityName+'/'+page)
                          .then(res=>
                              {
                                return  res.data
                              }
                          )
                          .then(data=>{
                               //console.log(data)
                                 this.setState({
                                  data:  this.state.data.concat(data.data),  //把后来的数据加到一起
                                  hasMore: data.hasM })
                        }).catch(err=>{
                          console.log(err)
                      })

                  }
                  当页面compoentDidmount时候
                  调用 LoadFirstPageData(){
                            let {cityName}=this.props;
                            //获取猜你喜欢数据
                            //axios 实现异步回调 并更新数据
                            const {page}=this.state;
                            this.resultHandle(cityName,page)
                        }
                        通过这个函数，设置了state，所以在首页的数据传给<FirstComponet data={this.state.data}
                        就可以配置首页的画面；
                        同理 我在定义一个加载下一页数据的方法，然后传到<LoadMore/> 组件中，

        LoadMoreData(){
         //先判断hasMore
               if(this.state.hasMore){
                   this.setState({
                       isLoadingMore: true

                   });
                   let {cityName}=this.props;
                   //获取猜你喜欢数据
                   //axios 实现异步回调 并更新数据
                   let {page}=this.state;
                   page=page+1;

                   this.resultHandle(cityName,page);
                   //传完一次 isLoadingMore在设置为false
                   this.setState({
                       page:page,
                       isLoadingMore:false
                   });
               } }
               在LoadMore 我通过window.onscroll事件来触发  LoadMoreData

         <LoadMore/>  组件
        在这里用到节流，让每次滚动，函数指触发一次
        getBoundingClientRect() 这个api 获得元素离视窗距离
        let callback=function(){
            //getBoundingClientRect().top  调用api 获得元素离视窗距离
            const top=wrap.getBoundingClientRect().top;
            const windowHeight = window.screen.height;
            if (top < windowHeight) {
                // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
               LoadMoreData()
            }

        };

        window.addEventListener('scroll',()=>{
             if(isLoadingMore){
                    return
            }
            if(timeoutId){
                    clearTimeout(timeoutId)
                }
                timeoutId=setTimeout(callback,50)

            })
            }

2../containers/city  介绍完开发首页，开始介绍开发城市页


      它由三个组件构成
         <Header title="选择城市"/>
         <Header/>   //这个是共用的组件，这就是react模块化开发的优点,我只需要传值就可
         <CurrentCity cityName={this.props.userinfo.cityName}/>

         <CityList changeCity={this.ChangeCity.bind(this)}/>

3.开发搜索页  ./containers/search
    <SearchHeader/>
    //获得关键字，和key 传到SearchList中
   <SearchList keyword={params.keyword} type={params.type}/>
    //因为搜索页需要很多的接口来匹配关键字，所以我只做了一个页面，无论搜索什么都会出现
    一样的结果
    searchList 与LoadMore 实现的方法基本是一样的，唯一不同的是把state里面的数据设成一个
    全局变量 搜索时只要在 生命周期的commentDidUpdate这个方法中更新，因为组件已经加载完成了


      3.开发详情页  ./containers/detail
     首先在  ./conponent/List/Item 配置路由
     <Link to={
                   {   pathname:"/detail/"+data.id,  //路径
                             state:{data:data}       //要传递的参数  this.props.location.state.data;
                    }  }>                             //参数都在location里面
                      </Link>

                        <Header  title="商户详情" />  //又一次用到<Header/>
                        <Info   data={data}   id={id}/>
                        <Buy  id={id} data={data} />
                        <Comment  id={id}/>

     <Info /> 和<Comment/>  //与前面的组件实现的方法相同，Comment还是引入了List这个木偶组件
     只是从后台拿到的数据不同，布局不同而已.

     <Buy > 组件:
      这个组件包含两个按钮 购买和收藏：
      收藏：当组件componentDidMount（）先检查是否登陆，然后检查该商品是否已经被收藏，如果已经被收藏，点击后
      按钮变为已收藏，这里我是用Redux储存的，
       if(this.state.isStore){
                  storeActions.remove({data:data}) //若已经收藏，则取消收藏

              }else{
                  storeActions.add({data: data}) //反之收藏

              }

              this.setState({
                  isStore:!this.state.isStore
              })   //每次都改变收藏的状态，以此来判断按钮的状态显示

         购买：购买事件与收藏无太大差别，只是我用的sessionStore存储的，
         这里要提一下 cookie localStore sessionStore的区别
         cookie：客户端数据，但没有自己的包装方法，需要自己手动封装
         localStore：本地储存，它是永久的，除非自己手动清除
         sessionStore：它的数据会在客户端页面关闭后清除


          const {data}=this.props;

                 var a=JSON.parse(sessionStorage.getItem('user'));

                 a.data.unshift(data);
                 sessionStorage.setItem('user',JSON.stringify(a));
                 history.push('/user')
             }

 4.开发用户页  ./containers/user

               <Header title="用户主页" />
               <Userinfo username={username} city={userinfo.cityName}  />
               <OrderList  />

           <Header /> 头部组件与其他一样都是传入一个title=‘’
            <Userinfo /> 获取数据，然后传入，逻辑很简单
             const userinfo = this.props.userinfo;  //redux 存储
             const username=   JSON.parse(sessionStorage.getItem('user')).username;  //sessionStore存储


             <OrderList  />  订单组件


               const order= JSON.parse(sessionStorage.getItem('user'));//获取订单数据
              <h2>您的订单</h2>
                             {
                                 order.data.length //判断是否有订单 如果有则显示订单信息，反之：显示<h2>您还没有订单</h2>
                                     ? <OrderListComponent data={order.data} />
                                     : <h2>您还没有订单</h2>
                             }

    <OrderListComponent data={order.data} />
    这是一个木偶组件，接受data后遍历，然后传给Item组件显示
     {data.map((item, index)
     => {
       return    <Item key={index} data={item} />
                    })}
          <Item> 订单评论页面
          评价有三个状态
          this.state = {
                      commentState: 2,  // commentState  0-未评价 1-评价中 2-已评价
                      stars: {}
                  }

           //data里面都有一个commentState
          componentDidMount() {
                  // 将状态维护到 state 中
                  //每个加入data中 commentState都是0

                  this.setState({
                      commentState: this.props.data.commentState
                  });}

          当点击评价按钮时，将commentState更新为1；同时显示评论框
           showComment() {
                  // 显示输入框
                  this.setState({
                      commentState: 1
                  })
              }

           下面给出评论框的部分代码
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
           点击取消按钮时，将commentState设置为0，隐藏评论框；

        提交评论

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
        这里我们把评论提交给了后台，由于评论是统一应用相同的，所以当我们提交完评论后，所对应的商品不会显示

       这里主要的组件已经介绍完毕，还有一点就是我后台写的端口是3000， 而react是3001这就涉及到跨域
       因为我后台用Koa2写的，所以解决方法是
       const cors = require('koa2-cors');
       app.use(cors());
       关于koa2我是通过网上的博客，是论坛学习的，koa2可以说是新一代的node.js
       解决了很多复杂的回调，await.next()
       还有路由，解析字符串都比express简单



