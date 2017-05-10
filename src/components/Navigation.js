/**
 * Created by zwf on 17-3-22.
 */

var React = require('react');
var ReactDOM = require('react-dom');
import {Link,browserHistory} from 'react-router';

export default class extends React.Component {
    constructor(props) {
        super(props)
    }

    handleSkip(location){
        browserHistory.push('/'+location)
    }

    render() {
        var navigaStyle = {
            height:window.innerHeight-52,
            position:'fixed',
            left:0,
            top:52,
            overflow:'auto'
        }
        return(
            <div id="sidebar-nav" style={navigaStyle}>
                <ul id="dashboard-menu">
                    <li style={{marginLeft:'-10px'}}>
                        <a onTouchTap={this.handleSkip.bind(this,'home')}>
                            <i className="icon-home"></i>
                            <span>商店名称</span>
                        </a>
                    </li>
                    <li style={{marginLeft:'-10px'}}>
                        <a onTouchTap={this.handleSkip.bind(this,'shopPet')}>
                            <i className="icon-home"></i>
                            <span>商店宠物</span>
                        </a>
                    </li>
                    <li style={{marginLeft:'-10px'}}>
                        <a onTouchTap={this.handleSkip.bind(this,'OrderList')}>
                            <i className="icon-home"></i>
                            <span>订单信息</span>
                        </a>
                    </li>
                    <li style={{marginLeft:'-10px'}}>
                        <a onTouchTap={this.handleSkip.bind(this,'RequestPet')}>
                            <i className="icon-home"></i>
                            <span>求购信息</span>
                        </a>
                    </li>
                    <li style={{marginLeft:'-10px'}}>
                        <a onTouchTap={this.handleSkip.bind(this,'UserAdvice')}>
                            <i className="icon-home"></i>
                            <span>用户反馈</span>
                        </a>
                    </li>
                    <li style={{marginLeft:'-10px'}}>
                        <a onTouchTap={this.handleSkip.bind(this,'kindList')}>
                            <i className="icon-home"></i>
                            <span>种类列表</span>
                        </a>
                    </li>
                    <li style={{marginLeft:'-10px'}}>
                        <a onTouchTap={this.handleSkip.bind(this,'userList')}>
                            <i className="icon-home"></i>
                            <span>用户列表</span>
                        </a>
                    </li>
                    <li>
                        <a >
                            <i className="icon-home"></i>
                            <span></span>
                        </a>
                    </li>
                    <li>
                        <a >
                            <i className="icon-home"></i>
                            <span></span>
                        </a>
                    </li>
                    <li>
                        <a >
                            <i className="icon-home"></i>
                            <span></span>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}



