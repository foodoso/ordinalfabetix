import { BaseExpression } from './expression/BaseExpression';
import { ExpressionInterface } from './expression/ExpressionInterface';
import { AndExpression } from './expression/logical/AndExpression';
import { NotExpression } from './expression/logical/NotExpression';
import { OrExpression } from './expression/logical/OrExpression';
import { WalkerInterface } from './WalkerInterface';

export class NormalizerWalker implements WalkerInterface {
    walk(expression: ExpressionInterface): ExpressionInterface {
        return expression.evaluate(this);
    }

    walkAnd(..._): any {
        return new AndExpression(Array.from(arguments).flat().map(this.prepareCondition.bind(this)));
    }

    walkNot(value): any {
        return new NotExpression(this.prepareCondition(value));
    }

    walkOr(..._): any {
        return new OrExpression(Array.from(arguments).flat().map(this.prepareCondition, this));
    }

    private prepareCondition(condition: any): any {
        return condition instanceof BaseExpression ?
            this.walk(condition as ExpressionInterface) :
            (typeof (condition) === 'object' ?
                ('getIdentifier' in condition && typeof (condition.getIdentifier) === 'function' ?
                    condition.getIdentifier() :
                    ('_id' in condition ? condition._id : condition)) :
                condition);
    }
}