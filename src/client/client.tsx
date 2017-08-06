import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import AppContainer from './components/AppContainer';
import rootReducer from './redux/reducers/reducers';
import { IStore } from './redux/store/IStore';

import createSocketIoMiddleware from 'redux-socket.io';
import * as io from 'socket.io-client';
let socket = io('/');

let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
let store: Store<any> = createStore(rootReducer, applyMiddleware(socketIoMiddleware));

store.subscribe(() => {
	console.log('new client state', store.getState());
});

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider >
		<AppContainer />
		</ MuiThemeProvider >
	</ Provider>,
	document.getElementById('app')
);
