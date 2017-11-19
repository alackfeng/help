import React, { Component } from 'react';

import ChainTypes from './ChainTypes';
import BindToChainState from './BindToChainState';

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

		return (
			<div>
			Welcome Help OS, {block_number} Height -: {block_time}
			</div>
		);
	}
}
export default BindToChainState(Nav, { keep_updating: true , show_loader: true});