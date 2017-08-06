import * as React from 'react';
import { connect, ActionCreator } from 'react-redux';

import { IWebhook, addWebhook } from '../redux/actions/webhook-actions';
import { IStore } from '../redux/store/IStore';
import { bindActionCreators } from 'redux';
import ConnectButton from './ConnectButton/connect-button';
import WebhookList from './WebhookList/WebhookList';
import AddHookButton from './AddHookButton/AddHookButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader } from 'material-ui';

interface IProps extends React.Props<any> {
	webhooks: IWebhook[];
}

require('./styles.scss');

class AppContainer extends React.Component<IProps, any> {
	public render() {

		return <div>
			<ConnectButton />
			<p>Visit <a href="/org">/org</a> to see if your Partner app is connected.
			Warning: Your tokens are stored in memory so will be lost when your server restarts.
			You should still get hooks for that Org though.</p>
			<Card>
				<CardHeader title="Send your Webhooks to your public address /webhooks"
					subtitle="You can set this in http://developer.xero.com/myapps/webhooks"/>
			</Card>
			<AddHookButton />
			<WebhookList webhooks={this.props.webhooks} />;
		</div>;
	}
}

function mapStateToProps(state: any) {
	return {
		webhooks: state.webhooks
	};
}

function mapDispatchToProps(dispatch: any) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
