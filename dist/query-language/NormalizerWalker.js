import { BaseExpression } from './expression/BaseExpression';
import { AndExpression } from './expression/logical/AndExpression';
import { NotExpression } from './expression/logical/NotExpression';
import { OrExpression } from './expression/logical/OrExpression';
import Identifiable from '../Identifiable';
export class NormalizerWalker {
    walk(expression) {
        return expression.evaluate(this);
    }
    walkAnd(..._) {
        return new AndExpression(Array.from(arguments).flat().map(this.prepareCondition.bind(this)));
    }
    walkNot(value) {
        return new NotExpression(this.prepareCondition(value));
    }
    walkOr(..._) {
        return new OrExpression(Array.from(arguments).flat().map(this.prepareCondition, this));
    }
    prepareCondition(condition) {
        return condition instanceof BaseExpression ?
            this.walk(condition) :
            (condition instanceof Identifiable ? condition.getIdentifier() : condition);
    }
}
//# sourceMappingURL=NormalizerWalker.js.map