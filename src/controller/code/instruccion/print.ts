import { Instruccion } from "../abstract/instruccion";
import { Expression } from "../abstract/expression";
import { Environment } from "../abstract/environment";
import { outs } from "../salidas/out";

export class Print extends Instruccion{
    constructor(
        line: number,
        column: number,
        private expression: Expression
    ) {
        super(line, column)
    }

    public execute(env: Environment) {
        const value = this.expression.execute(env);
        console.log("es",value.value);
        outs.push(value.value);
    }
}   