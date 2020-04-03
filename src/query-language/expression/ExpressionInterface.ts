import { WalkerInterface } from "../WalkerInterface";

export interface ExpressionInterface {
    toString(): string;
    evaluate(walker: WalkerInterface): any;
}
