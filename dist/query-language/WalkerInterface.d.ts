import { ExpressionInterface } from "./expression/ExpressionInterface";
export interface WalkerInterface {
    walk(expression: ExpressionInterface): any;
    walkAnd(..._: any[]): any;
    walkNot(item: any): any;
    walkOr(..._: any[]): any;
}
