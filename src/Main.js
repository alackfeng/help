import React, { Component } from 'react';

//import { ChainStore } from 'fidchainjs/es';
import ChainTypes from './ChainTypes';
import BindToChainState from './BindToChainState';

import Immutable from 'immutable';

import Block from "./Block"; 
import Account from "./Account";

import SearchBar from "./SearchBar";
import BaseFormat from "./BaseFormat";



const styles = {
	title: {
		cursor: 'pointer',
	},
	search: {
		margin: '0 auto',
		maxWidth: 500
	},
	main: {
		textAlign: 'center', 
		margin: 30,
		top: 100,
	},
	
};


class Main extends Component {

	constructor() {
		super();

		this.state = this._getInitState();

		this.onChangeSearch 	= this.onChangeSearch.bind(this);
		this.onRequestSearch	= this.onRequestSearch.bind(this);
	}

	_getInitState() {
		let state = {
			dataSource: ["helloworld","how are you", "fine", "feng", "block", "transaction", "123"],
			searchContent: null,
			disabled: false,
			search: false
		};
		return state;
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('============ Main::shouldComponentUpdate : call ');
		return (
			!Immutable.is(this.state.block_sh !== nextState.block_sh)
			|| this.props.blocks !== nextProps.blocks
			|| this.props.accounts !== nextProps.accounts
		);
	}

	componentDidMount() {
		console.log('============ Main::componentDidMount : call ');
	}

	onChangeSearch(value) {
		console.log('onChangeSearch', value);
		//this.setState({dataSource: [ value, value+value, value+value+value]})
		this.setState({searchContent: value, search: false});
	}

	onRequestSearch() {
		console.log('onRequestSearch', this.state.searchContent);
		this.setState({search: true});
	}

	_searchConent() {

		let content = this.state.searchContent;
		let type = null;

		if(Number(content)) {
			type = 'block';
			content = parseInt(content, 10);

		} else {
			type = 'account'; //content = content;
		}
		
		return {type, content};
	}

	render() {

		// block height
		let {blocks, accounts} = this.props;
		let {search} = this.state;
	    let {type, content} = this._searchConent();
	    console.log('============ Main::render : call ');
		return (
			<div>
				
				<SearchBar 
					dataSource={this.state.dataSource}
					onChange={this.onChangeSearch}
					onRequestSearch={this.onRequestSearch}
					style={styles.search}
				/>
				{/*<div style={styles.main}>{dynamicObj?<BaseFormat base={dynamicObj} />:"Hello World"}</div>*/}
				{ (type === 'block' && search && content >= 0) ? <Block blocks={blocks} height={content} /> : null}
				{ (type === 'account' && search && content) ? <Account accounts={accounts} name={content} /> : null}
			</div>
		);
	}
}
export default BindToChainState(Main, { keep_updating: true });


