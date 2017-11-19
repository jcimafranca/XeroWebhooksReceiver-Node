# Xero Webhooks Receiver using TypeScript/Node
This sample application demonstrates how to receive webhooks from Xero.

It uses Socket.io to display the events in a UI in real time. The backing server is Hapi. The front end is React with Redux. Written in TypeScript.

This project will:
1. Accept a POST request from Xero
2. Verify the payload signature
3. Respond with the correct HTTP status code
4. Process the event after responding to Xero

## Prerequisites
- A Partner/Private app and one Xero Organisation, to generate webhook events (https://developer.xero.com/myapps)
- A subscription for your app subscribed to contact events (https://developer.xero.com/myapps)
- ngrok, to tunnel network public traffic to localhost (https://ngrok.com/) There is no need to sign up, you can just download and start using

## Step 1 - Update config
Edit the `config.example.ts` to be `config.ts` to have your correct details

## Step 2 - Serve website locally
To serve from localhost:8000 via nodemon.

```
git clone https://github.com/philals/XeroWebhooksReceiver-Node
cd XeroWebhooksReceiver-Node
npm install
npm run build
npm run serve-watch
```

Output site will be in ./dist

## Step 3 - Make your local server accessible from Xero

Locally, you can use Ngrok to expose a local port over the internet. Ngrok will give you a Ngrok address which will be tunnel to your local port.

1. Download ngrok from https://ngrok.com/ and unzip to a directory of your choice.
2. Open a terminal in the directory and execute `./ngrok http --bind-tls=true 8000`. Ngrok will provide you with a https URL (e.g. https://daaf38b6.ngrok.io).
3. Set your app's webhook delivery URL to {ngrok_address}**/webhooks** (e.g. https://daaf38b6.ngrok.io/webhooks) in the [developer portal](https://developer.xero.com/myapps/webhooks).
4. Create or modify any contact in a Xero Organisation connected to your app and wait for the event to arrive at your XeroWebhooksReceiver server.

## Step 4 - https://developer.xero.com
1. Add localhost to the callback domains for your Partner app
2. Sign up for a Webhook at `https://developer.xero.com/myapps`. Make the POST URL `{your-ngrok-address}/webhooks`. Copy your webhooks key into the config.
3. During this time Xero will send a few test events. Some of these will pass validation and some will not. This is a test to make sure you are validating the payloads correctly.

## Step 5 - Connect an Org and trigger webhooks
1. Go to `localhost:8000`
2. Connect an Org with the Connect button. Note: tokens are held in memory and will be lost when the server restarts. Xero will still send events.
3. Trigger an event by editing a contact: `https://go.xero.com/Contacts/Search/?contactType=CONTYPE%2FALL`

PRs welcome with an issue/discussion

Credits:
- Vanessa for the crypto code

![Screenshot of UI](https://raw.githubusercontent.com/philals/XeroWebhooksReceiver-Node/master/screenshot.png)
