import * as types from './action-types';
import { IWebhookAction } from './action-types';

export interface IWebhook {
	resourceUrl: string;
	resourceId?: string;
	eventDateUtc: string;
	eventType?: string;
	eventCategory?: string;
	tenantId?: string;
	tenantType?: string;
}

export const addWebhook = (webhook: IWebhook) => {
	return {
		type: types.ADD_WEBHOOK,
		data: webhook
	} as IWebhookAction;
};
