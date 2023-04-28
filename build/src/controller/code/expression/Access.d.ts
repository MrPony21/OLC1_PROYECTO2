import { Expression } from "../abstract/expression";
import { Return } from "../abstract/Tipo_primitivo";
import { Environment } from "../abstract/environment";
export declare class Access extends Expression {
    private id;
    constructor(id: string, line: number, column: number);
    execute(env: Environment): Return;
}
