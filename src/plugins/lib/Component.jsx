import React from 'react';
import IconDevice from 'material-ui/svg-icons/action/settings-applications';
import IconScene from 'material-ui/svg-icons/action/dashboard';
import IconConn from 'material-ui/svg-icons/action/swap-vertical-circle';
// import CONST from '../../../core/constValues'
// import Rebus from '../../../core/Rebus'
import {withRouter,Link} from 'react-router'
var _ = require('underscore')
 class UserInfo extends React.Component {
  static propTypes = {
    user: React.PropTypes.string
  }
  static defaultProps = {
    user: ''
  }
  constructor() {
    super();
    this.state = {
      data: {}
    };

  }
  componentDidMount() {

  }
  componentWillReceiveProps(props) {

  }
  logout(){
    localStorage.removeItem('accessToken');
    Rebus.execute({akey:CONST.ACTION.LOGOUT,from:''},{});
    this.props.router.replace('/Login');
  }
  render() {
    var data = this.props.data;
		var user = this.props.user;
    var userInfo = Rebus.getState(CONST.STATE.USER)||{};
    var houseData = Rebus.getState(CONST.STATE.HOUSEDATA) || {};
    var devCount = Object.keys(houseData.devs || {}).length;
    var scenesCount = 0;
    var connCount = 0;
    _.each(houseData.scenes,function(scene){
        if(scene && scene.moduleType == 'conn'){
          connCount ++;
        }else{
          scenesCount++;
        }
    })
    return (
      <div className="react-git-card">
        
          <div className="avatar"><Link to="/Login">
              {
                  userInfo.avatar_url ? <IconDevice alt="avatar" className="react-git-card-avatar" src={userInfo.avatar_url}></IconDevice> : <span className="react-git-card-avatar"></span>
              }
          </Link>
              <div className="user-info">
                  <h1 className="react-git-card-name">{userInfo.nickName}</h1>
                  <p className="react-git-card-desc">{userInfo.telNo}</p></div></div>
        
        <div className="react-git-card-social">
          <div className="react-git-card-item followers" >
              <IconDevice color="white"/>设备

            {devCount}
          </div>
          <div className="react-git-card-item repos" >
              <IconScene color="white" /> 场景
						{scenesCount}
					</div>
          <div className="react-git-card-item following" >
              <IconConn color="white"/> 连接
						{connCount}
					</div>
        </div>
      </div>
    );
  }
}
export default withRouter(UserInfo)
