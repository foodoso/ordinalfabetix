export default abstract class Identifiable {
    static [Symbol.hasInstance](instance) {
        return typeof Object.getPrototypeOf(instance).getIdentifier === 'function';
    }

    abstract getIdentifier();
}