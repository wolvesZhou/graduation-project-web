/**
 * Created by zwf on 17-4-20.
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
        // this.getData();
    }

    componentDidMount(){
        var that = this;

        var requestPetGrid = {

            createParam:{
                styleUI: 'Bootstrap',

                colModel:[
                    {label: 'id', name: '_id', width: 75,key: true,hidden:true},
                    {label: '账号', name: 'telno', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '用户名', name: 'username', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '求购信息', name: 'request', width: 300,editable:true,editrules:{required:true},search :false,},
                    {
                        label: '是否解决', name: 'isDone',  width: 75, editable: true, formatter: 'checkbox',
                        edittype: "checkbox", editoptions: {value: "true:false", defaultValue: "false"},
                        search :false,sortable:false
                    },
                ],
                viewrecords: true,
                autowidth: true,
                regional: 'cn',
                rowNum: 20,
                height: window.innerHeight-300+'px',
                datatype:'json',
                url: 'http://localhost:4000/request/petask',
                editurl: 'http://localhost:4000/request/changeInfo',
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


        var comps=CreateMasterDetail(this.refs.requestModelDef, requestPetGrid, []);

    }


    render() {


        return (
            <div>
                <div className="col-md-12">
                    <div className="box">
                        <div className="box-header ui-sortable-handle">
                            <i className="fa  fa-anchor"></i>
                            <h3 className="box-title">求购信息</h3>

                        </div>
                        <div className="box-body">
                            <QzGrid ref="requestModelDef" masterDetail={true}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}