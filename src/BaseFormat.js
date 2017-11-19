import React, { Component } from 'react';

import Immutable from 'immutable';

import { Block } from "./tcomb_structs";

import {
	Table,
	TableBody,
	TableFooter,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
	propContainer: {
		width: 200,
		overflow: 'hidder', //'inherit',
		margin: '20px auto 0',
		marginRight: '30px',
		float: 'left'
		//display: 'inline-flex'
	},
	propToggleHeader: {
		margin: '20px auto 10px',
	},
};



class KeyValue extends Component {
	render() {
		let {base_key, parent, child} = this.props;
		console.log("----------KeyValue::child - child - ", base_key, parent, child);

		let json_key_value = Immutable.Seq(child.get(0)).entrySeq().map((obj, key) => {
		 	console.log("----------KeyValue::child - ", key, obj[0], obj[1]);

			return (
				<TableRow key={parent + key}>
					<TableRowColumn>{key}</TableRowColumn>
					<TableRowColumn>{obj[0]}</TableRowColumn>
					<TableRowColumn>{JSON.stringify(obj[1])}</TableRowColumn>
				</TableRow>
			);
		});

		return (
			<div><Table><TableBody>{json_key_value}</TableBody></Table></div>
		);
	}
}
class BaseFormat extends Component {

	constructor(props) {
		super(props);

		this.state = {
			fixedHeader: true,
			fixedFooter: true,
			stripedRows: false,
			showRowHover: false,
			selectable: true,
			multiSelectable: false,
			enableSelectAll: false,
			deselectOnClickaway: true,
			showCheckboxes: true,
			height: '500px', // inherit
		};
	}

	handleToggle = (event, toggled) => {
		console.log("----------BaseFormat::handleToggle - ", event.target.name, toggled);
		this.setState({
			[event.target.name]: toggled,
		});
	};

	handleChange = (event) => {
		this.setState({height: event.target.value});
	};

	handleCellClick = (rowNumber, columnId, event) => {
		console.log(" rowNumber:" + rowNumber + ", columnId:" + columnId + ", event: " + event.target.key);
	}

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
			console.log("----------BaseFormat::base - ", obj[0], obj[1], key);

			if(obj[0] === 'transactions') {
				return (
				<TableRow key={key}>
					<TableRowColumn>{key}</TableRowColumn>
					<TableRowColumn>{obj[0]}</TableRowColumn>
					<TableRowColumn><KeyValue key={key} base_key={key} parent={obj[0]} child={obj[1]} /></TableRowColumn>
				</TableRow>
					
				);
			}
			return (
				<TableRow key={key}>
					<TableRowColumn>{key}</TableRowColumn>
					<TableRowColumn>{obj[0]}</TableRowColumn>
					<TableRowColumn>{JSON.stringify(obj[1])}</TableRowColumn>
				</TableRow>
			);
		});

		return (
		<div>
			<div style={styles.propContainer}>
				<h3>Table Properties</h3>
				<TextField
				floatingLabelText="Table Body Height"
				defaultValue={this.state.height}
				onChange={this.handleChange}
				/>
				<Toggle
				name="fixedHeader"
				label="Fixed Header"
				onToggle={this.handleToggle}
				defaultToggled={this.state.fixedHeader}
				/>
				<Toggle
				name="fixedFooter"
				label="Fixed Footer"
				onToggle={this.handleToggle}
				defaultToggled={this.state.fixedFooter}
				/>
				<Toggle
				name="selectable"
				label="Selectable"
				onToggle={this.handleToggle}
				defaultToggled={this.state.selectable}
				/>
				<Toggle
				name="multiSelectable"
				label="Multi-Selectable"
				onToggle={this.handleToggle}
				defaultToggled={this.state.multiSelectable}
				/>
				<Toggle
				name="enableSelectAll"
				label="Enable Select All"
				onToggle={this.handleToggle}
				defaultToggled={this.state.enableSelectAll}
				/>
				<h3 style={styles.propToggleHeader}>TableBody Properties</h3>
				<Toggle
				name="deselectOnClickaway"
				label="Deselect On Clickaway"
				onToggle={this.handleToggle}
				defaultToggled={this.state.deselectOnClickaway}
				/>
				<Toggle
				name="stripedRows"
				label="Stripe Rows"
				onToggle={this.handleToggle}
				defaultToggled={this.state.stripedRows}
				/>
				<Toggle
				name="showRowHover"
				label="Show Row Hover"
				onToggle={this.handleToggle}
				defaultToggled={this.state.showRowHover}
				/>
				<h3 style={styles.propToggleHeader}>Multiple Properties</h3>
				<Toggle
				name="showCheckboxes"
				label="Show Checkboxes"
				onToggle={this.handleToggle}
				defaultToggled={this.state.showCheckboxes}
				/>
			</div>
			<Table
				style={{width: 'auto'}}
				height={this.state.height}
				fixedHeader={this.state.fixedHeader}
				fixedFooter={this.state.fixedFooter}
				selectable={this.state.selectable}
				multiSelectable={this.state.multiSelectable}
				onCellClick={this.handleCellClick.bind(this)}
			>
				<TableHeader

					displaySelectAll={this.state.showCheckboxes}
					adjustForCheckbox={this.state.showCheckboxes}
					enableSelectAll={this.state.enableSelectAll}

				>
					<TableRow>
						<TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
							Super Header
						</TableHeaderColumn>
					</TableRow>
					<TableRow>
						<TableHeaderColumn>ID</TableHeaderColumn>
						<TableHeaderColumn>Key</TableHeaderColumn>
						<TableHeaderColumn>Value</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody
					displayRowCheckbox={this.state.showCheckboxes}
					deselectOnClickaway={this.state.deselectOnClickaway}
					showRowHover={this.state.showRowHover}
					stripedRows={this.state.stripedRows}
				>
					{json_key_value}
				</TableBody>
				<TableFooter
					adjustForCheckbox={this.state.showCheckboxes}
				>
					<TableRow>
						<TableRowColumn>ID</TableRowColumn>
						<TableRowColumn>Key</TableRowColumn>
						<TableRowColumn>Value</TableRowColumn>
					</TableRow>
					<TableRow>
						<TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
							Super Footer
						</TableRowColumn>
					</TableRow>
				</TableFooter>
			</Table>

		</div>
		);
	}
}

export default BaseFormat;

