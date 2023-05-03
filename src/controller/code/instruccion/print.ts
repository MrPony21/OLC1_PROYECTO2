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

    public arbol(): { rama: string; nodo: string; } {
        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodoPrint${id.toString()}`;
        let  rama = `${nodo}[label="Print"];\n`
        const codigorama: { rama: string; nodo: string; } = this.expression.arbol();
        rama += codigorama.rama;  

        rama += `${nodo} -> ${codigorama.nodo};\n`;

        return { rama: rama, nodo: nodo}
    }

}   