import BaseClient from '@fazland/atlante/lib/Http/Client';
import RequesterInterface from '@fazland/atlante/lib/Requester/RequesterInterface';
import WebLocalStorage from '@fazland/atlante/lib/Storage/WebLocalStorage';
import BodyConverterDecorator from '@fazland/atlante/lib/Requester/Decorator/BodyConverterDecorator';
import { DecoratorInterface } from '@fazland/atlante/lib/Requester/Decorator/DecoratorInterface';
import CodeFlowAuthenticator from '@fazland/atlante/lib/Requester/Decorator/Authentication/OpenID/CodeFlowAuthenticator';
import WebRequester from "@fazland/atlante/lib/Requester/WebRequester";

interface ClientConfiguration {
    requester?: RequesterInterface,
    login_server_url: string;
    client_id: string;
    client_secret: string;
    openid_scopes?: string[];
}

export class Client extends BaseClient {
    protected _authenticator: CodeFlowAuthenticator;

    constructor(config: ClientConfiguration, ...decorators: DecoratorInterface[]) {
        const requester = config.requester || new WebRequester();
        const authenticator = new CodeFlowAuthenticator(requester, new WebLocalStorage(), {
            server_url: config.login_server_url,
            client_id: config.client_id,
            client_secret: config.client_secret,
            openid_scope: config.openid_scopes || [ 'profile', 'email', 'offline_access' ],
        });

        super(requester, [
            new BodyConverterDecorator(),
            authenticator,
            ...decorators
        ]);

        this._authenticator = authenticator;
    }

    logout(): Promise<void> {
        return this._authenticator.logout();
    }
}
