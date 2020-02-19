Ordinalfabetix
==============
##### Code always smells like rotten fish.

JS client for SDKs with centralized authentication logic.

![Ordinalfabetix](Resources/ordinalfabetix.gif)

## Usage

Import and instantiate `Client` class from this package.

The client accepts the following options:

| Key              | Mandatory | Type                                       | Description                                                                                      |
|------------------|-----------|--------------------------------------------|--------------------------------------------------------------------------------------------------|
| requester        | no        | RequesterInterface (from @fazland/atlante) | The http requester. By default an implementation using XMLHttpRequest is used.                   |
| client_id        | yes       | string                                     | The OAuth client ID                                                                              |
| client_secret    | yes       | string                                     | The OAuth client secret. An empty string should be passed if client has no secret                |
| login_server_url | yes       | string                                     | The OpenID connect (hydra) server base url.                                                      |
| openid_scopes    | no        | string[]                                   | The scopes to be required during token request. Defaults to `[ profile, email, offline_access ]` |

The client accepts additional parameters to the constructor implementing `DecoratorInterface` (from @fazland/atlante package).
Every sdk package should expose at least one decorator to instruct the client on which server the calls should be performed.

__The current convention is to identify matching requests based on a fake hostname (correspoding to the project name)__

Ex:

  `http://core-api/menus` should be routed to the `/menus` endpoint of `core-api` (`https://api.foodoso.com/menus`)  
  `http://identity/identities` should be routed to the `/identities` endpoint of identity server (`https://id.foodoso.com/identities`)

__Every non-matching request MUST be returned unmodified by the request decorator__
