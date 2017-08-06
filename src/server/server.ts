import * as Hapi from 'hapi';
import * as Inert from 'inert';
import * as path from 'path';
import * as socket_io from 'socket.io';
import * as fs from 'fs';
import * as crypto from 'crypto';

import * as xero from 'xero-node';
import { config } from './config';
let xeroClient: any = {};

// Private key can either be a path or a String so check both variables and make sure the path has been parsed.
if (config.privateKeyPath && !config.privateKey) {
	config.privateKey = fs.readFileSync(config.privateKeyPath);
}

try {
	xeroClient = new xero.PartnerApplication(config);
} catch (error) {
	console.error(error);
}

const server = new Hapi.Server();

let port = 8000;
if (process.env.PORT) {
	port = +process.env.PORT;
}

server.connection({
	host: 'localhost',
	port: port
});

const io = socket_io(server.listener, { serveClient: false });

io.on('connection', function(socket) {
	console.log('new connection made');
});

server.register([Inert])
	.then((error) => {
		if (error) { console.error('Error registering plugins', error); }

		registerRoutes(server);

		server.start((err) => {

			if (err) {
				throw err;
			}

			console.log('Server running at:', server.info.uri);
		});
	});

let oauthToken = '';
let oauthSecret = '';

function validateEventIsFromXero(request: Hapi.Request) {
	let computedSignature = crypto.createHmac('sha256', config.webhooksKey)
		.update(request.payload.toString()).digest('base64');

	let xeroSignature = request.headers['x-xero-signature'];

	if (xeroSignature === computedSignature) {
		console.log('Signature passed! This is from Xero!');
	} else {
		// If this happens someone who is not Xero is sending you a webhook
		console.log('Signature failed. Webhook might not be from Xero or you have misconfigured something...');
		console.log(`Got {${computedSignature}} when we were expecting {${xeroSignature}}`);
	}
}

function registerRoutes(server: Hapi.Server) {
	// Add a route to serve static assets (CSS, JS, IMG)
	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: 'dist/public',
				index: ['index.html']
			}
		}
	});

	server.route({
		method: 'POST',
		path: '/webhooks',
		config: {
			payload: {
				output: 'data',
				parse: false
			}
		},
		handler: async function(request, reply) {
			reply().code(200); // Reply with 200 ASAP and continue to process event

			validateEventIsFromXero(request);

			try {
				io.emit('webhook-recieved', request.payload);
				io.emit('action', { type: 'ADD_WEBHOOK', data: JSON.parse(request.payload.toString()).events[0] });
			} catch (error) {
				console.error(error);
			}
		}
	});

	server.route({
		method: 'GET',
		path: '/connect',
		handler: function(request, reply) {
			xeroClient.getRequestToken((err: any, token: any, secret: any) => {
				if (!err) {
					// these variables will be used in the callback
					oauthToken = token;
					oauthSecret = secret;

					const url = xeroClient.buildAuthorizeUrl(token);
					console.log('url:', url);
					return reply().redirect(url);
				} else {
					console.log(err);
				}
			});
		}
	});

	server.route({
		method: 'GET',
		path: '/callback',
		handler: function(request, reply) {

			const verifier = request.query.oauth_verifier;
			xeroClient.setAccessToken(oauthToken, oauthSecret, verifier)
				.then(() => {
					// We're connected to Xero so get something useful!
					xeroClient.core.organisations.getOrganisation()
						.then((organisation: any) => {
							console.log('OrgName: ', organisation.Name);
							return reply().redirect('/');
						});
				})
				.catch((err: Error) => {
					console.log(err);
					reply(err);
				});
		}
	});

	server.route({
		method: 'GET',
		path: '/org',
		handler: async function(request, reply) {
			try {
				const org = await xeroClient.core.organisations.getOrganisation();
				return reply(org);
			} catch (error) {
				console.log(error);
				reply(error);
			}
		}
	});
}
