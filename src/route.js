import React from 'react';

import {
  BrowserRouter as Router,
  Route,
 // Link,
  Switch
} from 'react-router-dom';


import App from "./App";
import Blocks from "container/Blocks";
import Accounts from "container/Accounts";
import BlockContainer from "container/BlockContainer";
import AccountContainer from "container/AccountContainer";
import ChainContainer from "container/ChainContainer";
import MainContainer from "container/MainContainer";

const route = () => (
	<Router>
		<div>
			<Route component={App} />
			<Switch>
				<Route exact path="/" component={MainContainer} />
				<Route path="/blocks" component={Blocks} />
				<Route path="/accounts" component={Accounts} />
				<Route path="/subjects" component={Blocks} />
				<Route path="/account/:name" component={AccountContainer} />
				<Route path="/block/:height" component={BlockContainer} />
				<Route path="/object/:object" component={ChainContainer} />
			</Switch>
		</div>
	</Router>
);

export default route;