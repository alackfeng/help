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
import AccountContainer from "./AccountContainer";
import MainContainer from "./MainContainer";

const route = () => (
	<Router>
		<div>
			<Route component={App} />
			<Switch>
				<Route exact path="/" component={MainContainer} />
				<Route path="/blocks" component={Blocks} />
				<Route path="/accounts" component={Blocks} />
				<Route path="/subjects" component={Blocks} />
				<Route path="/account/:name" component={AccountContainer} />
				<Route path="/block/:height" component={BlockContainer} />
			</Switch>
		</div>
	</Router>
);

export default route;