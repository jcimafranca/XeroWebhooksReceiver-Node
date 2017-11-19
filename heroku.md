```
heroku config:set USER_AGENT=WebhooksReceiverNode
heroku config:set CONSUMER_KEY=KEYHERE
heroku config:set CONSUMER_SECRET=SECTERHETE
heroku config:set AUTHORIZE_CALLBACK_URL=https://tranquil-bayou-60274.herokuapp.com/callback
heroku config:set WEBHOOKS_KEY=iKEYHERE
```

Set PRIVATE_KEY in the Heroku UI, remember the last line must be an emplty. Please PR is you know how to set this via CLI.
