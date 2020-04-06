import { LogicalExpressionInterface } from './LogicalExpressionInterface';
export class NotExpression extends LogicalExpressionInterface {
    constructor(expression) {
        super();
        this.expression = expression;
    }
    toString() {
        return `$not(${this.expression})`;
    }
    evaluate(walker) {
        return walker.walkNot(this.expression);
    }
}
//# sourceMappingURL=NotExpression.js.map