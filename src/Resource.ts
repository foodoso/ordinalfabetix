import ClientInterface from '@fazland/atlante/lib/Http/ClientInterface';

export class Resource {
    protected _client: ClientInterface;

    /**
     * Constructor.
     */
    constructor(client: ClientInterface) {
        this._client = client;
    }
}
