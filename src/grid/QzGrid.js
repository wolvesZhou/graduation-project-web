/**
 * Created by zhuqizhong on 16-5-2.
 */
import React from 'react';
import { WindowResizeListener } from 'react-window-resize-listener'
// var _= require('underscore');
// var CONST =require( '../core/constValues');
class QzGrid extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            disableEdit:((this.props.disableEdit === undefined)?true:this.props.disableEdit)
        }
    }
    handleResize() {
        $(this.refs.table).setGridWidth($(this.refs.container).width()).trigger('resize');
    }
    setColProp(colName,option){
        $(this.refs.table).setColProp(colName,option);
    }
    updateNavButton(btnName,enabled){
        if(enabled)
            $("#"+btnName+"_" + this.tableId).show();
        else
            $("#"+btnName+"_" + this.tableId).hide();


    }
    updateColState(btnName,enabled){
        var obj={};
        obj[btnName] = enabled;
        $(this.refs.table).jqGrid('navGrid',"#" + this.page_id, obj);
    }
    getSelectData(){
        var rowId = $(this.refs.table).jqGrid("getGridParam", "selrow");
        if(rowId){
            return $(this.refs.table).jqGrid("getRowData", rowId);
        }
        else {
            return {};
        }

    }
    getRowData(rowId){
        return $(this.refs.table).jqGrid("getRowData", rowId);
    }
    setGridParam(option){
        $(this.refs.table).jqGrid('setGridParam',option).trigger('reloadGrid');
    }

    getGridParam(option){
        return $(this.refs.table).jqGrid('getGridParam',option);
    }
    setSelection(rowId,onselectrow){
        $(this.refs.table).jqGrid('setSelection',rowId,onselectrow);
    }
    resetSelection(){
        $(this.refs.table).jqGrid('resetSelection');
    }
    setCaption(caption){
        $(this.refs.table).jqGrid('setCaption',caption);
    }
    updateLocalData(data){

        $(this.refs.table).jqGrid('clearGridData');
        $(this.refs.table).jqGrid('setGridParam',{datatype:'local',data:data}).trigger('reloadGrid');
        // var model = this.props.model || {};
        // this.setupButton(model);
    }
    disableEdit(disabled){
        this.setState({disableEdit:disabled || false})
    }

    reload(){
        $(this.refs.table).trigger('reloadGrid');
    }
    setupButton(model){
        var that = this;
        if(model.actionButtons ||model.actionCheckBox){
            $('#' + that.tableId).jqGrid('setGridParam', {
                gridComplete: function () {
                    var grid = $('#' + that.tableId);
                    
                    if (!that.state.disableEdit) {

                        var ids = grid.jqGrid('getDataIDs');
                        _.each(ids, function (rowId, i) {
                            var row_data = grid.jqGrid('getRowData', rowId);

                            _.each(model.actionButtons, function (actionBtn) {
                                var id = "CLS" + that.tableId + (Math.random().toFixed(12).replace('.', ''));
                                //ClassName window[FunName]=actionBtn.proc

                                var value = actionBtn.label;
                                var cellData = '<button class="btn  btn-warning btn-xs " id="' + id + '">' + value + "</button>"
                                /* var checkOut = "<input style='height:22px;width:75px;' " +
                                 "type='button' value='"+value+"' " +
                                 "onclick=\""+FunName+"('" +
                                 rowId + "');\" />";*/
                                console.log(cellData);
                                var cellValue = {};
                                cellValue[actionBtn.col] = cellData;
                                grid.setColProp(actionBtn.col, {hidden: false});
                                grid.jqGrid('setRowData', rowId, cellValue);
                                $('#' + id).on('click', function () {
                                    console.log('rowId  is:', rowId);
                                    actionBtn.proc(rowId, row_data)
                                })
                            });
                            _.each(model.actionCheckBox, function (actionBtn) {
                                var id = "CLS" + that.tableId + (Math.random().toFixed(12).replace('.', ''));
                                var cellValue = row_data[actionBtn.col];
                                var cellData = (actionBtn.isSingle ?
                                '<input type="checkbox"' + (cellValue == 'true' ? ' checked="checked"' : '') + ' id ="' + id + '"/>'
                                    : '<input type="checkbox"' + (cellValue == 'true' ? ' checked="checked"' : '') + ' id ="' + id + '"/>');
                                cellValue = {};
                                cellValue[actionBtn.col] = cellData;
                                grid.setColProp(actionBtn.col, {hidden: false});
                                grid.jqGrid('setRowData', rowId, cellValue);
                                $('#' + id).on('click', function () {
                                    console.log('rowId  is:', rowId);
                                    actionBtn.proc(rowId, row_data)
                                })
                            })
                        });
                    }
                    else {
                        _.each(model.actionButtons, function (actionBtn) {
                            grid.setColProp(actionBtn.col, {hidden: true});
                        })

                        _.each(model.actionCheckBox, function (actionBtn) {
                            grid.setColProp(actionBtn.col, {hidden: true});
                        });
                    }
                }
            })
        }
    }
    componentDidMount() {
        var that = this;
        var url = $('#' + that.tableId).jqGrid('getGridParam','url');
        var editurl = $('#' + that.tableId).jqGrid('getGridParam','editurl');
        $('#' + that.tableId).jqGrid('setGridParam',{url:url,editurl:editurl});


        this.tableId = this.tableId || Math.random().toFixed(12).replace('.', '');
        this.page_id = this.page_id || "pager_";
        this.tableId;
        var default_props = {};
        var model = this.props.model || {};

        if (!this.props.masterDetail) {
            var props = {...model.createParam, pager: "#" + this.page_id};
            $('#' + this.tableId).jqGrid(props);
            if(model.navParam){
                model.navParam.upFrm.viewPagerButtons = false;
                $('#' + this.tableId).jqGrid('navGrid',
                    "#" + this.page_id,
                    model.navParam.btns,
                    model.navParam.upFrm,
                    model.navParam.addFrm,
                    model.navParam.delFrm,
                    model.navParam.seach || model.navParam.search);
            }

            model.navParam.upFrm.viewPagerButtons = false;
            if(!this.props.disableEdit)
                this.setupButton(model);

        }



    }

    render() {
        this.tableId = this.tableId || Math.random().toFixed(12).replace('.', '');
        this.page_id = this.page_id || "pager_" + this.tableId;
        return (

                <div style={{width:"100%"}} ref="container">
                    <WindowResizeListener onResize={windowSize => {
                         this.handleResize();
                     }} />
                        <table ref="table" id={this.tableId}>
                        </table>
                        <div ref="pager" id={this.page_id}>
                        </div>

                </div>

        )
    }
}
module.exports = QzGrid;