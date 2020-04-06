import { WalkerInterface } from '../../WalkerInterface';
import { BaseExpression } from '../BaseExpression';
import { LogicalExpressionInterface } from './LogicalExpressionInterface';

export class OrExpression extends LogicalExpressionInterface {

    private items: any[];

    constructor(..._) {
        super();
        this.items = Array.from(arguments).flat();
    }

    toString() {
        return `$or(${this.items.join(', ')})`;
    }

    evaluate(walker: WalkerInterface): any {
        return walker.walkOr(this.items);
    }
}
