/**
 * Created by Administrator on 2017/1/23.
 */

var React = require('react');
var ReactDOM = require('react-dom');
import {QzGrid, TreeGrid, CreateMasterDetail} from '../grid';

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){


        //var comps=CreateMasterDetail(this.refs.testgrid, TestGrid, []);

    }

    render(){
        var TestGrid = {

            createParam:{
                styleUI: 'Bootstrap',

                colModel:[
                    {label: '用户名', name: 'username', width: 75,key: true,editable:true,editrules:{required:true},search :false,},
                    {label: '密码', name: 'password', width: 75,editable:true,editrules:{required:true},search :false,},

                ],
                viewrecords: true,
                autowidth: true,
                regional: 'cn',
                rowNum: 20,
                height: 450,
                datatype:'json',
                url: 'http://localhost:4000/userInfo/getUser',
                editurl: 'http://localhost:4000/userInfo/getUser',

            },
            navParam:{
                btns:{
                    add: true,
                    edit: true,
                    del: true,
                    search:false,
                }   , addFrm:{},
                delFrm:{},
                upFrm: {},
                //seach:searchParam
            }
        };

        return(
            <div>
                <QzGrid model={TestGrid} ref="testgrid"/>
            </div>
        )
    }
}