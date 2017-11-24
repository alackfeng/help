import React, { Component } from 'react';
import AltContainer from 'alt-container';
import BlockchainStore from './BlockchainStore';
import HelpStore from "./HelpStore";
import HelpActions from "./HelpActions";
import willTransitionTo from './routerTransition';


import {Apis} from "fidchainjs-ws";


import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
//import NavigationClose from 'material-ui/svg-icons/navigation/close';
//import NavigationMenu from 'material-ui/svg-icons/navigation/menu';


/*
const Logged = (props) => (
	<FlatButton {...this.props} label="AFT-setting"></FlatButton>
);
Logged.muiName = 'FlatButton';
*/

class Setting extends Component {
	static muiName = 'IconMenu';

	constructor(props) {
		super(props);

		this.handleSetting = this.handleSetting.bind(this);
		console.log("Setting::constructor - ", props);
		let settings = props.settings;

		this.state = {
			valueNode: settings.DEFAULT_WS_NODE,
			listNode: settings.WS_NODE_LIST,
			reset: false,
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log("Setting::shouldComponentUpdate - ", nextProps, nextState);
		if(nextState.reset && nextProps.rpc_connection_status === 'open') {
			//window.location.href = "/";
			this.setState({reset: false});
			willTransitionTo(nextProps, nextState, (result, e) => {
				if(result === 'synced') {
					//_This.setState({synced: true});
					HelpActions.setSync(true);
				}
			});
			return false;
		}
		return true;
	}

	componentWillReceiveProps(nextProps, nextState) {
		console.log("Setting::componentWillReceiveProps - ", nextProps, nextState);
		
	}

	handleSetting = (event, value) => {
		console.log("Setting::handleSetting - ", event, value);
		// alert(value);
		// HelpActions.change({status: false, beSynced: false});
		HelpActions.change({settings: {
			DEFAULT_WS_NODE: value,
			WS_NODE_LIST: this.state.listNode
		}});

		Apis.reset(value, true);

		this.setState({
			valueNode: value,
			reset: true
		});
	}

	render() {
		let {synced, rpc_connection_status} = this.props;
		let {valueNode, listNode} = this.state;
		console.log("Setting::render - ", valueNode, listNode);
		//alert(synced);

		let menuItemList = listNode.length? listNode.map((node, key) => {
					console.log("Setting::render - ", node, key);
					return <MenuItem key={key} primaryText={node.location} value={node.url} />
				}) : null;

		return (
			<div>
			{ rpc_connection_status==='open' ? <span className="txtlabel success">connected</span>
				: <span className="txtlabel warning">{rpc_connection_status}</span> }
			{ synced ? <span className="txtlabel success">, synced: {valueNode}</span>
				: <span className="txtlabel warning">, not sync: {valueNode} </span> }

			<IconMenu
				iconButtonElement={
					<IconButton><MoreVertIcon /></IconButton>
				}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				value={this.state.valueNode}
				onChange={this.handleSetting}
			>
				{menuItemList}
			</IconMenu>
			</div>
		);
	}
}


//export { Logged as default, Setting };

class SettingContainer extends Component {
  render() {

    return (
      <AltContainer
        stores={[BlockchainStore, HelpStore]}
        inject={{
          rpc_connection_status: () => {
            return BlockchainStore.getState().rpc_connection_status;
          },
          synced: () => {
          	return HelpStore.getState().beSynced;
          },
          settings: () => {
          	return HelpStore.getState().settings;
          }
        }}
      >
        <Setting {...this.props} />
      </AltContainer>
    );
  }
}

export default SettingContainer;