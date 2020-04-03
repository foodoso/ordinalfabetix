import { WalkerInterface } from '../../WalkerInterface';
import { BaseExpression } from '../BaseExpression';
import { LogicalExpression } from './LogicalExpressionInterface';

export class AndExpression extends BaseExpression implements LogicalExpression {

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
