import React, { Component } from 'react';

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
	render() {

		let {base} = this.props;

		let json_key_value = base.entrySeq().map((obj, key) => {
			//console.log("----------BaseFormat::base - ", obj, key);
			return (
				<TableRow key={key}>
					<TableRowColumn>{key}</TableRowColumn>
					<TableRowColumn>{obj[0]}</TableRowColumn>
					<TableRowColumn>{obj[1]}</TableRowColumn>
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

