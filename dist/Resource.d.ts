/// <reference types="atlante" />
import ClientInterface from '@fazland/atlante/lib/Http/ClientInterface';
import Identifiable from './Identifiable';
export declare abstract class Resource implements Identifiable {
    protected _client: ClientInterface;
    protected readonly _id: any;
    /**
     * Constructor.
     */
    constructor(client: ClientInterface);
    getIdentifier(): any;
}
