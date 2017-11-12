import React, { Component } from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
//import FlatButton from 'material-ui/FlatButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';

const styles = {
	bar: {
		backgroundColor: 'inherit'
	},
};

class NavLeft extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value: 3,
		};

		this.handleChange	= this.handleChange.bind(this);
		this.handleSelectMenu = this.handleSelectMenu.bind(this);
		this.handleSelectItem = this.handleSelectItem.bind(this);
	}

	static muiName = 'DropDownMenu';

	handleChange = (event, index, value) => {
		console.log("NavLeft::handleChange - ", index, value);
		this.setState({value: index});
	};

	handleSelectMenu = (event) => {
		console.log("NavLeft::handleSelectMenu - ", event.target);
	};

	handleSelectItem = (event, child) => {
		console.log("NavLeft::handleSelectItem - ", event.target, child);
	};

	render() {
		console.log("NavLeft::render - ", this.state.value);
		return (
			<Toolbar style={styles.bar}>

				<ToolbarGroup>
					<IconMenu
						iconButtonElement={<IconButton touch={true}><NavigationMenu /></IconButton>}
						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						targetOrigin={{horizontal: 'left', vertical: 'top'}}
						onChange={this.handleChange}
						value={this.state.value}
						onClick={this.handleSelectMenu}
						onItemTouchTap={this.handleSelectItem}
					>
						<MenuItem value={1}><a href="#">Home2</a></MenuItem>
						<MenuItem value={2} primaryText="Blocks" />
						<MenuItem value={3} primaryText="Accounts" />
						<MenuItem value={4} primaryText="Subjects" />
					</IconMenu>
					<ToolbarSeparator />
				</ToolbarGroup>
				{/*<ToolbarGroup>
					<FlatButton label="settings" containerElement={<a href="#">settings</a>} />
				</ToolbarGroup> */}
			</Toolbar>
		);
	}
}
export default NavLeft;