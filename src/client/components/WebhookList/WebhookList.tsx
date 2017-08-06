import * as React from 'react';
import { IWebhook } from '../../redux/actions/webhook-actions';
import { Card, CardHeader, CardActions, CardText } from 'material-ui';
import FlatButton from 'material-ui/RaisedButton';
import { webhookReducer } from '../../redux/reducers/webhookReducer';

export interface IWebhookListProps {
	webhooks: IWebhook[];
}

require('./WebhookList.scss');

export default (props: IWebhookListProps) => (
	<div>{
		props.webhooks.map((webHook: IWebhook, i) => {
			return <div className="webhook-card">
				<Card>
					<CardText>{webHook.eventCategory} - {webHook.eventType}</CardText>
					<CardText>{webHook.resourceUrl} </CardText>
					<CardText>{webHook.eventDateUtc} </CardText>
				</Card>
			</div>;
		})
	}
	</div>
);
