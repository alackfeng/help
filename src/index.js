import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Route from "./route";
import registerServiceWorker from './registerServiceWorker';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: green500,
		primary2Color: green700,
		primary3Color: green100,
	},
}, {
	avatar: {
		borderColor: null,
	},
	userAgent: 'all',
})

console.log("muiTheme: ", muiTheme);
ReactDOM.render(
	<MuiThemeProvider>
		<Route />
	</MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();
