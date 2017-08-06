import * as React from 'react';
import FlatButton from 'material-ui/RaisedButton';
import { IWebhook } from '../../redux/actions/webhook-actions';

require('./AddHookButton.scss');

function postTestHook() {
	let timeUTC = new Date().toUTCString();

	let hook = {
		events: [
			{
				resourceUrl: 'https://api.xero.com/api.xro/2.0/Contacts/717f2bfc-c6d4-41fd-b238-3f2f0c0cf777',
				resourceId: '717f2bfc-c6d4-41fd-b238-3f2f0c0cf777',
				eventDateUtc: timeUTC,
				eventType: 'Update',
				eventCategory: 'CONTACT',
				tenantId: 'c2cc9b6e-9458-4c7d-93cc-f02b81b0594f',
				tenantType: 'ORGANISATION'
			}
		],
		LastEventSequence: 1,
		FirstEventSequence: 1
	};

	fetch('/webhooks', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'x-xero-signature': 'this-is-just-a-test-so-wont-pass-validation'
		},
		body: JSON.stringify(hook)
	});

}

export default () => {
	return <div className="add-hook-button"><FlatButton label="Post hook to yourself..." onClick={postTestHook} /></div>;
};
