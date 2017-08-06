import * as types from '../actions/action-types';
import { Action, Store } from 'redux';
import { IWebhook } from '../actions/webhook-actions';
import { IWebhookAction } from '../actions/action-types';

const initalState: IWebhook[] = [];

export function webhookReducer(state: IWebhook[] = initalState, action: IWebhookAction = { type: '' }) {
	switch (action.type) {
		case types.ADD_WEBHOOK:
			return [action.data, ...state];
		default:
			return state;
	}
}
