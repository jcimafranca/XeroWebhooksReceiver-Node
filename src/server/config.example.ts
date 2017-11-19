// Use your Partner App details and webhooks key from https://developer.xero.com/myapps

export function getConfig(): IConfig {
	if (process.env.CONSUMER_KEY) {
		return {
			userAgent: process.env.USER_AGENT,
			consumerKey: process.env.CONSUMER_KEY,
			consumerSecret: process.env.CONSUMER_SECRET,
			authorizeCallbackUrl: process.env.AUTHORIZE_CALLBACK_URL,
			privateKey: process.env.PRIVATE_KEY,
			webhooksKey: process.env.WEBHOOKS_KEY
		};
	} else { return config; }
}

const config: IConfig = {
	userAgent: 'Xero Node Webooks Sample App',
	consumerKey: 'KEYHERE',
	consumerSecret: 'HEYHERE',
	authorizeCallbackUrl: 'http://localhost:8000/callback',
	privateKeyPath: './privatekey.pem',
	webhooksKey: 'KEYHERE'
};

export interface IConfig {
	userAgent: string;
	consumerKey: string;
	consumerSecret: string;
	authorizeCallbackUrl: string;
	privateKeyPath?: string;
	privateKey?: string | Buffer;
	webhooksKey: string;
}
