import { WalkerInterface } from '../../WalkerInterface';
import { LogicalExpressionInterface } from './LogicalExpressionInterface';
export declare class OrExpression extends LogicalExpressionInterface {
    private items;
    constructor(..._: any[]);
    toString(): string;
    evaluate(walker: WalkerInterface): any;
}
