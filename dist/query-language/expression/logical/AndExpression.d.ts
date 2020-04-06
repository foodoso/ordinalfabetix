import { WalkerInterface } from '../../WalkerInterface';
import { LogicalExpressionInterface } from './LogicalExpressionInterface';
export declare class AndExpression extends LogicalExpressionInterface {
    private items;
    constructor(..._: any[]);
    toString(): string;
    evaluate(walker: WalkerInterface): any;
}
