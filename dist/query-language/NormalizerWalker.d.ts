import { ExpressionInterface } from './expression/ExpressionInterface';
import { WalkerInterface } from './WalkerInterface';
export declare class NormalizerWalker implements WalkerInterface {
    walk(expression: ExpressionInterface): ExpressionInterface;
    walkAnd(..._: any[]): any;
    walkNot(value: any): any;
    walkOr(..._: any[]): any;
    private prepareCondition;
}
