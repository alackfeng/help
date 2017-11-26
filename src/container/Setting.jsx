import React, { Component } from 'react';
import AltContainer from 'alt-container';
import BlockchainStore from 'stores/BlockchainStore';
import HelpStore from "stores/HelpStore";
import HelpActions from "stores/HelpActions";
import willTransitionTo from 'routerTransition';
import AccountActions from "stores/AccountActions";
import AccountStore from "stores/AccountStore";


import {Apis} from "assetfunjs-ws";
import utils from "lib/utils";

import { withRouter } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
//import NavigationClose from 'material-ui/svg-icons/navigation/close';
//import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import SearchBar from "lib/SearchBar";




const styles = {
	title: {
		cursor: 'pointer',
	},
	search: {
		margin: '0 auto',
		maxWidth: 300,
		float: 'left',
		outline: 'none',
  		background: 'transparent',
	},
	main: {
		textAlign: 'center', 
		margin: 30,
		top: 100,
	},
	
};
/*
const Logged = (props) => (
	<FlatButton {...this.props} label="AFT-setting"></FlatButton>
);
Logged.muiName = 'FlatButton';
*/

class Setting extends Component {
	static muiName = 'IconMenu';

	static propTypes: {
		history: React.PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);

		this.handleSetting = this.handleSetting.bind(this);
		console.log("Setting::constructor - ", props);
		let settings = props.settings;

		this.state = {
			valueNode: settings.currentNode,
			listNode: settings.listNode,
			reset: false,
			dataSource: [],
			searchContent: null,
			search: false
		}

		this.onChangeSearch 	= this.onChangeSearch.bind(this);
		this.onRequestSearch	= this.onRequestSearch.bind(this);

	}

	shouldComponentUpdate(nextProps, nextState) {
		//console.log("Setting::shouldComponentUpdate - ", nextProps, nextState);
		if(nextState.reset && nextProps.rpc_connection_status === 'open') {
			window.location.href = "/";
			this.setState({reset: false});
			/*willTransitionTo(nextProps, nextState, (result, e) => {
				if(result === 'synced') {
					//_This.setState({synced: true});
					HelpActions.setSync(true);
				}
			});*/
			return false;
		}
		return true;
	}

	componentWillReceiveProps(nextProps, nextState) {
		//console.log("Setting::componentWillReceiveProps - ", nextProps, nextState);
		
	}

	handleSetting = (event, value) => {
		console.log("Setting::handleSetting - ", event, value);
		// alert(value);
		// HelpActions.change({status: false, beSynced: false});
		HelpActions.node({currentNode: value});

		Apis.reset(value, true);

		this.setState({
			valueNode: value,
			reset: true
		});
	}

	onChangeSearch = (value) => {
		if(!this.props.searchAccounts.get(value)) {
			AccountActions.accountSearch(value);

			let account = this.props.searchAccounts.findEntry((name) => {
	            return name === value;
	        });

	        console.log("----------------Setting::onChangeSearch - search ", account);
		}

		this.setState({searchContent: value, search: false});
	}

	onRequestSearch = () => {
		console.log('onRequestSearch', this.state.searchContent);

		let {type, content} = this._searchConent();
		this.props.history.push(`/${type}/${content}`);

		this.setState({search: true});
	}

	_searchConent() {

		let content = this.state.searchContent;
		let type = null;

		if(utils.is_object_id(content)) {
			type = 'object';
		} else if(Number(content)) {
			type = 'block';
			content = parseInt(content, 10);
		} else {
			type = 'account'; //content = content;
		}
		
		return {type, content};
	}

	render() {
		let {synced, rpc_connection_status} = this.props;
		let {valueNode, listNode} = this.state;
		//console.log("Setting::render - ", valueNode, listNode);
		//alert(synced);

		let menuItemList = listNode.length? listNode.map((node, key) => {
					//console.log("Setting::render - ", node, key);
					return <MenuItem key={key} primaryText={node.location} value={node.url} />
				}) : null;


		return (
			<div>
			<SearchBar 
					dataSource={this.state.dataSource}
					onChange={this.onChangeSearch}
					onRequestSearch={this.onRequestSearch}
					style={styles.search}
				/>
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

Setting = withRouter(Setting);

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
          },
          searchAccounts: () => {
            return AccountStore.getState().searchAccounts;
          }
        }}
      >
        <Setting {...this.props} />
      </AltContainer>
    );
  }
}

export default SettingContainer;