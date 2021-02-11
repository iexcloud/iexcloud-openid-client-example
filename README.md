
# IEX Cloud OpenID Client Example
An example application integrating with IEX Cloud's OpenID service.

## Overview
This library contains two demo applications connecting to IEX Cloud as OpenID identity provider.

### NodeJS
This application is built with node/express via [node-openid-client](https://github.com/panva/node-openid-client) (client) and [express-openid-connect](https://github.com/auth0/express-openid-connect) (middleware). 

### Python
This application is built with python via [pyoidc](https://github.com/OpenIDC/pyoidc) (client) and [Flask-pyoidc](https://github.com/zamzterz/Flask-pyoidc) (middleware).

## Acknowledgements
Many thanks to [Filip Skokan](https://github.com/panva/node-openid-client), [Roland Hedberg](https://github.com/OpenIDC/pyoidc), and [Samuel Gulliksson](https://github.com/zamzterz/Flask-pyoidc) for their libraries and examples.

## Walkthrough
Let's go through all of the steps necessary to create a new application, authenticate and authorize it, and access user and token information.

[Walkthrough](./WALKTHROUGH.md)

## Development

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

This software is licensed under the Apache 2.0 license. See the
[LICENSE](LICENSE) and [AUTHORS](AUTHORS) files for details.
