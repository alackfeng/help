import React, { Component } from 'react';

import Account from "./Account";

class Accounts extends Component {

	render() {
		console.log("Accounts::render - ", this.props.location.pathname);
		let path_ = this.props.location.pathname;
		return (
			<div>
			<h1>Hello Router Accounts {path_}</h1>
			<Account synced={false} account={"nathan"} />
			</div>
		);
	}
}
export default Accounts;