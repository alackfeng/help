import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


import App from "./App";
import Blocks from "./Blocks";

const route = () => (
	<Router>
		<div>
			<App />
			<Route exact path="/" />
			<Route path="/blocks" component={Blocks} />
			<Route path="/accouts" component={Blocks} />
			<Route path="/subjects" component={Blocks} />
		</div>
	</Router>
);

export default route;