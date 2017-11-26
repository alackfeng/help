import React, { Component } from 'react';

class Blocks extends Component {

	render() {
		console.log("Blocks::render - ", this.props.location.pathname);
		let path_ = this.props.location.pathname;
		return (
			<h1>Hello Router {path_}</h1>
		);
	}
}
export default Blocks;