import React, { Component } from 'react';


class Nav extends Component {

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

	render() {
		return (
			<div>
			Welcome Help OS
			</div>
		);
	}
}
export default Nav;