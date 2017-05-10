
import QzGrid from './QzGrid'

import React from 'react'
export default class extends QzGrid{
  /*  propTypes: {
        listenState:React.PropTypes.string.isRequired
        }*/
    componentDidMount(){
        super.componentDidMount();
        var self = this;
        this.listener = Rebus.addStateListener([this.props.listenState],function(){
            $('#' + this.tableId).jqGrid('reload');
        })
    }
    componentWillUnmount(){
        if(this.listener){
            Rebus.removeStateListener([this.props.listenState],this.listener);
            this.listener = null;
        }
    }
    render(){
        return super.render();
    }
}