import { Expression } from "../abstract/expression";
import { Type, Return } from "../abstract/Tipo_primitivo";
export declare class Primitivo extends Expression {
    private value;
    private tipo;
    constructor(line: number, column: number, value: any, tipo: Type);
    execute(): Return;
}
