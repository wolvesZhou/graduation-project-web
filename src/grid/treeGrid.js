
import React from 'react';
import QzGrid from './QzGrid'

 class TreeGrid extends QzGrid {

    componentDidMount() {
        this.tableId = this.tableId || Math.random().toFixed(12).replace('.', '');
        this.page_id = this.page_id || "pager_"+this.tableId ;

        var default_props = {
            url: 'server.php?q=tree',
            treedatatype: "json",
            mtype: "POST",

            colModel:[
                {label:'编号',name:'uuid',index:'uuid', width:1,hidden:true,key:true, editable:false},
                {label:'名称',name:'name',index:'name', width:200, editable:true},
                {name:'负责人',index:'manager', width:120, align:"center",editable:true},
                {name:'邮箱地址',index:'debit', width:150, align:"right",editable:true},
                {name:'手机号码',index:'credit', width:100,align:"right",editable:true},
                {name:'备注',index:'memo', width:250,align:"right",editable:true}
            ],
            height:'auto',
            autoWidth:true,
            treeGrid: true,
            ExpandColumn : 'name',
            editurl:'server.php?q=dummy',
            caption: "组织机构",
            styleUI: 'Bootstrap',

        };


        var props = {...default_props, ...this.prop, pager: "#" + this.page_id};
        $('#' + this.tableId).jqGrid(props);
        $("#" + this.page_id).jqGrid('navGrid',("#" + this.page_id));
    }

    render() {
        this.tableId = this.tableId || Math.random().toFixed(12).replace('.', '');
        this.page_id = this.page_id || "pager_" + this.tableId;
        return (
            <div >

                <table ref="table" id={this.tableId}>
                </table>
                <div ref="pager" id={this.page_id}>
                </div>
            </div>
        )
    }
}
module.exports = TreeGrid;