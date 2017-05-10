/**
 * Created by zwf on 17-4-24.
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

        var orderGrid = {

            createParam:{
                styleUI: 'Bootstrap',

                colModel:[
                    {label: 'id', name: '_id', width: 75,key: true,hidden:true},
                    {label: '订单人', name: 'orderUser', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '订单人号码', name: 'orderTel', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '收货人', name: 'receiveUser', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '收货人号码', name: 'receiveTel', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '收货人地址', name: 'address', width: 125,editable:true,editrules:{required:true},search :false,},
                    {label: '留言', name: 'message', width: 125,editable:true,editrules:{required:true},search :false,},
                    {label: '宠物名', name: 'petName', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '来自商店', name: 'petFrom', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '宠物价格', name: 'petPrice', width: 75,editable:true,editrules:{required:true},search :false,},
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
                url: 'http://localhost:4000/petOrder/orderlist',
                //editurl: 'http://localhost:4000/petOrder/orderlist',
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


        var comps=CreateMasterDetail(this.refs.orderModelDef, orderGrid, []);

    }


    render() {


        return (
            <div>
                <div className="col-md-12">
                    <div className="box">
                        <div className="box-header ui-sortable-handle">
                            <i className="fa  fa-anchor"></i>
                            <h3 className="box-title">订单名称</h3>

                        </div>
                        <div className="box-body">
                            <QzGrid ref="orderModelDef" masterDetail={true}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}