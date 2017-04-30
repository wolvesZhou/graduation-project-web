/**
 * Created by Administrator on 2016/11/10.
 */
//定义你的route文件
import React, { Component } from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute ,browserHistory,withRouter,hashHistory } from 'react-router'
import Home from './components/Home'
import TestGrid from './components/TestGrid'
import Login from './components/Login'
import Register from './components/register'
import Navigation from './components/Navigation'
import HeadBar from './components/HeadBar'
import ShopPets from './components/ShopPets'
import KindList from './components/kindList'
import UserList from './components/UserList'
import RequestPet from './components/RequestPet'
import UserAdvice from './components/UserAdvice'
import OrderList from './components/OrderList'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';


var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


class Content extends Component {
    render() {
        var path = this.props.location.pathname.split('/');
        // const height = window.innerHeight-91
        return (<div style={{marginLeft:'200px',paddingTop:'52px'}}>
            <section className="content-header">
                <h1>
                    {this.props.children ? this.props.children.props.route.title : ""}
                    <small>{this.props.children ? this.props.children.props.route.description : ""}</small>
                    {this.props.children && this.props.children.props.route.addtion  }
                </h1>
                <ol className="breadcrumb">
                    <li><a href="/"><i className="fa fa-dashboard"></i> 主页</a></li>
                    <li><a href="#">{(path.length > 1 ? path[1] : '')}</a></li>
                    <li className="active">{(path.length > 1 ? path[2] : '')}</li>
                </ol>
            </section>

            {/*<!-- Main content --> */}

            <section className="content" id="content">
                <div className="row col-xs-12">

                    <div className="box" style={{marginBottom:'0px'}}>

                        {/*<!-- /.box-header -->*/}
                        <div className="box-body">

                            {this.props.children}

                        </div>
                    </div>

                </div>
            </section>

        </div>);
    }
}

const App = React.createClass({

    render() {

        const {HeaderBar, NavigationMenu, Content} = this.props;

        return (

            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div>
                    {HeaderBar}
                    {NavigationMenu}
                    {Content}

                </div>
            </MuiThemeProvider>

        )
    }
});

var OrgChartDef = {title: '宠物商店管理', description: '宠物商店列表及对应的用户,管理员', component: Home};
var ShopPetDef = {title: '宠物管理', description: '宠物商店列表及对应的宠物', component: ShopPets}
var KindListDef = {title: '种类管理', description: '宠物种类列表', component: KindList}
var UserListDef = {title: '用户管理', description: '用户列表', component: UserList}
var RequestListDef = {title: '求购信息', description: '求购信息列表', component: RequestPet}
var AdviceListDef = {title: '用户疑问', description: '用户疑问列表', component: UserAdvice}
var OrderListDef = {title: '宠物订单', description: '宠物订单列表', component: OrderList}


export default class extends Component{


    render(){
        return(
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute components={{Content:Login}}/>
                    <Route path="login" components={{Content:Login}}/>
                    <Route path="register" components={{Content:Register}}/>
                    <Route path="test" components={{Content:TestGrid}}/>
                    <Route path="/" components={{ HeaderBar: HeadBar, NavigationMenu: Navigation ,Content:Content}}>
                        <IndexRoute {...OrgChartDef} />
                        <Route path="home" {...OrgChartDef} />
                        <Route path="shopPet" {...ShopPetDef}/>
                        <Route path="kindList" {...KindListDef}/>
                        <Route path="userList" {...UserListDef}/>
                        <Route path="RequestPet" {...RequestListDef}/>
                        <Route path="UserAdvice" {...AdviceListDef}/>
                        <Route path="OrderList" {...OrderListDef}/>
                    </Route>

                </Route>

            </Router>
        )
    }
}