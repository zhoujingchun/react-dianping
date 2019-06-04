// 按照官方示例

const Koa = require('koa');
// 注意 require('koa-router') 返回的是函数:
const router = require('koa-router')();
const app = new Koa();
const cors = require('koa2-cors');
//const text=require('./test');
const  bodyParser=require('koa-bodyparser')

app.use(cors());
app.use(bodyParser())


// 添加路由


// 首页 —— 广告（超值特惠）
const homeAd=require('./home/ad');

router.get('/api/homead', (ctx, next) => {
    ctx.response.body =homeAd
});



// 首页 —— 推荐列表（猜你喜欢）

var homeListData1 = require('./home/list.js');  //page 1
var homeListData2 = require('./home/list2.js');  //page 2
var homeListData3 = require('./home/list3.js');  //page 3
var homeListData4 = require('./home/list4.js');  //page 4





router.get('/api/homelist/:city/:page', async (ctx, next) => {


    const params = ctx.params;
    const paramsCity = params.city;
     let paramsPage = params.page;

     console.log('当前城市：' + paramsCity);
    console.log('当前页数：' + paramsPage);
    if(paramsPage==0){
        ctx.body=homeListData1
    }else if(paramsPage==1){
        ctx.body=homeListData2
    }else if(paramsPage==2){
        ctx.body=homeListData3
    }else{
        ctx.body=homeListData4
    }

});


// 详情页 - 商户信息


const detailInfo = require('./detail/info.js');
router.get('/api/detail/info/:id',async (ctx,next)=> {
    console.log('详情页 - 商户信息');
    const params = ctx.params;
    const id = params.id;
    console.log('商户id: ' + id);

    ctx.body=detailInfo


});


//search
// 搜索结果页 - 搜索结果 - 三个参数
var searchListData = require('./search/list.js')
router.get('/api/search/:page/:city/:category/:keyword', async(ctx, next) =>{
    console.log('搜索结果页 - 搜索结果')

    // 参数
    const params = ctx.params;
    const paramsPage = params.page;
    const paramsCity = params.city;
    const paramsCategory = params.category;
    const paramsKeyword = params.keyword;

    console.log('当前页数：' + paramsPage);
    console.log('当前城市：' + paramsCity);
    console.log('当前类别：' + paramsCategory);
    console.log('关键字：' + paramsKeyword);

    ctx.body = searchListData
});
// 搜索结果页 - 搜索结果 - 两个参数
router.get('/api/search/:page/:city/:category', async(ctx,next)=>{
    console.log('搜索结果页 - 搜索结果');

    // 参数
    const params = ctx.params;
    const paramsPage = params.page;
    const paramsCity = params.city;
    const paramsCategory = params.category;

    console.log('当前页数：' + paramsPage);
    console.log('当前城市：' + paramsCity);
    console.log('当前类别：' + paramsCategory);

    ctx.body = searchListData
});




// 详情页 - 用户评论
const detailComment = require('./detail/comment.js');
router.get('/api/detail/comment/:page/:id',async (ctx,next)=> {
    console.log('详情页 - 用户点评');

    const params = ctx.params;
    const page = params.page;
    const id = params.id;

    console.log('商户id: ' + id);
    console.log('当前页数: ' + page);

    ctx.body = detailComment
});

router.post('/api/submitComment', async(ctx,next) =>{
    console.log('提交评论');
    console.log(ctx.request.body); //成功获取评论的类容

    // 获取参数

    ctx.body = {
        errno: 0,
        msg: 'ok'
    }
});



// 调用路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, ()=>{
    console.log('server is running at http://localhost:3000')
});