import { Environment } from "./environment";
export declare abstract class Instruccion {
    line: number;
    column: number;
    constructor(line: number, column: number);
    abstract execute(env: Environment): any;
}
