/**
 * Created by zwf on 17-4-8.
 */

var React = require('react');
var ReactDOM = require('react-dom');
import {QzGrid, TreeGrid, CreateMasterDetail} from '../grid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Link,browserHistory} from 'react-router';
import {uploadFiles} from '../common'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
var Modal = require('react-modal')


export default class extends React.Component {
    constructor(props){
        super(props);
        this.state={
            rowDataValue:'',
            petRowData:'',
            modalFileIsOpen:false,
            temlIconName:''
        }
    }

    componentDidMount(){
        var that = this;

        function initButton() {
            that.refs.petModelDef.setGridParam({data: [], datatype: 'local'});
            that.refs.petModelDef.setCaption('');


            that.refs.petModelDef.updateNavButton('add', false);
            that.refs.petModelDef.updateNavButton('edit', false);
            that.refs.petModelDef.updateNavButton('del', false);

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

        var petGrid = {

            createParam:{
                styleUI: 'Bootstrap',

                colModel:[
                    {label: '宠物名', name: 'petname', width: 75,key: true,editable:true,editrules:{required:true},search :false,},
                    {label: '种类', name: 'kind', width: 30,editable:true,edittype:'select',editrules:{required:true},
                        editoptions: { size: 1,
                            dataUrl: 'http://localhost:4000/kindInfo/kindselect',
                            dataEvents: [
                                {  type: 'change',
                                    fn: function(e) {
                                        $('input#Job_Number').val(this.value);
                                    }
                                }
                            ]
                        }},
                    {label: '品种', name: 'variety', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '性别', name: 'sex', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '年龄', name: 'age', width: 75,editable:true,editrules:{required:true},search :false,},
                    {label: '价格', name: 'price', width: 75,editable:true,editrules:{required:true},search :false,},
                ],
                viewrecords: true,
                autowidth: true,
                regional: 'cn',
                rowNum: 20,
                height: window.innerHeight-350+'px',
                datatype:'json',
                'onSelectRow': function () {
                    var rowData = this.refs.petModelDef.getSelectData();
                    this.setState({
                        petRowData:rowData
                    })
                    this.handleGetImage()

                }.bind(this),
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



        var comps=CreateMasterDetail(this.refs.petShopModelDef, shopNameGrid, [
            {
                element: this.refs.petModelDef,
                props: petGrid,
                detailParam:function(rowId,selected,rowData){

                    if(rowData ){
                        that.setState({
                            rowDataValue:rowData,
                            temlIconName:''
                        })
                        that.refs.petModelDef.updateNavButton('add', true);
                        that.refs.petModelDef.updateNavButton('edit', true);
                        that.refs.petModelDef.updateNavButton('del', true);
                        return {editurl:'http://localhost:4000/petData/petlist?shopname='+rowData.shopname ,
                            url:'http://localhost:4000/petData/petlist?shopname='+rowData.shopname ,
                            datatype: "json",
                        };
                    }
                },
                detailCaption:function(rowId,selected,rowData){
                    if(rowData ){
                        return  "宠物商店["+(rowData.shopname || rowData.name || rowData.deviceType)+"]所对应的宠物"
                    }

                }
            }
        ]);

        initButton();
    }

    getImageShow(){
        this.setState({
            modalFileIsOpen:true
        })
    }

    handleGetImage(){
        var petShopRowData = this.refs.petShopModelDef.getSelectData();
        var petRowData = this.refs.petModelDef.getSelectData();

        var url = 'http://localhost:4000/petData/files?' + '&shopname='+petShopRowData.shopname+'&petname='+petRowData.petname+'&isString=true';
        $.get(url,function (response) {
            this.setState({
                temlIconName:response
            })
        }.bind(this))
    }

    handleConfirmImage(){
        var that = this;
        var url = 'http://localhost:4000/petData/files?'+'shopname='+this.state.rowDataValue.shopname+'&petname='+this.state.petRowData.petname;
        var file = $('#icon')[0];
        var dataForm = new FormData();
        dataForm.append('oper', 'edit');
        dataForm.append(file.id,file.files[0]);
        // $.post(url,dataForm)
        //     .done(function (result) {
        //         console.log('ok')
        //     })
        //     .fail(function (error) {
        //         console.log('error')
        //     })
        $.ajax(url, {
            data:dataForm,
            cache: false,
            contentType: false,
            type:"POST",
            processData: false,
            success : function(data) {
                that.setState({
                    modalFileIsOpen:false,
                    temlIconName:data
                })
            }
        })
    }

    handleCloseImage(){
        this.setState({
            modalFileIsOpen:false
        })
    }


    render(){

        const customStyles = {
            content: {
                width: 400,
                margin:'auto',
                top                   : 0,
                left                  : 0,
                right                 : 0,
                bottom                : 0,

                position             :'absolute',
                height:'110px',

            },
            overlay:{
                "zIndex":999
            }
        };

        return(
            <div>
                <div className="col-md-6">
                    <div className="box">
                        <div className="box-header ui-sortable-handle">
                            <i className="fa  fa-anchor"></i>
                            <h3 className="box-title">商店名称</h3>

                        </div>
                        <div className="box-body">
                            <QzGrid ref="petShopModelDef" masterDetail={true}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box">
                        <Toolbar style={{height:'32px',marginBottom:'10px'}}>
                            <ToolbarGroup firstChild={true} style={{height:'32px'}}>
                                <FlatButton label='图片:' disabled={true}  style={{height:'32px',lineHeight:'32px',width:'80px'}}/>
                                <img src={this.state.temlIconName} onClick={this.state.petRowData?this.getImageShow.bind(this):''} style={{width:'32px',height:'32px',marginLeft:'-20px',marginRight:'20px'}}/>
                            </ToolbarGroup>

                        </Toolbar>
                        <div className="box-body">
                            <QzGrid ref="petModelDef" masterDetail={true}/>
                        </div>
                    </div>
                </div>
                <Modal
                    className="Modal__Bootstrap modal-dialog"
                    closeTimeoutMS={150}
                    isOpen={this.state.modalFileIsOpen}
                    contentLabel="Modal"
                    style={customStyles}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.handleCloseImage.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">关闭</span>
                            </button>
                            <h4 className="modal-title">上传图片</h4>
                        </div>
                        <div className="modal-body">
                            <input type="file" ref='imageUp' id="icon"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={this.handleConfirmImage.bind(this)}>
                                确定
                            </button>

                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}