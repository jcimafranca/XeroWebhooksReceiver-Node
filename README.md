# Xero Webhooks Receiver using Typesctipt/Node
This sample application demonstrates how to receive webhooks from Xero. It uses Socket.io to display the events in a UI in real time.

1. Accept a POST request from Xero
2. Verify the payload signature
3. Respond with the correct HTTP status code
4. Process the event after responding to Xero

## Prerequisites
- A Partner app and one Xero Organisation, to generate webhook events (https://app.xero.com/Application/)
- A subscription for your app subscribed to contact events (https://developer.xero.com/myapps)
- ngrok, to tunnel network public traffic to localhost (https://ngrok.com/)
- Edit the `config.example.ts` to have your correct details

## Serve website locally
To serve from localhost:8000 via nodemon.

```
git clone https://github.com/philals/react-redux-typescript-clientside-boilerplate.git
cd react-redux-typescript-clientside-boilerplate
npm install
npm run build
npm run serve-watch
```

Output site will be in ./dist

## Making your local server accessible from Xero
1. Download ngrok from https://ngrok.com/ and unzip to a directory of your choice.
2. Open a terminal in the directory and execute `./ngrok http --bind-tls=true 8000`. Ngrok will provide you with a https URL (e.g. https://daaf38b6.ngrok.io).
3. Set your app's webhook delivery URL to {ngrok_address}**/webhooks** (e.g. https://daaf38b6.ngrok.io/webhooks) in the [developer portal](https://developer.xero.com/myapps/webhooks).
4. Create or modify any contact in a Xero Organisation connected to your app and wait for the event to arrive at your XeroWebhooksReceiver server.

PRs welcome with an Issue

Credits:
- Vanessa for the crypto code
