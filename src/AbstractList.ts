import ArrayUtils from '@fazland/atlante/lib/Utils/ArrayUtils';
import ClientInterface from '@fazland/atlante/lib/Http/ClientInterface';
import Response from '@fazland/atlante/lib/Requester/Response';
import { Urn } from './Urn';

export abstract class AbstractList<T = any, C extends new() => AbstractList = any> {
    static readonly LOCATION;

    /**
     * Max results which this list iterates on.
     */
    protected _maxResults: number;

    /**
     * Already initialized summary objects collection.
     */
    protected _collection: Record<string, T> = {};
    protected _client: ClientInterface;
    protected _filters: Record<string, any>;
    protected _totalCount: number;
    protected _continuationToken: string;

    /**
     * Iterates on the list.
     */
    async * [Symbol.asyncIterator](): AsyncIterableIterator<T> {
        const collectionValues = Object.values(this._collection);

        let count = collectionValues.length;
        yield * collectionValues;
        let loop;

        do {
            const generator = this.next();
            loop = false;
            for await(const element of generator) {
                if (undefined !== this._maxResults && this._maxResults <= count++) {
                    return;
                }

                loop = true;
                yield element;
            }

            if (! this._continuationToken) {
                break;
            }
        } while (loop);
    }

    /**
     * Returns a copy of this object with max results set.
     */
    withMaxResults(maxResults?: number): AbstractList<T, C> {
        if (0 >= maxResults) {
            throw new Error('Max results must be greater than 0');
        }

        const obj = new (<C>this.constructor)();
        obj._client = this._client;
        obj._filters = this._filters;
        obj._maxResults = maxResults;

        return obj;
    }

    /**
     * Gets the total count.
     */
    get length(): number {
        return this._totalCount;
    }

    /**
     * Cycle on next page.
     */
    async * next(): AsyncIterableIterator<T> {
        const filters = { ...this._filters, continue: String(this._continuationToken) };

        const url = new URL((<typeof AbstractList>this.constructor).LOCATION, 'http://localhost');
        for (const [ key, value ] of Object.entries(filters)) {
            if (undefined === value || null === value) {
                continue;
            }

            url.searchParams.append(key, value);
        }

        const response = await this._client.request(
            'GET',
            'localhost' === url.hostname ? url.pathname + url.search : url.href
        );

        for (const [ id, obj ] of this._generateFromResponse(response)) {
            if (undefined === this._collection[id]) {
                yield obj;
            }

            this._collection[id] = obj;
        }
    }

    private * _generateFromResponse(response: Response): IterableIterator<[string, T]> {
        this._totalCount = ~~response.headers.get('X-Total-Count');
        this._continuationToken = response.headers.get('X-Continuation-Token') as string;

        const objects = ArrayUtils.toCamelCaseKeys(<any[]>response.data);
        for (const fields of objects) {
            const [ id, obj ] = this._createSummary(fields);

            Object.freeze(obj);
            yield [ id, obj ];
        }
    }

    /**
     * Creates a summary object from a response object.
     */
    protected abstract _createSummary(obj: any): [Urn | any, T];
}
