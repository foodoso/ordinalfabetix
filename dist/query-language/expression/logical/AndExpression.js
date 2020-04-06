import { LogicalExpressionInterface } from './LogicalExpressionInterface';
export class AndExpression extends LogicalExpressionInterface {
    constructor(..._) {
        super();
        this.items = Array.from(arguments).flat();
    }
    toString() {
        return `$and(${this.items.join(', ')})`;
    }
    evaluate(walker) {
        return walker.walkAnd(this.items);
    }
}
//# sourceMappingURL=AndExpression.js.map