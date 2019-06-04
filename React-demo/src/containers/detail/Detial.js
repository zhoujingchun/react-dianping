import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../conponents/City/Header/CityHeader'
import Info from    './subpage/info';
import DetailInfo from '../../conponents/DetailInfo/DetailInfo';
import Comment from './subpage/comment';
import Buy  from './subpage/buy'


class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
         /*
         打印出 this.props.match
          isExact: true
          params: {id: "7102284330127231"}
          path: "/detail/:id"
          url: "/detail/7102284330127231"
        */
         const id=this.props.match.params.id;//获得Id




      // 通过Link  传值 获取 每个图片的数据
        let data=this.props.location.state.data;




        return (
            <div>
                 <Header  title="商户详情" />
                  <Info   data={data}   id={id}/>
                  <Buy  id={id} data={data} />
                  <Comment  id={id}/>

            </div>

        )
    }
}

export default Detail