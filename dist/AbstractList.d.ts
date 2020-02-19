/// <reference types="atlante" />
import ClientInterface from '@fazland/atlante/lib/Http/ClientInterface';
import Response from '@fazland/atlante/lib/Requester/Response';
import { Urn } from './Urn';
export declare abstract class AbstractList<T = any, C extends new () => AbstractList = any> {
    static readonly LOCATION: any;
    /**
     * Max results which this list iterates on.
     */
    protected _maxResults: number;
    /**
     * Already initialized summary objects collection.
     */
    protected _collection: Record<string, T>;
    protected _client: ClientInterface;
    protected _filters: Record<string, any>;
    protected _totalCount: number;
    protected _continuationToken: string;
    /**
     * Iterates on the list.
     */
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
    /**
     * Returns a copy of this object with max results set.
     */
    withMaxResults(maxResults?: number): AbstractList<T, C>;
    /**
     * Gets the total count.
     */
    get length(): number;
    /**
     * Cycle on next page.
     */
    next(): AsyncIterableIterator<T>;
    protected _generateFromResponse(response: Response): IterableIterator<[string, T]>;
    /**
     * Creates a summary object from a response object.
     */
    protected abstract _createSummary(obj: any): [Urn | any, T];
}
