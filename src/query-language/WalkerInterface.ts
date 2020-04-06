import { ExpressionInterface } from "./expression/ExpressionInterface";

export interface WalkerInterface {
    walk(expression: ExpressionInterface): any;
    walkAnd(..._): any;
    walkNot(item): any;
    walkOr(..._): any;
}
