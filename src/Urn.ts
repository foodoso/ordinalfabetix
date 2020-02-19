export class Urn {
    private readonly _class: string;
    private readonly _id: string;
    private readonly _owner: string | null;

    constructor(id: string, class_?: string, owner?: string);
    constructor(id: Urn);
    constructor(idOrUrn: string | Urn, class_?: string, owner?: string | null) {
        idOrUrn = idOrUrn.toString();

        const match = idOrUrn.match(/^urn:foodoso:(.*):(.+):(.+)$/);
        if (match) {
            owner = match[1] || null;
            class_ = match[2];
            idOrUrn = match[3];
        }

        if (!class_) {
            throw new Error('URN class must be defined');
        }

        this._class = class_;
        this._owner = owner;
        this._id = idOrUrn;
    }

    /**
     * Checks if this is a valid urn or not.
     */
    static isUrn(urn: Urn | string): urn is Urn;
    static isUrn(urn: Urn | string): boolean {
        return !!urn.toString().match(/^urn:foodoso:.*:.+:.+$/);
    }

    /**
     * Gets the id (without the urn part).
     */
    get id(): string {
        return this._id;
    }

    /**
     * The class of this urn.
     */
    get class(): string {
        return this._class;
    }

    /**
     * Converts the urn object to string.
     */
    toString(): string {
        const owner = this._owner ? this._owner : '';

        return `urn:foodoso:${owner}:${this._class}:${this._id}`;
    }
}
