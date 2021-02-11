"use strict";

const express = require("express");
const expressWs = require("express-ws");
const path = require("path");

// store the code_verifier in your framework's session mechanism, if it is a cookie based solution
// it should be httpOnly (not readable by javascript) and encrypted.

const {auth, requiresAuth} = require("express-openid-connect");

// TODO remove when deploying
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

/**
 * Create express app
 */
const app = express();
expressWs(app);

/**
 * use pug
 */
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

/**
 * Setup auth
 */
app.use(
  auth({
    authRequired: false, // per-url permissions
    issuerBaseURL: "https://iexcloud.io/oidc/.well-known/openid-configuration",
    baseURL: "http://localhost:3001", // base url of your application
    clientID: "YOUR_CLIENT_ID", // your id, available in the console
    secret: "YOUR_CLIENT_SECRET", // your secret, available in the console
    clientSecret: "YOUR_CLIENT_SECRET", // your secret, available in the console
    authorizationParams: {
      response_type: "code",
      scope: "openid profile read:sandbox read:pk",
    },
    routes: {
      callback: "/auth/callback", // rest of redirect url, make sure `baseURL` + `callback` matches what you've submitted online
      login: false, // custom login route
      postLogoutRedirect: "/", // where to go after logout
    },
  })
);

/**
 *  serve index.html
 */
app.get("/", (req, res) => {
  res.render("index");
});

/**
 * login handler
 */
app.get("/auth/login", (req, res) => res.oidc.login({returnTo: "/private"}));

/**
 * logout handler
 */
app.get("/auth/logout", (req, res) => res.oidc.logout({returnTo: "/"}));

/**
 * Require oauth before accessing this endpoint
 */
app.get("/private", requiresAuth(), async (req, res) => {
  const userInfo = await req.oidc.fetchUserInfo();
  res.render("private", {
    email: userInfo.email,
    type: userInfo.type,
    sandbox: userInfo.sandbox,
    read_pk: userInfo.token,
  });
});

/**
 * Launch express
 */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening to http://0.0.0.0:${PORT} ....`);

  // eslint-disable-next-line no-console
  console.log("Press Ctrl+C to quit.");
});
