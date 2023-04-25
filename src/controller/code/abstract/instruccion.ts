import { Environment } from "./environment";

export abstract class Instruccion{
    public line: number;
    public column: number;
    constructor(line: number, column: number){
        this.line = line
        this.column = column
    }

    public abstract execute(env: Environment): any;

}