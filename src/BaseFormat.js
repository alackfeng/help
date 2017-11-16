import React, { Component } from 'react';

import Immutable from 'immutable';

import { Block } from "./tcomb_structs";

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

/*
class KeyValue extends Component {
	render() {
		let {item, value} = this.props;
		return (<span>{item} : {value}</span>);
	}
} */
class BaseFormat extends Component {


	/*
		block object
	*/
	_parse(base) {
		if(typeof base === 'object') {
			let block = Object.assign({}, base);
			let block_map = Immutable.fromJS(block);
			console.log("---------------BaseFormat::_parse - block ", block_map);
			return Immutable.Seq(block_map);
		}
	}

	render() {

		let {base} = this.props;
		console.log("---------------BaseFormat::Render - type ",typeof base);
		let res = this._parse(base);

		let json_key_value = res.entrySeq().map((obj, key) => {
			// DEBUG console.log("----------BaseFormat::base - ", obj, key);
			return (
				<TableRow key={key}>().
					<TableRowColumn>{key}</TableRowColumn>
					<TableRowColumn>{obj[0]}</TableRowColumn>
					<TableRowColumn>{JSON.stringify(obj[1])}</TableRowColumn>
				</TableRow>
			);
		});

		return (
			<Table>
				<TableHeader>
					<TableRow>
						<TableHeaderColumn>ID</TableHeaderColumn>
						<TableHeaderColumn>Key</TableHeaderColumn>
						<TableHeaderColumn>Value</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
					{json_key_value}
				</TableBody>
			</Table>
		);
	}
}

export default BaseFormat;

