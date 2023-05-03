import { Return } from "./Tipo_primitivo";
import { Environment } from "./environment";

export abstract class Expression{
    public line: number;
    public column: number;
    constructor(line: number, column: number){
        this.line = line
        this.column = column
    }

    public abstract execute(env: Environment): Return;

    public abstract arbol(): {rama: string, nodo: string};



}