/**
 * Created by zhuqizhong on 16-5-4.
 */
import QzGrid from './QzGrid'
import TreeGrid from './treeGrid'
import RebusGrid from './rebusGrid'
// var _ = require('underscore');
/**
 * 创建一个masterDetail的连接，detail的props事件
 * @param mEle
 * @param mEleProps
 * @param details 子表信息，是一个数组，每一项包括以下的内容
 *  .element  子表的Element对象，为QzGrid或是TreeGrid
 *  .props    子表的属性定义
 *  .detailParam 子表的查询连接方式定义,是一个函数，参数为(rowid,selected)，用于生成setGridParam的参数
 *      如果没有，默认生成{url: rowid+".json",datatype: 'json'}
 *  .detailCaption   子表的caption定义，一个函数,参数为(rowid,selected,rowData)，用于生成caption，如果没有，默认是rowid
 * @constructor
 */
function BuildMasterDetail(mEle, mEleProps, details) {
    //bindDetail
    var masterElement = mEle;
    var masterElementTable = masterElement.refs.table;
    var masterElementPage = masterElement.refs.pager;
    var page_id = "#" + $(masterElementPage).attr('id');

    var props = {...mEleProps.createParam, pager:page_id};
    var detailJq =[];
    //生成detail表
    _.each(details, function (detailInfo) {
        var table = detailInfo.element.refs.table;
        var page = detailInfo.element.refs.pager;
        var detail_props = {...detailInfo.props.createParam, pager: "#" + $(page).attr('id')};
        detail_props.hidegrid = false;
        var detailGrid = $(table).jqGrid(detail_props);
        if(detailInfo.props.navParam){
            detailInfo.props.navParam.upFrm.viewPagerButtons = false;
            detailGrid.jqGrid('navGrid',"#" + $(page).attr('id'),detailInfo.props.navParam.btns,
                detailInfo.props.navParam.upFrm,
                detailInfo.props.navParam.addFrm,
                detailInfo.props.navParam.delFrm,
                detailInfo.props.navParam.search);
        }
        detailInfo.element.setupButton(detailInfo.props);
        detailJq.push({grid:detailGrid,tableId:$(table).attr('id'),pageId:$(page).attr('id')});

    });

    function clearSelection() {
        _.each(details, function (detailInfo) {
            var table = detailInfo.element.refs.table;


            $(table).jqGrid('setGridParam', {url: "empty.json", datatype: 'json'}); // the last setting is for demo purpose only
            $(table).jqGrid('setCaption', 'Detail Grid:: none');
            $(table).trigger("reloadGrid");
        })


    }

    //由于jqGrid不存储原始的rowData数据，因此，如果数据使用formatter处理过了，需要增加一个隐藏的字段，把该数据存储下，然后此处使用隐藏的字段
    var OnRowSelect = function (rowid, selected) {
        if (rowid != null) {
            var row_data = masterJq.jqGrid('getRowData',rowid);
            _.each(details, function (detailInfo) {
                let DetailElement = detailInfo.element;
                let detailProps = detailInfo.props;
                let detailBuilder = detailInfo.detailParam || function (rowid, selected) {
                        return {url: rowid + ".json", datatype: 'json'}
                    };

                let detailCaption = detailInfo.detailCaption || function(rowid,selected){
                        return "记录["+rowid+"]的详细信息：";
                    };

                $(DetailElement.refs.table).jqGrid('setGridParam', detailBuilder(rowid, selected,row_data)); // the last setting is for demo only
                $(DetailElement.refs.table).jqGrid('setCaption', detailCaption(rowid,selected,row_data));
                $(DetailElement.refs.table).trigger("reloadGrid");

            })

        }
    };
    var masterJq =$(masterElementTable).jqGrid({
        ...props,
        onSortCol: clearSelection,
        onPaging: clearSelection,
        onSelectRow: OnRowSelect
    });

    if(mEleProps.navParam){
        mEleProps.navParam.upFrm.viewPagerButtons =false;
        masterJq.jqGrid('navGrid',"#" + $(masterElementPage).attr('id'),mEleProps.navParam.btns,
            mEleProps.navParam.upFrm,
            mEleProps.navParam.addFrm,
            mEleProps.navParam.delFrm,
            mEleProps.navParam.search || mEleProps.navParam.seach);
    }
    masterElement.setupButton(mEleProps);
    return {master:{grid:masterJq,tableId:"#" + $(masterElementTable).attr('id'),pageId:"#" + $(masterElementPage).attr('id')},
        detail:detailJq};
}
function CreateTable(mEle, mEleProps) {
    //bindDetail
    var masterElement = mEle;
    var masterElementTable = masterElement.refs.table;
    var masterElementPage = masterElement.refs.pager;
    var props = {...mEleProps.createParam, pager: "#" + $(masterElementPage).attr('id')};

    var masterJq =$(masterElementTable).jqGrid({
        ...props,

    })
    if(mEleProps.navParam){
        masterJq.jqGrid('navGrid',"#" + $(masterElementPage).attr('id'),mEleProps.navParam.btns,
            mEleProps.navParam.upFrm,
            mEleProps.navParam.addFrm,
            mEleProps.navParam.delFrm,
            mEleProps.navParam.search || mEleProps.navParam.seach);
    }
    masterElement.setupButton(mEleProps);
    return {grid:masterJq,tableId:"#" + $(masterElementTable).attr('id'),pageId:"#" + $(masterElementPage).attr('id')}
}
module.exports = {QzGrid: QzGrid, TreeGrid: TreeGrid, CreateMasterDetail: BuildMasterDetail,CreateTable:CreateTable,RebusGrid:RebusGrid};