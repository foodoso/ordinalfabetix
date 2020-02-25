/// <reference types="atlante" />
import BaseClient from '@fazland/atlante/lib/Http/Client';
import RequesterInterface from '@fazland/atlante/lib/Requester/RequesterInterface';
import { DecoratorInterface } from '@fazland/atlante/lib/Requester/Decorator/DecoratorInterface';
import CodeFlowAuthenticator from '@fazland/atlante/lib/Requester/Decorator/Authentication/OpenID/CodeFlowAuthenticator';
import StorageInterface from "@fazland/atlante/lib/Storage/StorageInterface";
interface ClientConfiguration {
    requester?: RequesterInterface;
    token_storage?: StorageInterface;
    login_server_url: string;
    client_id: string;
    client_secret: string;
    openid_scopes?: string[];
}
export declare class Client extends BaseClient {
    protected _authenticator: CodeFlowAuthenticator;
    constructor(config: ClientConfiguration, ...decorators: DecoratorInterface[]);
    logout(state?: string): Promise<void>;
}
export {};
