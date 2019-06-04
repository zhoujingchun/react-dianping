import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchHeader from '../../conponents/SearchHeader/searchHeader'
import SearchList from "./subpage/searchList";

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {

         const params=this.props.match.params;
        return (
            <div>
                <SearchHeader/>
                 <SearchList keyword={params.keyword} type={params.type}/>
            </div>

        )
    }
}

export default Search