/**
 * Created by Administrator on 2016/11/10.
 */
//入口文件，写法为react-hot-loader 3.x写法，实现热替换。
import { AppContainer } from 'react-hot-loader';
import Routes from './Routes'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute ,browserHistory,withRouter,hashHistory } from 'react-router'

render((
    <AppContainer>
    <Routes/>
    </AppContainer>
), document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./Routes',function () {

        render((
            <AppContainer>
            <Routes/>
            </AppContainer>
        ), document.getElementById('root'));
    })

}