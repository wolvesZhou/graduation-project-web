/**
 * Created by zwf on 17-3-21.
 */

var React = require('react');
var ReactDOM = require('react-dom');
import {Link,browserHistory} from 'react-router';

export default class extends React.Component{
    constructor(props){
        super(props)
    }

    handleLogin(){
        browserHistory.push('/login')
    }

    handleRegister(){
        browserHistory.push('/home')
    }

    render(){
        var divStyle = {
            height:window.innerHeight,
            width:window.innerWidth
        }
        return(
            <div className="backimg" style={divStyle}>
                <div className="login-wrapper">
                    <div className="box">
                        <div className="content-wrap">
                            <h6>注册</h6>
                            <input className="form-control" type="text" placeholder="邮箱"/>
                            <input className="form-control" type="password" placeholder="密码"/>
                            <input className="form-control" type="password" placeholder="确认密码"/>
                            <div className="action">
                                <a className="btn-glow primary signup" onTouchTap={this.handleRegister.bind(this)}>注册</a>
                            </div>
                        </div>
                    </div>

                    <div className="already">
                        <p>已有账号?</p>
                        <a onClick={this.handleLogin}>登录</a>
                    </div>
                </div>
            </div>
        )
    }
}