import ClientInterface from '@fazland/atlante/lib/Http/ClientInterface';
import Identifiable from './Identifiable';

export abstract class Resource implements Identifiable {
    protected _client: ClientInterface;
    protected readonly _id: any;

    /**
     * Constructor.
     */
    constructor(client: ClientInterface) {
        this._client = client;
    }

    getIdentifier() {
        return this._id;
    }
}
