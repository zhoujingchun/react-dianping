import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import axios from 'axios'
import DetailInfo from '../../../conponents/DetailInfo/DetailInfo'



class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            info: false
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.info?<DetailInfo data={this.state.info} />:''
                }

            </div>
        )
    }
    componentDidMount(){
              this.setState({
                     info:this.props.data
                 })



    }


}

export default Info