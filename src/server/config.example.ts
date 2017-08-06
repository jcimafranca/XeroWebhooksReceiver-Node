// Use your Partner App details from https://app.xero.com
// Get your webhooksKey from https://developer.xero.com/webhooks

export const config: IConfig = {
	userAgent: 'Xero Node Webooks Sample App',
	consumerKey: '',
	consumerSecret: '',
	authorizeCallbackUrl: 'http://localhost:8000/callback',
	privateKeyPath: './dist/privatekey.pem',
	webhooksKey: ''
};

export interface IConfig {
	userAgent: string;
	consumerKey: string;
	consumerSecret: string;
	authorizeCallbackUrl: string;
	privateKeyPath: string;
	privateKey?: Buffer;
	webhooksKey: string;
}

