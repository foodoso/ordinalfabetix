import { WalkerInterface } from "../WalkerInterface";
export declare abstract class ExpressionInterface {
    abstract toString(): string;
    abstract evaluate(walker: WalkerInterface): any;
}
