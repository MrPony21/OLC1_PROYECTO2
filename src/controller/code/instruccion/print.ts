import { Instruccion } from "../abstract/instruccion";
import { Expression } from "../abstract/expression";

export class Print extends Instruccion{
    constructor(
        line: number,
        column: number,
        private expression: Expression
    ) {
        super(line, column)
    }

    public execute() {
        const value = this.expression.execute();
        console.log("entramos a print");
    }
}   