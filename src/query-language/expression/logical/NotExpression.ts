import { WalkerInterface } from '../../WalkerInterface';
import { BaseExpression } from '../BaseExpression';
import { ExpressionInterface } from '../ExpressionInterface';
import { LogicalExpressionInterface } from './LogicalExpressionInterface';

export class NotExpression extends LogicalExpressionInterface {

    constructor(private expression: ExpressionInterface) {
        super();
    }

    toString() {
        return `$not(${this.expression})`;
    }

    evaluate(walker: WalkerInterface): string {
        return walker.walkNot(this.expression);
    }
}
