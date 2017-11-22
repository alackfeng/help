import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
//import IconButton from 'material-ui/IconButton';
//import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
//import FlatButton from 'material-ui/FlatButton';
//import Toggle from 'material-ui/Toggle';


import Logged, { Setting } from "./Setting";
import Nav from "./Nav";
import NavLeft from "./NavLeft";

//function handleTouchTap(e) {
//  	console.log('onClick triggered on the title component - ' + e.target);
//}



class Header extends Component {

	state = {
		logged: false,
	}

	handleChange = (event, logged) => {
		this.setState({logged: logged});
	}

	render() {
		return (
		<div>
			<AppBar 
				title={<Nav />}
				iconElementLeft={<NavLeft />}
				iconElementRight={this.state.logged ? <Logged /> : <Setting />}
			/>
		</div>
		);
	}
}

export default Header;