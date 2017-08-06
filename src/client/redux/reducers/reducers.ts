import { combineReducers } from 'redux';
import { webhookReducer } from '../reducers/webhookReducer';

function socketReducer(state = {}, action: any) {
	switch (action.type) {
		case 'message':
			// tslint:disable-next-line:prefer-object-spread
			return Object.assign({}, { message: action.data });
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	webhooks: webhookReducer,
	socket: socketReducer
});

export default rootReducer;
