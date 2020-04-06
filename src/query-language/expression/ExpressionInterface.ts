import { WalkerInterface } from "../WalkerInterface";

export abstract class ExpressionInterface {
    abstract toString(): string;
    abstract evaluate(walker: WalkerInterface): any;
}
