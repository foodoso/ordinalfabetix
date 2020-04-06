import { ExpressionInterface } from './expression/ExpressionInterface';
import { AndExpression } from './expression/logical/AndExpression';
import { NotExpression } from './expression/logical/NotExpression';
import { OrExpression } from './expression/logical/OrExpression';
import { WalkerInterface } from './WalkerInterface';
import Identifiable from '../Identifiable';

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
        return condition instanceof ExpressionInterface ?
            this.walk(condition as ExpressionInterface) :
            (condition instanceof Identifiable ? condition.getIdentifier() : condition);
    }
}