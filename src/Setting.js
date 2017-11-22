import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
//import NavigationClose from 'material-ui/svg-icons/navigation/close';
//import NavigationMenu from 'material-ui/svg-icons/navigation/menu';



const Logged = (props) => (
	<FlatButton {...this.props} label="AFT-setting"></FlatButton>
);
Logged.muiName = 'FlatButton';


class Setting extends Component {
	static muiName = 'IconMenu';

	constructor(props) {
		super(props);

		this.handleSetting = this.handleSetting.bind(this);
	}


	handleSetting = (event, set) => {
		console.log("Setting::handleSetting - ", event, set);
		alert(event.target.value);
	}

	render() {
		return (
			<div>
			<IconMenu
				{...this.props}
				iconButtonElement={
					<IconButton><MoreVertIcon /></IconButton>
				}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			>
				<MenuItem primaryText="19.23.40.206-AFT-node1" onClick={this.handleSetting} />
				<MenuItem primaryText="19.23.40.206-AFT-node2" onClick={this.handleSetting} />
				<MenuItem primaryText="19.23.40.206-AFT-node3" onClick={this.handleSetting} />
			</IconMenu>
			</div>
		);
	}
}

export { Logged as default, Setting };