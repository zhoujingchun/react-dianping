import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.css'

class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value: ''
        }
    }
    render() {
        return (
            <input
                className="search-input"
                type="text"
                placeholder="请输入关键字"
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                onKeyUp={this.enterKeyUp.bind(this)}
            />
        )
    }
    componentDidMount(){
        this.setState({
            value:this.props.value||'',

        })
    }
    onChange(e){
        this.setState({
            value:e.target.value
        })
    }
    enterKeyUp(e){

        if(e.keyCode!==13){
            return ;
        }
        this.props.enterHander(e.target.value)

    }



}

export default SearchInput