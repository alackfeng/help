import React, { Component } from 'react';

//import { ChainStore } from 'fidchainjs/es';
import ChainTypes from './ChainTypes';
import BindToChainState from './BindToChainState';

import Immutable from 'immutable';

import Block from "./Block"; 
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

		return (
			!Immutable.is(this.state.block_sh !== nextState.block_sh)
			|| this.props.blocks !== nextProps.blocks
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

	render() {

		// block height
		let {blocks} = this.props;
		let {search} = this.state;
	    let height = parseInt(this.state.searchContent, 10);

		return (
			<div>
				
				<SearchBar 
					dataSource={this.state.dataSource}
					onChange={this.onChangeSearch}
					onRequestSearch={this.onRequestSearch}
					style={styles.search}
				/>
				{/*<div style={styles.main}>{dynamicObj?<BaseFormat base={dynamicObj} />:"Hello World"}</div>*/}
				{ (search && height >= 0) ? <Block blocks={blocks} height={height} /> : null}
			</div>
		);
	}
}
export default BindToChainState(Main, { keep_updating: true });


