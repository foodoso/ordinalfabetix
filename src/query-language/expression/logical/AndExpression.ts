import { WalkerInterface } from '../../WalkerInterface';
import { BaseExpression } from '../BaseExpression';
import { LogicalExpressionInterface } from './LogicalExpressionInterface';

export class AndExpression extends LogicalExpressionInterface {

    private items: any[];

    constructor(..._) {
        super();
        this.items = Array.from(arguments).flat();
    }

    toString() {
        return `$and(${this.items.join(', ')})`;
    }

    evaluate(walker: WalkerInterface): any {
        return walker.walkAnd(this.items);
    }
}
