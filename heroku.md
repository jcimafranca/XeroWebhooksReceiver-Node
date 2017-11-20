1. Add your Heroku URL to your app's callback domain list
2. Set your Heroku env vars (copy and paste the CLI steps below). Set the PRIVATE_KEY in the Heroku UI
3. Update your Webhooks notification address at https://developer.xero.com/myapps

```
heroku config:set USER_AGENT=WebhooksReceiverNode
heroku config:set CONSUMER_KEY=KEYHERE
heroku config:set CONSUMER_SECRET=SECTERHETE
heroku config:set AUTHORIZE_CALLBACK_URL=https://tranquil-bayou-60274.herokuapp.com/callback
heroku config:set WEBHOOKS_KEY=iKEYHERE
```

Set PRIVATE_KEY in the Heroku UI, remember the last line must be an emplty. Please PR is you know how to set this via CLI.
