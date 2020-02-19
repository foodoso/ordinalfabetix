export declare class Urn {
    private readonly _class;
    private readonly _id;
    private readonly _owner;
    constructor(id: string, class_?: string, owner?: string);
    constructor(id: Urn);
    /**
     * Checks if this is a valid urn or not.
     */
    static isUrn(urn: Urn | string): urn is Urn;
    /**
     * Gets the id (without the urn part).
     */
    get id(): string;
    /**
     * The class of this urn.
     */
    get class(): string;
    /**
     * Converts the urn object to string.
     */
    toString(): string;
}
