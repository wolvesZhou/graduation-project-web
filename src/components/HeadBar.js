/**
 * Created by zwf on 17-3-22.
 */


var React = require('react');
var ReactDOM = require('react-dom');

export default class extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        var headStyle = {
            marginBottom:0,
            position:'fixed',
            width:window.innerWidth
        }
        return(

            <header className="navbar navbar-inverse" role="banner" style={headStyle}>
                    <div className="navbar-header">
                        <button className="navbar-toggle" type="button" data-toggle="collapse" id="menu-toggler">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="index.html"><img src="../src/plugins/img/logo.png"/></a>
                    </div>
                    <ul className="nav navbar-nav pull-right hidden-xs">
                        <li className="hidden-xs hidden-sm">
                            <input className="search" type="text" />
                        </li>

                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle hidden-xs hidden-sm" data-toggle="dropdown">
                                你的账号
                                <b className="caret"></b>
                            </a>
                            <ul className="dropdown-menu">
                                <li><a href="personal-info.html">个人信息</a></li>
                                <li><a href="#">账号设置</a></li>
                                <li><a href="#">账单</a></li>
                                <li><a href="#">导出数据</a></li>
                                <li><a href="#">发送反馈</a></li>
                            </ul>
                        </li>
                    </ul>
                </header>

        )
    }
}