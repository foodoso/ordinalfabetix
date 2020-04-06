export default class Identifiable {
    static [Symbol.hasInstance](instance) {
        return typeof Object.getPrototypeOf(instance).getIdentifier === 'function';
    }
}
//# sourceMappingURL=Identifiable.js.map