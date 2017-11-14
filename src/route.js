import React from 'react';

import {
  BrowserRouter as Router,
  Route,
 // Link,
  Switch
} from 'react-router-dom';


import App from "./App";
import Blocks from "./Blocks";
import BlockContainer from "./BlockContainer";

const route = () => (
	<Router>
		<div>
			<Route component={App} />
			<Switch>
				<Route exact path="/" />
				<Route path="/blocks" component={Blocks} />
				<Route path="/accouts" component={Blocks} />
				<Route path="/subjects" component={Blocks} />
				<Route path="/block" component={BlockContainer} />
			</Switch>
		</div>
	</Router>
);

export default route;