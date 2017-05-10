/**
 * Created by Administrator on 2017/1/17.
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

        function initButton() {
            that.refs.userGridRef.setGridParam({data: [], datatype: 'local'});
            that.refs.userGridRef.setCaption('');
            that.refs.manageGridRef.setGridParam({data: [], datatype: 'local'});
            that.refs.manageGridRef.setCaption('');

            that.refs.userGridRef.updateNavButton('add', false);
            that.refs.userGridRef.updateNavButton('edit', false);
            that.refs.userGridRef.updateNavButton('del', false);
            that.refs.manageGridRef.updateNavButton('add', false);
            that.refs.manageGridRef.updateNavButton('edit', false);
            that.refs.manageGridRef.updateNavButton('del', false);

            //return [true,'']

        }

        var shopNameGrid = {

            createParam:{
                styleUI: 'Bootstrap',

                colModel:[
                    {label: '商店名', name: 'shopname', width: 75,key: true,editable:true,editrules:{required:true},search :false,},
                    {label: '地址', name: 'address', width: 100,editable:true,editrules:{required:true},search :false,},
                    {label: '创建日期', name: 'createTime', index: 'createTime', width: 100, align: "center", editable: false,search :false,
                        sortable:false,formatter:"date",formatoptions: {srcformat:'Y-m-d',newformat:'Y-m-d'}},
                    {label: '备注', name: 'remarks', width: 75,editable:true,editrules:{required:true},search :false,},
                ],
                viewrecords: true,
                autowidth: true,
                regional: 'cn',
                rowNum: 20,
                height: window.innerHeight-300+'px',
                datatype:'json',
                url: 'http://localhost:4000/petShop/petshoplist',
                editurl: 'http://localhost:4000/petShop/petshoplist',
                loadComplete:initButton
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

        var userGrid = {

            createParam:{
                styleUI: 'Bootstrap',

                colModel:[
                    {label: '用户账号', name: 'useraccount', width: 75,key: true,editable:true,editrules:{required:true},search :false,},
                    {label: '用户名', name: 'username', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '创建日期', name: 'createTime', index: 'createTime', width: 100, align: "center", editable: false,search :false,
                        sortable:false,formatter:"date",formatoptions: {srcformat:'Y-m-d',newformat:'Y-m-d'}},
                    {
                        label: '管理员', name: 'isSuper',  width: 75, editable: true, formatter: 'checkbox',
                        edittype: "checkbox", editoptions: {value: "true:false", defaultValue: "false"},
                        search :false,sortable:false
                    },
                    {label: '备注', name: 'remarks', width: 75,editable:true,editrules:{required:true},search :false,},
                ],
                viewrecords: true,
                autowidth: true,
                regional: 'cn',
                rowNum: 20,
                height: window.innerHeight-350+'px',
                datatype:'json',

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

        var manageGrid = {

            createParam:{
                styleUI: 'Bootstrap',

                colModel:[
                    {label: '管理员账号', name: 'manageaccount', width: 75,key: true,editable:true,editrules:{required:true},search :false,},
                    {label: '管理员名', name: 'managename', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '创建日期', name: 'createTime', index: 'createTime', width: 100, align: "center", editable: false,search :false,
                        sortable:false,formatter:"date",formatoptions: {srcformat:'Y-m-d',newformat:'Y-m-d'}},
                    {
                        label: '管理员', name: 'isSuper',  width: 75, editable: true, formatter: 'checkbox',
                        edittype: "checkbox", editoptions: {value: "true:false", defaultValue: "false"},
                        search :false,sortable:false
                    },
                    {label: '备注', name: 'remarks', width: 75,editable:true,editrules:{required:true},search :false,},
                ],
                viewrecords: true,
                autowidth: true,
                regional: 'cn',
                rowNum: 20,
                height: window.innerHeight-350+'px',
                datatype:'json',

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


        var comps=CreateMasterDetail(this.refs.petModelDef, shopNameGrid, [
            {
                element: this.refs.userGridRef,
                props: userGrid,
                detailParam:function(rowId,selected,rowData){

                    if(rowData ){
                        that.refs.userGridRef.updateNavButton('add', true);
                        that.refs.userGridRef.updateNavButton('edit', true);
                        that.refs.userGridRef.updateNavButton('del', true);
                        return {editurl:'http://localhost:4000/petShop/userInfo?shopname='+rowData.shopname ,
                            url:'http://localhost:4000/petShop/userInfo?shopname='+rowData.shopname ,
                            datatype: "json",
                        };
                    }
                },
                detailCaption:function(rowId,selected,rowData){
                    if(rowData ){
                        return  "宠物商店["+(rowData.shopname || rowData.name || rowData.deviceType)+"]所对应的用户"
                    }

                }
            },
            {
                element: this.refs.manageGridRef,
                props: manageGrid,
                detailParam:function(rowId,selected,rowData){

                    if(rowData ){
                        that.refs.manageGridRef.updateNavButton('add', true);
                        that.refs.manageGridRef.updateNavButton('edit', true);
                        that.refs.manageGridRef.updateNavButton('del', true);
                        return {editurl:'http://localhost:4000/petShop/manageInfo?shopname='+rowData.shopname ,
                            url:'http://localhost:4000/petShop/manageInfo?shopname='+rowData.shopname,
                            datatype: "json",
                        };
                    }
                },
                detailCaption:function(rowId,selected,rowData){
                    if(rowData ){
                        return  "宠物商店["+(rowData.shopname || rowData.name || rowData.deviceType)+"]所对应的管理员"
                    }

                }
            }
        ]);

        initButton();
    }

    handleSelect(index){
        var that = this;
        setTimeout(function () {
            that.refs.userGridRef.handleResize();
            that.refs.manageGridRef.handleResize();
        },200)
    }
    

    render() {


        return (
            <div>
                <div className="col-md-6">
                    <div className="box">
                        <div className="box-header ui-sortable-handle">
                            <i className="fa  fa-anchor"></i>
                            <h3 className="box-title">商店名称</h3>

                        </div>
                        <div className="box-body">
                            <QzGrid ref="petModelDef" masterDetail={true}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <Tabs onSelect={this.handleSelect.bind(this,'circle')} forceRenderTabPanel={true} className="box  box-success">
                        <TabList>
                            <Tab><i className="fa fa-stumbleupon-circle"></i>用户</Tab>
                            <Tab><i className="fa fa-stumbleupon-circle"></i>管理员</Tab>
                            {/*<Tab><i className="fa fa-stumbleupon-circle"></i>测试组件</Tab>*/}

                        </TabList>


                        <TabPanel className="box-body">

                            <QzGrid masterDetail={true} ref="userGridRef"/>

                        </TabPanel>

                        <TabPanel className="box-body">

                            <QzGrid masterDetail={true} ref="manageGridRef"/>

                        </TabPanel>

                    </Tabs>
                </div>
            </div>
        )
    }
}