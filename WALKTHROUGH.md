## Walkthrough
Let's go through all of the steps necessary to create a new application, authenticate and authorize it, and access user and token information.

First, we log in to the [IEX Cloud Console](https://iexcloud.io/console) and navigate to the `OAuth` tab on the left side navigator.

![](https://github.com/iexg/iexcloud-openid-client-example/blob/main/docs/1.png?raw=true)


Now let's bring up the dialog to create a new OAuth application by clicking the button on the top right

![](https://github.com/iexg/iexcloud-openid-client-example/blob/main/docs/2.png?raw=true)

This dialog includes the required field for any OAuth application. These include a name, description, redirect url, and one or more scopes of user information.

![](https://github.com/iexg/iexcloud-openid-client-example/blob/main/docs/3.png?raw=true)

Let's fill these in based on what this repo expects for the demo application, and click "Add new OAuth App"

![](https://github.com/iexg/iexcloud-openid-client-example/blob/main/docs/4.png?raw=true)

We should see our new OAuth application in the top table.

![](https://github.com/iexg/iexcloud-openid-client-example/blob/main/docs/5.png?raw=true)

IEX Cloud uses the `client_secret_post` authentication method for token endpoints, so you will need the `client id` and `client secret` which you can reveal by clicking.

![](https://github.com/iexg/iexcloud-openid-client-example/blob/main/docs/6.png?raw=true)

Copy and paste these values into either the [js server file](js/src/server.js)...

![](https://github.com/iexg/iexcloud-openid-client-example/blob/main/docs/7js.png?raw=true)

...or the [python app file](python/iexcloud_openid_client_example/app.py)

![](https://github.com/iexg/iexcloud-openid-client-example/blob/main/docs/7py.png?raw=true)

Now lets run our sample application. From the [js](./js) folder you can run `yarn start`, or from the [python](./python) folder run `python -m iexcloud_openid_client_example`. Once started, navigate to `http://localhost:3001` in your browser.

**Note:** these examples are configured to ignore TLS, which should be reenabled when deployed. 

We should see our web page, with the option to `Login with IEX Cloud`.

![](https://github.com/iexg/iexcloud-openid-client-example/blob/main/docs/8.png?raw=true)

If we click on this and login to IEX Cloud, we will see a dialog to authorize our OAuth client to access the scopes selected during the client creation step. 

![](https://github.com/iexg/iexcloud-openid-client-example/blob/main/docs/9.png?raw=true)

Upon authorization, we will be redirected back to our client application's `redirect URL`, with the information corresponding to the selected scopes in hand (note, they are obgfuscated in this screenshot).

![](https://github.com/iexg/iexcloud-openid-client-example/blob/main/docs/10.png?raw=true)







