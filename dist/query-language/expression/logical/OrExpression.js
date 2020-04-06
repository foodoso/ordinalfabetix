import { LogicalExpressionInterface } from './LogicalExpressionInterface';
export class OrExpression extends LogicalExpressionInterface {
    constructor(..._) {
        super();
        this.items = Array.from(arguments).flat();
    }
    toString() {
        return `$or(${this.items.join(', ')})`;
    }
    evaluate(walker) {
        return walker.walkOr(this.items);
    }
}
//# sourceMappingURL=OrExpression.js.map