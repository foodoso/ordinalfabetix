import { ExpressionInterface } from './ExpressionInterface';
import { WalkerInterface } from '../WalkerInterface';

export abstract class BaseExpression implements ExpressionInterface {
    abstract evaluate(walker: WalkerInterface): any;
}
