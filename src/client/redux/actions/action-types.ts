import { IWebhook } from './webhook-actions';
export const ADD_WEBHOOK = 'ADD_WEBHOOK';

export interface IWebhookAction {
	type: string;
	data?: IWebhook;
}
