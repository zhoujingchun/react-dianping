const MongoControl = require('./databasecontrol').MongoControl;
const list = new MongoControl('list','list');
const comment = new MongoControl('list','comment');
//const moment = require('moment');
list.insert({
    hasMore:true ,
    page:0,
    img: 'https://ps.ssl.qhimg.com/sdmt/176_135_100/t01d6d9c2dc1719b0cf.jpg',
    title: '汉堡大大',
    subTitle: '叫我汉堡大大，还你多彩口味',
    price: '28',
    distance: '120m',
    mumber: '389',
    star: 4,
    desc: '营业时间 11:00 - 21:00 <br> 电话订购 11:00 - 19:00 <br> 网络订购 11:00 - 19:00',


},()=>{});
list.insert({
    hasMore:true ,
    page:0,
    img: 'https://ps.ssl.qhimg.com/sdmt/187_135_100/t01836538e655fb040b.jpg',
    title: '北京开源饭店',
    subTitle: '[望京]自助晚餐',
    price: '98',
    distance: '140m',
    mumber: '689',
    star:3,
    desc: '营业时间 11:00 - 21:00 <br> 电话订购 11:00 - 19:00 <br> 网络订购 11:00 - 19:00',


},()=>{});

list.insert({
    hasMore:true ,
    page:0,
    img: 'https://ps.ssl.qhimg.com/sdmt/132_132_100/t01bde11c6943fb433c.webp',
    title: '帅气的西服',
    subTitle: '[望京]自助晚餐',
    price: '1980',
    distance: '160',
    mumber: '106',
    star:4,
    desc: '营业时间 11:00 - 21:00 <br> 电话订购 11:00 - 19:00 <br> 网络订购 11:00 - 19:00',


},()=>{});




/*  list 表  4个page
* List={
     hasMore:true ,
     img:   ,
     title:   ,
     subTitle:  ,
      price:   ,
       distance:    ,
       mumber: '389',
       star: 4,
       desc: '营业时间 11:00 - 21:00 <br> 电话订购 11:00 - 19:00 <br> 网络订购 11:00 - 19:00'
       page:0
}
*

detail={
查找 list  根据list里面的数据来 获得详情页
详情页  包含
{      subTitle,
       price,
       star,
       desc,
       img,
       title

}

 //获取评论页   comment
     comment={
     fid=  list 下的id  ,
     hsaMore:  ',
     username:    ,

}






*
*
* */

/* page.insert(
 {
    sort : 'JS',
    title : 'JS写起来真舒服',
      author : '罗得知',
     date : moment().format('YYYY-MM-DD HH-mm-ss'),
      content : 'JS是世界上最好的语言，什么python，简直是抄js的。。。',
      intro : "这是我写的第一篇文章，说js有多好"
 },
 ()=>{}
)*/
/*
comment.insert({
    fid : '5bfa21f0c103192390456be9',
    content : '要不是看你长得帅，写这些东西谁看?',
    author : 'skipper@handsome.com',
    date : moment().format('YYYY-MM-DD HH-mm-ss')
},()=>{})*/
