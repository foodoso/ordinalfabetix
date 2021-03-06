import BaseClient from '@fazland/atlante/lib/Http/Client';
import WebLocalStorage from '@fazland/atlante/lib/Storage/WebLocalStorage';
import BodyConverterDecorator from '@fazland/atlante/lib/Requester/Decorator/BodyConverterDecorator';
import CodeFlowAuthenticator from '@fazland/atlante/lib/Requester/Decorator/Authentication/OpenID/CodeFlowAuthenticator';
import WebRequester from "@fazland/atlante/lib/Requester/WebRequester";
export class Client extends BaseClient {
    constructor(config, ...decorators) {
        const requester = config.requester || new WebRequester();
        const storage = config.token_storage || new WebLocalStorage();
        const baseUrl = typeof window === 'undefined' ? 'http://locahost' : window.location.href;
        const post_logout_redirect_uri = new URL(config.post_logout_redirect_uri || '/', baseUrl).toString();
        const authenticator = new CodeFlowAuthenticator(requester, storage, {
            server_url: config.login_server_url,
            client_id: config.client_id,
            client_secret: config.client_secret,
            openid_scope: config.openid_scopes || ['profile', 'email', 'offline_access'],
            post_logout_redirect_uri,
        });
        super(requester, [
            new BodyConverterDecorator(),
            authenticator,
            ...decorators
        ]);
        this._authenticator = authenticator;
    }
    logout(state) {
        return this._authenticator.logout(state);
    }
}
//# sourceMappingURL=Client.js.map