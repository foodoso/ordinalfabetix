import { WalkerInterface } from '../../WalkerInterface';
import { ExpressionInterface } from '../ExpressionInterface';
import { LogicalExpressionInterface } from './LogicalExpressionInterface';
export declare class NotExpression extends LogicalExpressionInterface {
    private expression;
    constructor(expression: ExpressionInterface);
    toString(): string;
    evaluate(walker: WalkerInterface): string;
}
