import { Return } from "./Tipo_primitivo";
import { Environment } from "./environment";
export declare abstract class Expression {
    line: number;
    column: number;
    constructor(line: number, column: number);
    abstract execute(env: Environment): Return;
}
