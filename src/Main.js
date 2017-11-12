import React, { Component } from 'react';

import SearchBar from "./SearchBar";


const styles = {
	title: {
		cursor: 'pointer',
	},
	search: {
		margin: '0 auto',
		maxWidth: 500
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
				<SearchBar 
					dataSource={this.state.dataSource}
					onChange={this.onChangeSearch}
					onRequestSearch={this.onRequestSearch}
					style={styles.search}
				/>
			</div>
		);
	}
}
export default Main;