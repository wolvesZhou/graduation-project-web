/**
 * Created by zwf on 17-3-21.
 */

var React = require('react');
var ReactDOM = require('react-dom');
import {Link,browserHistory,} from 'react-router'

export default class extends React.Component{
    constructor(props){
        super(props)
    }

    goToRegister(){
        browserHistory.push('/register')
    }

    handleLogin(){
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
                            <h6>登录</h6>
                            <input className="form-control" type="text" placeholder="邮箱地址"/>
                            <input className="form-control" type="password" placeholder="密码"/>
                            <a href="#" className="forgot">忘记密码?</a>
                            <div className="remember">
                                <input id="remember-me" type="checkbox"/>
                                <label htmlFor="remember-me">记住密码</label>
                            </div>
                            <a className="btn-glow primary login" onTouchTap={this.handleLogin.bind(this)}>登录</a>
                        </div>
                    </div>

                    <div className="no-account">
                        <p>还没账号?</p>
                        <a onTouchTap={this.goToRegister.bind(this)}>注册</a>
                    </div>
                </div>
            </div>
        )
    }
}