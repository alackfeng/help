import React, { Component } from 'react';

//import { ChainStore } from 'fidchainjs/es';
import ChainTypes from './ChainTypes';
import BindToChainState from './BindToChainState';


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
	block: {
		fontSize: 'large',
		textAlign: 'center', 
	}
};


class Main extends Component {

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
			disabled: false,
			dynamicObj: null
		};
		return state;
	}

	componentDidMount() {
		console.log('============ Main::componentDidMount : call ');

		//let content = "2.1.0";
    	let res = null;
    	//res = ChainStore.getObject(content);

    	if(res) {
    		this.setState({dynamicObj: res});
    		//console.log('============ Main::handleSubmit - ',content, res ? res.toJS() : 'undefined');
    	}
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

		//let {dynamicObj} = this.state;
		let dynamicObj = this.props.dynGlobalObject;
		console.log('============ Main::render - ', new Date());

		let block_number = dynamicObj.get
			? dynamicObj.get('head_block_number')
		: 0;
		let block_time = dynamicObj.get
			? dynamicObj.get('time')
		: 0;

		return (
			<div>
				<p style={styles.block}>{block_number} : {block_time}</p>
				<SearchBar 
					dataSource={this.state.dataSource}
					onChange={this.onChangeSearch}
					onRequestSearch={this.onRequestSearch}
					style={styles.search}
				/>
				{/*<div style={styles.main}>{dynamicObj?<BaseFormat base={dynamicObj} />:"Hello World"}</div>*/}
			</div>
		);
	}
}
export default BindToChainState(Main, { keep_updating: true });
