var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import ArrayUtils from '@fazland/atlante/lib/Utils/ArrayUtils';
import { Urn } from './Urn';
export class AbstractList {
    constructor() {
        /**
         * Already initialized summary objects collection.
         */
        this._collection = {};
    }
    /**
     * Iterates on the list.
     */
    [Symbol.asyncIterator]() {
        return __asyncGenerator(this, arguments, function* _a() {
            var e_1, _b;
            const collectionValues = Object.values(this._collection);
            let count = collectionValues.length;
            yield __await(yield* __asyncDelegator(__asyncValues(collectionValues)));
            let loop;
            do {
                const generator = this.next();
                loop = false;
                try {
                    for (var generator_1 = __asyncValues(generator), generator_1_1; generator_1_1 = yield __await(generator_1.next()), !generator_1_1.done;) {
                        const element = generator_1_1.value;
                        if (undefined !== this._maxResults && this._maxResults <= count++) {
                            return yield __await(void 0);
                        }
                        loop = true;
                        yield yield __await(element);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (generator_1_1 && !generator_1_1.done && (_b = generator_1.return)) yield __await(_b.call(generator_1));
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (!this._continuationToken) {
                    break;
                }
            } while (loop);
        });
    }
    /**
     * Returns a copy of this object with max results set.
     */
    withMaxResults(maxResults) {
        if (0 >= maxResults) {
            throw new Error('Max results must be greater than 0');
        }
        const obj = new this.constructor();
        obj._client = this._client;
        obj._filters = this._filters;
        obj._maxResults = maxResults;
        return obj;
    }
    /**
     * Gets the total count.
     */
    get length() {
        return this._totalCount;
    }
    /**
     * Cycle on next page.
     */
    next() {
        return __asyncGenerator(this, arguments, function* next_1() {
            const filters = Object.assign({}, this._filters);
            if (!!this._continuationToken) {
                filters['continue'] = String(this._continuationToken);
            }
            const url = new URL(this.constructor.LOCATION, 'http://localhost');
            for (let [key, value] of Object.entries(filters)) {
                if (undefined === value || null === value) {
                    continue;
                }
                if (value instanceof Urn) {
                    value = String(value);
                }
                url.searchParams.append(key, value);
            }
            const response = yield __await(this._client.request('GET', 'localhost' === url.hostname ? url.pathname + url.search : url.href));
            for (const [id, obj] of this._generateFromResponse(response)) {
                if (undefined === this._collection[id]) {
                    yield yield __await(obj);
                }
                this._collection[id] = obj;
            }
        });
    }
    *_generateFromResponse(response) {
        this._totalCount = ~~response.headers.get('X-Total-Count');
        this._continuationToken = response.headers.get('X-Continuation-Token');
        const objects = ArrayUtils.toCamelCaseKeys(response.data);
        for (const fields of objects) {
            const [id, obj] = this._createSummary(fields);
            Object.freeze(obj);
            yield [id, obj];
        }
    }
}
//# sourceMappingURL=AbstractList.js.map