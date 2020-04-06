export default abstract class Identifiable {
    static [Symbol.hasInstance](instance: any): boolean;
    abstract getIdentifier(): any;
}
