/// <reference types="atlante" />
import ClientInterface from '@fazland/atlante/lib/Http/ClientInterface';
export declare class Resource {
    protected _client: ClientInterface;
    /**
     * Constructor.
     */
    constructor(client: ClientInterface);
}
