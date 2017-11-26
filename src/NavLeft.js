import React, { Component } from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
//import FlatButton from 'material-ui/FlatButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';

import { Link } from 'react-router-dom';

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
						<MenuItem value={1} primaryText="Home" containerElement={<Link to="/" />} />
						<MenuItem value={2} primaryText="Blocks" containerElement={<Link to="/blocks" />} />
						<MenuItem value={3} primaryText="Accounts" containerElement={<Link to="/accounts" />} />
						<MenuItem value={4} primaryText="Subjects" containerElement={<Link to="/blocks" />} />
						<Link to="/blocks" />
					</IconMenu>
					<ToolbarSeparator />
				</ToolbarGroup>
			</Toolbar>
		);
	}
}
export default NavLeft;