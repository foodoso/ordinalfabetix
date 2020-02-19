export class Urn {
    constructor(idOrUrn, class_, owner) {
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
    static isUrn(urn) {
        return !!urn.toString().match(/^urn:foodoso:.*:.+:.+$/);
    }
    /**
     * Gets the id (without the urn part).
     */
    get id() {
        return this._id;
    }
    /**
     * The class of this urn.
     */
    get class() {
        return this._class;
    }
    /**
     * Converts the urn object to string.
     */
    toString() {
        const owner = this._owner ? this._owner : '';
        return `urn:foodoso:${owner}:${this._class}:${this._id}`;
    }
}
//# sourceMappingURL=Urn.js.map