/**
 * Created by zwf on 17-4-9.
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

        var kindNameGrid = {

            createParam:{
                styleUI: 'Bootstrap',

                colModel:[
                    {label: '种类名', name: 'kindname', width: 75,key: true,editable:true,editrules:{required:true},search :false,},
                ],
                viewrecords: true,
                autowidth: true,
                regional: 'cn',
                rowNum: 20,
                height: window.innerHeight-300+'px',
                datatype:'json',
                url: 'http://localhost:4000/kindInfo/kindlist',
                editurl: 'http://localhost:4000/kindInfo/kindlist',
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


        var comps=CreateMasterDetail(this.refs.kindModelDef, kindNameGrid, []);

    }


    render() {


        return (
            <div>
                <div className="col-md-12">
                    <div className="box">
                        <div className="box-header ui-sortable-handle">
                            <i className="fa  fa-anchor"></i>
                            <h3 className="box-title">种类名称</h3>

                        </div>
                        <div className="box-body">
                            <QzGrid ref="kindModelDef" masterDetail={true}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}