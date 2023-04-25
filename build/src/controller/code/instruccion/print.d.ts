import { Instruccion } from "../abstract/instruccion";
import { Expression } from "../abstract/expression";
import { Environment } from "../abstract/environment";
export declare class Print extends Instruccion {
    private expression;
    constructor(line: number, column: number, expression: Expression);
    execute(env: Environment): void;
}
