import os
import datetime
import flask
from flask import Flask, jsonify, render_template, redirect

from flask_pyoidc import OIDCAuthentication
from flask_pyoidc.provider_configuration import ProviderConfiguration, ClientMetadata
from flask_pyoidc.user_session import UserSession

os.environ["CURL_CA_BUNDLE"] = ""

app = Flask(__name__)
app.config.update(
    {
        "OIDC_REDIRECT_URI": "http://localhost:3001/auth/callback",
        "SECRET_KEY": "dev_key",  # make sure to change this!!
        "PERMANENT_SESSION_LIFETIME": datetime.timedelta(days=7).total_seconds(),
        "DEBUG": True,
    }
)


client_config = ClientMetadata(
    "YOUR_CLIENT_ID",  # your id, available in the console,
    "YOUR_CLIENT_SECRET",  # your secret, available in the console
    post_logout_redirect_uri="http://localhost:3001/", # where to go after logout
)
provider_config = ProviderConfiguration(
    issuer="https://iexcloud.io/oidc",
    client_metadata=client_config,
    auth_request_params={"scope": ["openid", "profile", "read:sandbox", "read:pk"]},
)
auth = OIDCAuthentication({"iexcloud": provider_config})

auth.init_app(app)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/private")
@auth.oidc_auth("iexcloud")
def private():
    user_session = UserSession(flask.session)
    app.logger.critical(user_session.userinfo)
    if auth.valid_access_token():
      return render_template(
          "private.html",
          email=user_session.userinfo["email"],
          type=user_session.userinfo["type"],
          sandbox=user_session.userinfo["sandbox"],
          read_pk=user_session.userinfo["token"],
      )
    return redirect("/auth/logout")
    


@app.route("/auth/login")
@auth.oidc_auth("iexcloud")
def login():
    return redirect("/private")


@app.route("/auth/logout")
@auth.oidc_logout
def logout():
    return redirect("/")


@auth.error_view
def error(error=None, error_description=None):
    return jsonify({"error": error, "message": error_description})
