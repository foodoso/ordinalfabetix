/// <reference types="atlante" />
import BaseClient from '@fazland/atlante/lib/Http/Client';
import RequesterInterface from '@fazland/atlante/lib/Requester/RequesterInterface';
import { DecoratorInterface } from '@fazland/atlante/lib/Requester/Decorator/DecoratorInterface';
import CodeFlowAuthenticator from '@fazland/atlante/lib/Requester/Decorator/Authentication/OpenID/CodeFlowAuthenticator';
interface ClientConfiguration {
    requester?: RequesterInterface;
    login_server_url: string;
    client_id: string;
    client_secret: string;
    openid_scopes?: string[];
}
export declare class Client extends BaseClient {
    protected _authenticator: CodeFlowAuthenticator;
    constructor(config: ClientConfiguration, ...decorators: DecoratorInterface[]);
    logout(): Promise<void>;
}
export {};
