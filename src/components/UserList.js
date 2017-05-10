/**
 * Created by zwf on 17-4-12.
 */

var React = require('react');
var ReactDOM = require('react-dom');
import {QzGrid, TreeGrid, CreateMasterDetail} from '../grid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: []
        };
    }

    componentDidMount(){
        var that = this;

        var UsernameGrid = {

            createParam:{
                styleUI: 'Bootstrap',

                colModel:[
                    {label: '用户账号', name: 'telno', width: 75,key: true,editable:true,editrules:{required:true},search :false,},
                    {label: '密码', name: 'password', width: 75,editable:true,editrules:{required:true},search :false,},
                ],
                viewrecords: true,
                autowidth: true,
                regional: 'cn',
                rowNum: 20,
                height: window.innerHeight-300+'px',
                datatype:'json',
                url: 'http://localhost:4000/userInfo/userlist',
                editurl: 'http://localhost:4000/userInfo/userlist',
            },
            navParam:{
                btns:{
                    add: true,
                    edit: true,
                    del: true,
                    search:false,
                }   , addFrm:{closeAfterAdd:true},
                delFrm:{},
                upFrm: {closeAfterEdit:true},
                //seach:searchParam
            }
        };


        var comps=CreateMasterDetail(this.refs.userModelDef, UsernameGrid, []);

    }


    render() {


        return (
            <div>
                <div className="col-md-12">
                    <div className="box">
                        <div className="box-header ui-sortable-handle">
                            <i className="fa  fa-anchor"></i>
                            <h3 className="box-title">用户名称</h3>

                        </div>
                        <div className="box-body">
                            <QzGrid ref="userModelDef" masterDetail={true}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}