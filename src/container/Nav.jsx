import React, { Component } from 'react';

import ChainTypes from 'lib/ChainTypes';
import BindToChainState from 'lib/BindToChainState';

import IntlFormat from "lib/Intl";

/*
const styles = {
	block: {
		fontSize: 'large',
		textAlign: 'center', 
	}
};
*/


class Nav extends Component {


	static propTypes = {
		dynGlobalObject: ChainTypes.ChainObject.isRequired
	};

	static defaultProps = {
		dynGlobalObject: '2.1.0'
	};

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
			disabled: false
		};
		return state;
	}

	onChangeSearch(value) {
		console.log('onChangeSearch', value);
		//this.setState({dataSource: [ value, value+value, value+value+value]})
		this.setState({searchContent: value});
	}

	onRequestSearch() {
		console.log('onRequestSearch', this.state.searchContent);
	}

	_getBlock() {
		let dynamicObj = this.props.dynGlobalObject;
		console.log('============ Nav::_getBlock - ', new Date());

		let block_number = dynamicObj.get
			? dynamicObj.get('head_block_number')
		: 0;
		let block_time = dynamicObj.get
			? dynamicObj.get('time')
		: 0;

		block_time = new Date(block_time + "Z").toLocaleString();

		return {block_number, block_time};
	}

	render() {

		let {block_number, block_time} = this._getBlock();

		//let welcome = IntlFormat.get("languages", "en", {locale: "cn"});
		let welcome = IntlFormat.get("welcome", "Welcome");

		return (
			<div>
			<img width="32" src="/aft_logo.png" alt={welcome} />
			<span> : {block_number} - {block_time}</span>

			</div>
		);
	}
}
export default BindToChainState(Nav, { keep_updating: true , show_loader: true});